import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Storage } from '@squareboat/nest-storage';
import { randomUUID } from 'crypto';
import { readFile } from 'fs/promises';
import { NoteModel } from 'src/databases/models/note.model';
import { SharedNoteModel } from 'src/databases/models/shared-notes.model';
import { UserModel } from 'src/databases/models/user.model';
import { UpdateProfileDto } from '../dtos/update-profile.dto';

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

  /**
   * This function find the user email in the table
   * @param email
   * @returns
   */
  public findByUserEmail(email: string): Promise<UserModel> {
    return this.userModel.findOne({ where: { email: email } });
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

  public async delete(user: UserModel): Promise<null> {
    console.log('User', user);
    return user.destroy().then(() => null);
  }

  public async getImage(user: UserModel) {
    return user.filename;
  }
  public async addImage(user: UserModel, image: UpdateProfileDto) {
    console.log('Image', image);
    const path = `/profiles/${randomUUID()}.${image.avatar.extension}`;
    await Storage.disk('local').put(path, await readFile(image.avatar.path));
    // console.log(image);
    return user.set({ filename: path }).save();
  }
  // get the disk and put the file received from the controller in the disk
  // for retrieving the file get the disk and call the get method on it.
}
