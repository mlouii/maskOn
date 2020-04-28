import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastController} from "@ionic/angular";

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

    constructor(private router: Router, private http: HttpClient, private toastController: ToastController) { }

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

    login(userName: string, password: string) {
        const bod = ({
            username: userName,
            password: password
        });
        console.log(bod);
        this.http.post('http://localhost:5000/auth', bod).subscribe(data => {
                if (data.response) {
                    this._email = userName;
                    this.getUserData();
                    this._userIsAuthenticated = true;
                    this.router.navigateByUrl('/shop');
                } else {
                    this.presentToast('Username or Password not found. Please try again.');
                }
        }, error => {
            this.presentToast('Username or Password not found. Please try again.');
        });
        // this._firstName = 'Mark';
        // this._middleName = '';
        // this._lastName = 'Lou';
        // this._phoneNumber = '123 456 3525';
        // this._address1 = '3324 S Wabash Ave';
        // this._address2 = '';
        // this._city = 'Chicago';
        // this._state = 'Illinois';
        // this._zipCode = '69054';
    }

    getUserData() {
        this.http.get(`http://localhost:5000/auth/${this._email}`).subscribe(
            data => {
                console.log(data[0]);
                this._city = data[0].city;
                this._state = data[0].state;
                this._firstName = data[0].firstname;
                this._middleName = data[0].middlename;
                this._zipCode = data[0].zipcode;
                this._address2 = data[0].address2;
                this._address1 = data[0].address1;
                this._phoneNumber = data[0].phoneNumber;
            }
        );
    }

    logout() {
        this._userIsAuthenticated = false;
        this.router.navigateByUrl('/auth');
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
        });
        toast.present();
    }
}
