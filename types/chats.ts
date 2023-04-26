import { Chats, Profile, User, message } from "./async-prisma-types";

export type responeType = Chats & {
    message: message[];
    userOne: User & {
        profile: Profile;
    };
    userTwo: User & {
        profile: Profile;
    };
  }