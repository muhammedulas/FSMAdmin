import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private publicKey = "FSM.Datamer.PublicKey.46281973";
  private secretKey = "Qx]ky2~`@;-:A/qa";

  constructor() { }

  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

/*   encrypt(val: string) {
    var key = CryptoJS.enc.Utf8.parse(this.secretkey);
    var iv = CryptoJS.enc.Utf8.parse(this.secretkey);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(val.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }

  decrypt(val: string) {
    var key = CryptoJS.enc.Utf8.parse(this.secretkey);
    var iv = CryptoJS.enc.Utf8.parse(this.secretkey);
    var decrypted = CryptoJS.AES.decrypt(val, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } */

}
