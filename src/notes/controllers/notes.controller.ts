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
  UsePipes,
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

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private usersService: UsersService,
    private sharedNotesService: SharedNotesService,
  ) {}

  // @Get()
  public async getMyNotes(@AuthUser() userId: number) {
    const notes = await this.notesService.getMyNotes(userId);
    console.log(notes);
    return { notes };
  }
  //This route will show all notes depending on the query.
  @Render('notes')
  @Get()
  public async getNotes(
    @AuthUser() user_id: number,
    @Query('shared') notes: 'all' | 'createdByMe' | 'sharedWithMe',
  ): Promise<
    | { myNotes: NoteModel[]; sharedToMe: SharedNoteModel[] }
    | { myNotes: NoteModel[] }
    | { sharedToMe: SharedNoteModel[] }
  > {
    const sharedToMe: SharedNoteModel[] =
      await this.sharedNotesService.notesSharedToMe(user_id);
    const myNotes: NoteModel[] = await this.notesService.getMyNotes(user_id);
    if (notes === 'all') {
      console.log('myNotes', myNotes);
      return { myNotes, sharedToMe };
    } else if (notes === 'createdByMe') {
      return { myNotes };
    } else if (notes === 'sharedWithMe') {
      console.log('SharedWith me notes', sharedToMe, 'SharedWithMe');
      return { sharedToMe };
    }
    return { myNotes: myNotes, sharedToMe: sharedToMe };
  }

  @Get(':noteId/share')
  // @Redirect('/users')
  @Render('usersList')
  public async shareWithUsers(
    @Param('noteId', ParseIntPipe, MapToNotesPipe) note: NoteModel,
    @AuthUser() user_id: number,
  ) {
    const users = await this.usersService.findAll();
    const filteredUsers = users.filter((user) => {
      return user_id !== user.id;
    });
    console.log('UsersList', filteredUsers);
    console.log('Users', users);
    // console.log('Find All', users, 'Users');
    return { filteredUsers, users, note: note.toJSON() };
  }

  @Render('createNotes')
  @Get('create')
  public showCreateNote() {
    return {};
  }

  @Get(':id/edit')
  @Render('editNotes')
  public Note(@Param('id', ParseIntPipe, MapToNotesPipe) note: NoteModel) {
    return { note };
  }

  @Post()
  @Redirect('/notes')
  public create(@AuthUser() user: number, @Body() createNote: CreateNoteDto) {
    this.notesService.create(createNote, user);
  }

  // ROUTE FOR SHARING THE NOTE.
  @Post(':noteId/share')
  @Redirect('/notes')
  public sharedWithSingleUser(
    @Param('noteId', ParseIntPipe, MapToNotesPipe) note: NoteModel,
    @AuthUser() userId: number,
    @Body() sharedNoteDto: CreateSharedNoteDto,
  ) {
    console.log('CreateSharedNoteDto', sharedNoteDto);
    console.log('NOteId/Share.....');
    this.sharedNotesService.create(sharedNoteDto, userId, note);
  }

  @Get(':id')
  public findAll(@AuthUser() user: number): Promise<NoteModel[]> {
    console.log('get');
    return this.notesService.findAllByUser(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  @Redirect('/notes')
  public editNote(
    @Param('id', ParseIntPipe, MapToNotesPipe) note: NoteModel,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return this.notesService.update(note, createNoteDto);
  }
  @Redirect('/notes')
  @Delete(':id')
  public remove(@Param('id', ParseIntPipe, MapToNotesPipe) note: NoteModel) {
    return this.notesService.remove(note);
  }
}
