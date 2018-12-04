import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';

export interface ISettings {
    id: number;
    banner: string;
    dbLocation: string;
    locale: string;
    receiptAttributes: string;
    quoteAttributes: string;
    isCashAllowed: boolean;
    isCheckAllowed: boolean;
    isCreditCardAllowed: boolean;
    isStoreCreditAllowed: boolean;
    isQuoteAllowed: boolean;
    created_at: Date;
    updated_at: Date;
}

@Injectable({
  providedIn: 'root'
})

export class BackEndService {
  settings: any = {};
  hasSession = false;
  error: Error;
  constructor(private _electronService: ElectronService) { }

  getSettings( callback: (error: Error, settings: ISettings) => void ) {
    console.log('getting cookies from backend');
    this._electronService.remote.session.defaultSession.cookies.get({}, (error, electronCookies) => {
      let settingsError;
      if (error) {
         settingsError = error;
      }
      for (const key in electronCookies) {
        if (electronCookies.hasOwnProperty(key)) {
          this.settings[electronCookies[key].name] = electronCookies[key].value;
        }
      }
      callback(settingsError, this.settings);
    });
  }
  getSessionStatus(callback: (error: Error, hasSession: boolean) => void) {
    this._electronService.remote.session.defaultSession.cookies.get({name: 'hasSession'}, (error, electronCookies) => {
      let sessionStatusError;
      if (error) {
        sessionStatusError = error;
      }
      console.log('Is authenticated: ' + (electronCookies[0].value === 'true'));
      callback(sessionStatusError, (electronCookies[0].value === 'true'));
    });
  }
  getUserSigned( credentials, callback: (error: Error, isSigned: boolean) => void) {
    const error: Error = null;
    try {
      this._electronService.ipcRenderer.send('signIn', credentials);
      this._electronService.ipcRenderer.on('signedIn', (event, isSigned) => {
      console.log('Backend service:Authentication succeed?\: ' + isSigned);
      callback(error, isSigned);
    });
    } catch (error) {
      callback(error, false);
    }
  }
}
