import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { NotesRepoService } from '../services/notes-repo.service';
import { Command, Option, Positional } from 'nestjs-command';

@Injectable()
export class NoteDeleteCommandService {
  constructor(
    private readonly authService: AuthService,
    private readonly notesService: NotesRepoService,
  ) {}

  @Command({
    command: 'delete:note <noteId>',
    describe: 'delete a note',
  })
  async delete(
    @Positional({
      name: 'noteId',
      describe: 'Id of note',
      type: 'number',
    })
    noteId: number,

    @Option({
      name: 'token',
      describe: 'token',
      type: 'string',
      alias: 't',
      required: true,
    })
    token: string,
  ) {
    const user = await this.authService.getUserFromToken(token);
    const note = await this.notesService.deleteNote(user, noteId);
    console.log(note, 'Deleted Succesfully');
  }
}
