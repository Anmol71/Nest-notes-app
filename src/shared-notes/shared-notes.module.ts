import { Module, forwardRef } from '@nestjs/common';
import { SharedNotesService } from './services/shared-notes.service';
import { SharedNotesController } from './controllers/shared-notes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UsersModule } from 'src/users/users.module';
import { ShareNoteCommandService } from './commands/share-note-command.service';
import { AuthService } from 'src/auth/services/auth.service';
import { NotesModule } from 'src/notes/notes.module';
import { NotesRepoService } from 'src/notes/services/notes-repo.service';
import { NoteModel } from 'src/databases/models/note.model';

@Module({
  imports: [
    SequelizeModule.forFeature([SharedNoteModel, NoteModel]),
    UsersModule,
    forwardRef(() => NotesModule),
  ],
  controllers: [SharedNotesController],
  providers: [
    SharedNotesService,
    ShareNoteCommandService,
    AuthService,
    NotesRepoService,
  ],
  exports: [SharedNotesService],
})
export class SharedNotesModule {}
