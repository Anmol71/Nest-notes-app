import { Module } from '@nestjs/common';
import { SharedNotesService } from './services/shared-notes.service';
import { SharedNotesController } from './controllers/shared-notes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';

@Module({
  imports: [SequelizeModule.forFeature([SharedNoteModel])],
  controllers: [SharedNotesController],
  providers: [SharedNotesService],
})
export class SharedNotesModule {}
