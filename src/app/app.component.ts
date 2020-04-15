import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {CartService} from './shared/cart.service';
import {Subscription} from 'rxjs';
import {AuthService} from './shared/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    cartQuantity: number;
    cartSub: Subscription;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private cartService: CartService,
        private authService: AuthService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });

        this.cartSub = this.cartService.cartItems.subscribe(cartItems => {
            this.cartQuantity = cartItems.length;
        });
    }
}
