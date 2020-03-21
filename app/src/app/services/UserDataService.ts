import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserDataService {

    constructor(
        private storage: Storage
    ) {
    }

    saveUserName(username: string) {
        console.log(username);
    }

    getUserName(): string {
        return null;
    }

    saveProfilePicturePath(path: string) {

    }

    getProfilePicturePath(): string {
        return null;
    }

}

