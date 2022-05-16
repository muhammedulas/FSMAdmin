import { UserContactInfo_Adress } from "./UserContactInfo_Adress";
import { UserContactInfo_Mail } from "./UserContactInfo_Mail";
import { UserContactInfo_Phone } from "./UserContactInfo_Phone";

export class User {
    id: number = 0;
    nr: number = 0;
    userName: string = "";
    LogoUserID: number = 0;
    passwordKey: string = "";
    passwordKey1: string = "";
    passwordKey2: string = "";
    profilePhotoURL: string = "";
    blocked: number = 0;
    defaultWorkspaceNr: number = 0;
    name: string = "";
    surName: string = "";
    isAdmin: number = 0;
    authKey: string = "";
    ERPToken: string = "";
    loginLimit: number = 0;
    mailAdresses: UserContactInfo_Mail[] = [];
    phoneNumbers: UserContactInfo_Phone[] = [];
    adresses: UserContactInfo_Adress[] = [];
}