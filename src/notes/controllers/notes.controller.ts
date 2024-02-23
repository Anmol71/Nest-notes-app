import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Render,
  Put,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Redirect,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { NoteModel } from 'src/databases/models/note.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { MapToNotesPipe } from '../pipes/map-to-notes.pipe';
import { UsersService } from 'src/users/services/users.service';
import { CreateSharedNoteDto } from 'src/shared-notes/dtos/create-shared-note.dto';
import { SharedNotesService } from 'src/shared-notes/services/shared-notes.service';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UserModel } from 'src/databases/models/user.model';
import { ApiTags } from '@nestjs/swagger';
import { MapToUserPipe } from 'src/users/pipes/map-to-user.pipe';

@UseGuards(AuthGuard)
@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private usersService: UsersService,
    private sharedNotesService: SharedNotesService,
  ) {}

  @Render('notes')
  @Get()
  public async getNotes(
    @AuthUser() user: UserModel,
    @Query('page') page: number,
    @Query('shared') notes: 'all' | 'createdByMe' | 'sharedWithMe',
  ): Promise<object> {
    if (isNaN(page)) {
      page = 1;
    }
    const sharedToMe: SharedNoteModel[] =
      await this.sharedNotesService.notesSharedToMe(page, user.id);
    console.log('page', page);
    const myNotes: NoteModel[] = await this.notesService.getMyNotes(
      page,
      user.id,
    );
    const myNotesCount = await this.notesService.totalNumberNotes(user.id);
    // console.log('Get My Notes', myNotes);
    console.log('Length of notes ', myNotesCount);
    if (notes === 'all') {
      return { myNotes, sharedToMe, user: user, myNotesCount };
    } else if (notes === 'createdByMe') {
      return { myNotes, user: user, myNotesCount };
    } else if (notes === 'sharedWithMe') {
      return { sharedToMe, user: user, myNotesCount };
    }
    return {
      myNotes: myNotes,
      sharedToMe: sharedToMe,
      user: user,
      myNotesCount: myNotesCount,
    };
  }

  @Render('createNotes')
  @UseGuards(AuthGuard)
  @Get('create')
  public showCreateNote(@AuthUser() authUser: UserModel) {
    return { user: authUser };
  }

  @Get(':id')
  public findAll(@AuthUser() user: UserModel): Promise<NoteModel[]> {
    return this.notesService.findAllByUser(user.id);
  }

  @Get(':noteId(\\d+)/share')
  @Render('usersList')
  public async shareWithUsers(
    @Param('noteId', MapToNotesPipe) note: NoteModel,
    @AuthUser() loginUser: UserModel,
  ) {
    const allUsers: UserModel[] = await this.usersService.findAll();
    const filteredUsers: UserModel[] = allUsers.filter((user) => {
      return user.id !== loginUser.id;
    });
    console.log('allUsers', allUsers);
    console.log('filteredUsers', filteredUsers);
    // const sharedWithUser = await this.usersService.findOne(
    //   sharedNoteDto.shared_with,
    // );
    return { filteredUsers, note: note.toJSON(), user: loginUser };
  }

  @Get(':id/edit')
  @Render('editNotes')
  public Note(
    @Param('id', ParseIntPipe, MapToNotesPipe) note: NoteModel,
    @AuthUser() authUser: UserModel,
  ) {
    return { note, user: authUser };
  }

  @Post()
  @Redirect('/notes')
  public create(
    @AuthUser() user: UserModel,
    @Body(ValidationPipe) createNote: CreateNoteDto,
  ): void {
    this.notesService.create(createNote, user.id);
  }

  // ROUTE FOR SHARING THE NOTE.
  @Redirect('/notes')
  @Post(':noteId(\\d+)/share')
  public async sharedWithSingleUser(
    @Param('noteId', MapToNotesPipe) note: NoteModel,
    @AuthUser() user: UserModel,
    @Body() sharedNoteDto: CreateSharedNoteDto,
    @Body('shared_with', MapToUserPipe) sharedWithUser: UserModel,
  ) {
    console.log('sharedWithUserrr', sharedWithUser);
    this.sharedNotesService.create(sharedNoteDto, user.id, note);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  // @UsePipes(ValidationPipe)
  @Redirect('/notes')
  public editNote(
    @Param('id', ParseIntPipe, MapToNotesPipe) note: NoteModel,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<NoteModel> {
    return this.notesService.update(note, createNoteDto);
  }

  @Redirect('/notes')
  @Delete(':id')
  public remove(
    @Param('id', ParseIntPipe, MapToNotesPipe) note: NoteModel,
  ): Promise<null> {
    return this.notesService.remove(note);
  }
}
