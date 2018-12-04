
import { Component, OnInit, NgZone } from '@angular/core';
import { BackEndService } from './back-end.service';
import * as $ from 'jquery';
import 'foundation-sites';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  settings: any = {};
  hasSession = false;
  constructor( private _backEndService: BackEndService, private _ngZone: NgZone) {}
  setHasSession(hasSession) {
    this._ngZone.run(() => {
      this.hasSession = hasSession;
    });
    console.log('Main App has session as: ' + this.hasSession);
  }
  ngOnInit () {
    this._backEndService.getSettings((error, settings) => {
      if (error) {
        throw new Error(error.message);
      }
      this._ngZone.run(() => {
        this.settings = settings;
      });
    });
    this._backEndService.getSessionStatus((error, hasSession) => {
      if (error) {
        throw new Error(error.message);
      }
      this._ngZone.run(() => {
        this.hasSession = hasSession;
      });
    });
    $(document).ready(() => {
      $(document).foundation();
    });
  }
}
