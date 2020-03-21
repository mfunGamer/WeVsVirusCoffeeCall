import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class UserDataService {

    constructor() {
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

