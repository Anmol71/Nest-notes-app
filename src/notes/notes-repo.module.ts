import { Module } from '@nestjs/common';
import { NotesRepoService } from './services/notes-repo.service';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { NoteModel } from 'src/databases/models/note.model';
import { NotesCommandModule } from './notes-command.module';

@Module({
  imports: [
    SequelizeModule.forFeature([NoteModel]),
    UsersModule,
    NotesCommandModule,
  ],
  providers: [NotesRepoService],
  exports: [NotesRepoService],
})
export class NotesRepoModule {}
