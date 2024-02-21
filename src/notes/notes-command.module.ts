import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { NoteCreateCommandService } from './commands/note-create-command.service';
import { NoteDeleteCommandService } from './commands/note-delete-command.service';
import { NoteEditCommandService } from './commands/note-edit-command.service';
import { NotesGetCommandService } from './commands/notes-get-command.service';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/databases/models/user.model';
import { NotesRepoService } from './services/notes-repo.service';
import { NoteModel } from 'src/databases/models/note.model';
import { SharedNotesService } from 'src/shared-notes/services/shared-notes.service';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, NoteModel, SharedNoteModel]),
    UsersModule,
  ],
  providers: [
    UsersService,
    AuthService,
    NotesRepoService,
    SharedNotesService,
    NoteCreateCommandService,
    NoteDeleteCommandService,
    NoteEditCommandService,
    NotesGetCommandService,
  ],
})
export class NotesCommandModule {}
