import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NoteModel } from 'src/databases/models/note.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([NoteModel])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
