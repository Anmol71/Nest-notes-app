import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { NoteModel } from 'src/databases/models/note.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MapToNotesPipe } from './pipes/map-to-notes.pipe';

@Module({
  imports: [SequelizeModule.forFeature([NoteModel])],
  controllers: [NotesController],
  providers: [NotesService, MapToNotesPipe],
})
export class NotesModule {}
