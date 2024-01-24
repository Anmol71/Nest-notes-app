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
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../dtos/create-note.dto';
import { NoteModel } from 'src/databases/models/note.model';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { UserModel } from 'src/databases/models/user.model';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Render('notes')
  @Get()
  public async getMyNotes(@AuthUser() userId: number) {
    const notes = await this.notesService.getMyNotes(userId);
    console.log(notes);
    return { notes };
  }

  @Render('notepad')
  @Get('create')
  public showCreateNote() {
    return {};
  }

  @Post()
  @Redirect('/notes')
  public create(@AuthUser() user: number, @Body() createNote: CreateNoteDto) {
    this.notesService.create(createNote, user);
  }

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

  @Put()
  @HttpCode(HttpStatus.OK)
  @UsePipes(ValidationPipe)
  // @Redirect('notes')
  public async editNote(
    @Body('id') id: number,
    @Body() createNoteDto: CreateNoteDto,
    @AuthUser() authUser: UserModel,
  ): Promise<any> {
    await this.notesService.deleteNote(authUser.id, id);
    return this.notesService.create(createNoteDto, authUser.id);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }

  @Delete()
  public deleteNote(
    @Body('id') id: number,
    @AuthUser() userId: number,
  ): Promise<any> {
    return this.notesService.deleteNote(userId, id);
  }
}
