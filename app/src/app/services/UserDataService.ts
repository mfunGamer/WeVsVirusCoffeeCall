import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserDataService {

    constructor(
        private storage: Storage
    ) {
    }

    saveUserName(username: string) {
        this.storage.set('username', username);

    }

    getUserName(): Promise<string> {
        return this.storage.get('username');


    }

    saveProfilePictureURL(url: string) {
        this.storage.set('profilePictureURL', url);

    }

    getProfilePictureURL(): Promise<string> {
        return this.storage.get('profilePictureURL');

    }

    saveViewedAlert(viewed: boolean) {
        this.storage.set('viewed', true);
    }

    getViewedAlert(): Promise<boolean> {
        return this.storage.get('viewed');
    }

}

