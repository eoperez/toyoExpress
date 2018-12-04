import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms';
import { BackEndService } from '../back-end.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() changeHasSession = new EventEmitter();
  loginError = false;
  hasSession = false;
  constructor( private _backEndService: BackEndService, private _ngZone: NgZone) { }
  onSignInSubmit(signIn: NgForm) {
      this._backEndService.getUserSigned(signIn.value, (error, isSigned) => {
        if (error) {
          throw new Error (error.message);
        }
        // TODO: Need to show an error if authentication fail
        if (!isSigned) {
          this._ngZone.run(() => {
            this.loginError = true;
          });
          console.log('Authentication failed');
        } else {
          this.hasSession = true;
          this.changeHasSession.emit(this.hasSession);
        }
      });
  }
  ngOnInit() {}

}
