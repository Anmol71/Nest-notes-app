import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { NoteModel } from 'src/databases/models/note.model';
import { UserModel } from 'src/databases/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  // async findOne(username: string): Promise<UserModel | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    const user = this.userModel.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  async create(createUserDto: Pick<UserModel, 'username' | 'password'>) {
    const username = createUserDto.username;
    const password = createUserDto.password;
    return this.userModel
      .build()
      .set({ username: username, password: password })
      .save();
  }

  // update(id: number, updateUserDto: UserModel) {
  //   this.users = this.users.map((user) => {
  //     if (user.id === id) {
  //       return { ...user, ...updateUserDto };
  //     }
  //     return user;
  //   });

  //   return this.findOne(id);
  // }

  delete(id: number) {
    return this.userModel.destroy({ where: { id: id } });
  }
  // public shareNote(sharedWith: number|UserModel , note: number| NoteModel){

  //   return this.SharedNoteModel.build().set({
  //   note_id:typeof note ==='number'? note:note.id;
  //   shared_by:
  //   })

  // }

  public isUnique(createUserDto: Pick<UserModel, 'username' | 'password'>) {
    const username = createUserDto.username;
    const existingUser = this.userModel.findOne({
      where: { username: username },
    });
    if (existingUser) {
      return 'This Username is taken.';
    }
  }
}
