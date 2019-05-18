import { User } from "./User";

export class Room {
  public id: string;

  public users: Map<string, User> = new Map();

  public leaderId: string;

  public get leader() {
    return this.users.get(this.leaderId);
  }

  public constructor(id: string, leaderUser: User) {
    this.id = id;
    this.leaderId = leaderUser.id;
    this.addUser(leaderUser);
  }

  public addUser(user: User) {
    this.users.set(user.id, user);
    return this;
  }

  public removeUser(user: User) {
    if (user.id === this.leaderId) {
      throw new Error("Impossible to delete leader");
    }
    this.users.delete(user.id);
    return this;
  }

  public addUsers(users: User[]) {
    users.forEach(user => this.addUser(user));
    return this;
  }
}
