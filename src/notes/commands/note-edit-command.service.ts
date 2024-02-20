import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { NotesService } from '../services/notes.service';
import { Command, Option, Positional } from 'nestjs-command';

@Injectable()
export class NoteEditCommandService {
  constructor(
    private readonly authService: AuthService,
    private readonly notesService: NotesService,
  ) {}

  @Command({
    command: 'edit:note <noteId>',
    describe: 'delete a note',
  })
  async edit(
    @Positional({
      name: 'title',
      describe: 'the title',
      type: 'string',
    })
    title: string,

    @Positional({
      name: 'description',
      describe: 'the body',
      type: 'string',
    })
    description: string,

    @Option({
      name: 'noteId',
      describe: 'the note Id',
      type: 'number',
      alias: 'n',
      required: true,
    })
    noteId: number,

    @Option({
      name: 'token',
      describe: 'the token',
      type: 'string',
      alias: 't',
      required: true,
    })
    token: string,
  ) {
    console.log('hidd');
    const user = await this.authService.getUserFromToken(token);
    await this.notesService.update(user.id, noteId);
  }
}
