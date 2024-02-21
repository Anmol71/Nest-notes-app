import { Injectable } from '@nestjs/common';
import { Command, Option } from 'nestjs-command';
import { NotesRepoService } from '../services/notes-repo.service';
import { AuthService } from 'src/auth/services/auth.service';
import { type NoteModel } from 'src/databases/models/note.model';

@Injectable()
export class NotesGetCommandService {
  constructor(
    private readonly notesService: NotesRepoService,
    private readonly authService: AuthService,
  ) {}

  @Command({
    command: 'get:notes',
    describe: 'get notes',
  })
  async create(
    @Option({
      name: 'token',
      describe: 'the token',
      type: 'string',
      alias: 't',
      required: true,
    })
    token: string,
  ) {
    const user = await this.authService.getUserFromToken(token);
    const myNotes: NoteModel[] = await this.notesService.getMyNotes(user.id);
    console.log('My notes: ', myNotes, 'your notes');
  }
}
