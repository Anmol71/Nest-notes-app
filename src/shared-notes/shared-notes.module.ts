import { Module } from '@nestjs/common';
import { SharedNotesService } from './services/shared-notes.service';
import { SharedNotesController } from './controllers/shared-notes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([SharedNoteModel]), UsersModule],
  controllers: [SharedNotesController],
  providers: [SharedNotesService],
  exports: [SharedNotesService],
})
export class SharedNotesModule {}
