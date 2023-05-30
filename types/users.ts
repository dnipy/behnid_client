import { City, Connections, FreeRequests, Product, Unit, User, sellerProfile } from "./async-prisma-types";

export type userModelResponseType =  User & {
    profile: {
        name: string;
        family: string;
    };
    sellerProfile: sellerProfile & {
        products: (Product & {
            city: City;
            unit: Unit;
        })[];
    };
    freeRequests: (FreeRequests & {
      city : City;
    })[];
    connection: Connections & {
      follower: {
            id: number;
        }[];
        following: {
            id: number;
        }[];
    },
    FollowedByME : boolean
  }