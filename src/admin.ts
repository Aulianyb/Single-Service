import { User } from './models/models';

export class AdminUser {
    private static instance: User;
    public constructor(name: string) {
        const admin : User = {
            username : name
        }
        AdminUser.instance = admin
    }

    public static getInstance(name: string = "AdminAccount"): User {
        if (!AdminUser.instance){
            const admin : User = {
                username : name
            }
            AdminUser.instance = admin
        }
      return AdminUser.instance;
    }
  }