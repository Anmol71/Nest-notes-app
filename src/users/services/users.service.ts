import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteModel } from 'src/databases/models/note.model';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UserModel } from 'src/databases/models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  public findAll(): Promise<UserModel[]> {
    return this.userModel.findAll({
      include: [NoteModel, { model: SharedNoteModel }],
    });
  }

  public findOne(id: number): Promise<UserModel> {
    return this.userModel.findByPk(id);
  }

  /**
   *This function find the username in the table
   * @param username
   * @returns
   */
  public findByUserName(username: string): Promise<UserModel> {
    return this.userModel.findOne({ where: { username: username } });
  }

  public async create(
    createUserDto: Pick<UserModel, 'username' | 'password'>,
  ): Promise<UserModel> {
    const username = createUserDto.username;
    const password = createUserDto.password;
    return this.userModel
      .build()
      .set({ username: username, password: password })
      .save();
  }

  public async addEmail(
    user: UserModel,
    updateEmailDto: Pick<UserModel, 'email'>,
  ): Promise<UserModel> {
    const email = updateEmailDto.email;
    return user.set({ email: email }).save();
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

  public delete(id: number): Promise<null> {
    return this.userModel.destroy({ where: { id: id } }).then(() => null);
  }
  // public shareNote(sharedWith: number|UserModel , note: number| NoteModel){

  //   return this.SharedNoteModel.build().set({
  //   note_id:typeof note ==='number'? note:note.id;
  //   shared_by:
  //   })

  // }
}
