import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserDataService {

    constructor(
        private storage: Storage
    ) {
    }

    saveUserName(username: string) {
        this.storage.set('username','username');

    }

    getUserName(): Promise<String> {
        return this.storage.get('username');


    }

    saveProfilePictureURL(url: string) {

    }

    getProfilePictureURL(): string {
        return null;
    }

}

