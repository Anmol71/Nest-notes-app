import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { NoteModel } from 'src/databases/models/note.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MapToNotesPipe } from './pipes/map-to-notes.pipe';
import { UsersModule } from 'src/users/users.module';
import { SharedNotesModule } from 'src/shared-notes/shared-notes.module';
import { NoteCreateCommandService } from './commands/note-create-command.service';
import { AuthService } from 'src/auth/services/auth.service';
import { NoteDeleteCommandService } from './commands/note-delete-command.service';
import { NoteEditCommandService } from './commands/note-edit-command.service';

@Module({
  imports: [
    SequelizeModule.forFeature([NoteModel]),
    UsersModule,
    SharedNotesModule,
  ],
  controllers: [NotesController],
  providers: [
    NotesService,
    MapToNotesPipe,
    NoteCreateCommandService,
    AuthService,
    NoteDeleteCommandService,
    NoteEditCommandService,
  ],
})
export class NotesModule {}
