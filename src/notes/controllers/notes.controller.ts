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
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { NoteModel } from 'src/databases/models/note.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { MapToNotesPipe } from '../pipes/map-to-notes.pipe';
import { UsersService } from 'src/users/services/users.service';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService,
    private usersService: UsersService,
  ) {}

  @Render('notes')
  @Get()
  public async getMyNotes(@AuthUser() userId: number) {
    const notes = await this.notesService.getMyNotes(userId);
    console.log(notes);
    return { notes };
  }
  @Get('share')
  // @Redirect('/users')
  @Render('usersList')
  public async findAllUsers() {
    const users = await this.usersService.findAll();
    console.log('Find All', users, 'Users');
    return { users };
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
  @Post(':id/share')
  // @Redirect

  // @UsePipes(new ValidationPipe({ transform: true }))
  // @Render('notepad')
  @Get(':id')
  public findAll(@AuthUser() user: number): Promise<NoteModel[]> {
    console.log('get');
    return this.notesService.findAllByUser(user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notesService.findOne(+id);
  // }

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
