import { Module } from '@nestjs/common';
import { NotesController } from './controllers/notes.controller';
import { MapToNotesPipe } from './pipes/map-to-notes.pipe';
import { NotesRepoModule } from './notes-repo.module';

@Module({
  imports: [NotesRepoModule],
  controllers: [NotesController],
  providers: [MapToNotesPipe],
})
export class NotesModule {}
