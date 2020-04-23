import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // tslint:disable-next-line:variable-name
    private _userIsAuthenticated = false;
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:variable-name
    private _firstName: string;
    private _email: string;
    private _middleName: string;
    private _lastName: string;
    private _phoneNumber: string;
    private _address1: string;
    private _address2: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(private router: Router) { }

    get userIsAuthenticated() {
        return this._userIsAuthenticated;
    }


    get email() {
        return this._email;
    }

    get firstName() {
        return this._firstName;
    }

    get middleName() {
        return this._middleName;
    }

    get lastName() {
        return this._lastName;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }
    get address1() {
        return this._address1;
    }

    get address2() {
        return this._address2;
    }
    get city() {
        return this._city;
    }
    get state() {
        return this._state;
    }
    get zipCode() {
        return this._zipCode;
    }

    login() {
        this._userIsAuthenticated = true;
        this._firstName = 'Mark';
        this._middleName = '';
        this._lastName = 'Lou';
        this._phoneNumber = '123 456 3525';
        this._address1 = '3324 S Wabash Ave';
        this._address2 = '';
        this._city = 'Chicago';
        this._state = 'Illinois';
        this._zipCode = '69054';
    }

    logout() {
        this._userIsAuthenticated = false;
        this.router.navigateByUrl('/auth');
    }
}
