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

  public delete(id: number): Promise<null> {
    return this.userModel.destroy({ where: { id: id } }).then(() => null);
  }

  public async getImage(id: number) {
    return this.userModel.findOne({
      where: {
        id: id,
      },
    });
  }

  public async addImage(id: number, filename: string) {
    // console.log(image);
    return this.userModel.update(
      { filename: filename },
      {
        where: {
          id: id,
        },
      },
    );
  }

  // get the disk and put the file received from the controller in the disk
  // for retrieving the file get the disk and call the get method on it.
}
