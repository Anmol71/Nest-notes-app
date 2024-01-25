import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { NoteModel } from 'src/databases/models/note.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MapToNotesPipe } from './pipes/map-to-notes.pipe';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([NoteModel]), UsersModule],
  controllers: [NotesController],
  providers: [NotesService, MapToNotesPipe],
})
export class NotesModule {}
