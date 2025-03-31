import { User } from "apps/users/src/app/infrastructure/entities/user.entity";

export const USERS_REPO = "IUsersRepo";

export interface IUserRepo{
findAll(): Promise<User[]> ;
 findOne(id: number): Promise<User|null> ;
 findByUsername(username: string): Promise<User|null>;
 create(user: User): Promise<User> ;
 update(id: number, user: User): Promise<User | null>;
 remove(id: number): Promise<void>;
}