import { Injectable } from '@nestjs/common';
import { NoteModel } from 'src/databases/models/note.model';
import { UserModel } from 'src/databases/models/user.model';

@Injectable()
export class UsersService {
  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];
  async findOne(username: string): Promise<UserModel | undefined> {
    return this.users.find((user) => user.username === username);
  }

  // findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
  //   if (role) {
  //     const rolesArray = this.users.filter((user) => user.role === role);
  //     if (rolesArray.length) throw new NotFoundException('User Role Not Found');
  //     return rolesArray;
  //   }
  //   return this.users;
  // }

  // findOne(id: number) {
  //   const user = this.users.find((user) => user.userId === id);

  //   if (!user) throw new NotFoundException('User Not Found');

  //   return user;
  // }

  // create(createUserDto: UserModel) {
  //   const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
  //   const newUser = {
  //     id: usersByHighestId[0].userId + 1,
  //     ...createUserDto,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }

  // update(id: number, updateUserDto: UserModel) {
  //   this.users = this.users.map((user) => {
  //     if (user.id === id) {
  //       return { ...user, ...updateUserDto };
  //     }
  //     return user;
  //   });

  //   return this.findOne(id);
  // }

  //   delete(id: number) {
  //     const removedUser = this.findOne(id);

  //     this.users = this.users.filter((user) => user.id !== id);

  //     return removedUser;
  //   }
  public shareNote(sharedWith: number|UserModel , note: number| NoteModel){
    const userNote = 
    return this.SharedNoteModel.build().set({
    note_id:typeof note ==='number'? note:note.id;
    shared_by:
    })
  }
}
