import { Injectable } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { AuthService } from 'src/auth/services/auth.service';
import { Command, Option, Positional } from 'nestjs-command';

@Injectable()
export class NoteCreateCommandService {
  constructor(
    private readonly notesService: NotesService,
    private readonly authService: AuthService,
  ) {}
  @Command({
    command: 'create:note <title> <description>',
    describe: 'create a note',
  })
  async create(
    @Positional({
      name: 'title',
      describe: 'the title',
      type: 'string',
    })
    title: string,
    @Positional({
      name: 'description',
      describe: 'the description',
      type: 'string',
    })
    description: string,
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
    await this.notesService.create(
      {
        title,
        description,
        hidden: false,
      },
      user,
    );
    console.log('Notes Created Succesfully');
  }
}
