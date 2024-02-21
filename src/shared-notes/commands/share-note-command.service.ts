import { Injectable } from '@nestjs/common';
import { Command, Positional, Option } from 'nestjs-command';
import { AuthService } from 'src/auth/services/auth.service';
import { SharedNotesService } from '../services/shared-notes.service';
import { NotesRepoService } from 'src/notes/services/notes-repo.service';

@Injectable()
export class ShareNoteCommandService {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedNoteService: SharedNotesService,
    private readonly noteService: NotesRepoService,
  ) {}

  @Command({
    command: 'share:note <shared_noteId> <shared_to_userId>',
    describe: 'sharing a note',
  })
  async create(
    @Positional({
      name: 'shared_noteId',
      describe: 'the shared note id',
      type: 'number',
    })
    shared_noteId: number,

    @Positional({
      name: 'shared_to_userId',
      describe: 'the shared to user Id',
      type: 'number',
    })
    shared_with: number,

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
    const note = await this.noteService.findOne(shared_noteId);
    await this.sharedNoteService.create({ shared_with }, user.id, note);
    console.log(`Note with id ${shared_noteId} is shared with ${shared_with}`);
  }
}
