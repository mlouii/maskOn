import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    isLogin: boolean;
    userName: string;
    password: string;

    constructor(private authService: AuthService, private router: Router, ) {
    }

    ngOnInit() {
        this.isLogin = true;
    }

    onLogin() {
        this.authService.login(this.userName, this.password);
        this.userName = '';
        this.password = '';
        this.router.navigateByUrl('/shop');
    }

    switchType() {
        this.isLogin = !this.isLogin;
    }

    switchAuth() {
        this.router.navigateByUrl('/employee-auth');
    }

}
