export class CurrentSession {

    "access_token": string;
    "token_type": string;
    "expires_in": number;
    "sessionID": number;
    "id": number;
    "nr": number;
    "userName": string
    "name": string
    "surname": string
    "defaultWorkspaceNr": number;
    "profilePhotoURL": string
    "ERPToken": string
    "device_id": string
    "isAdmin": boolean;
    ".issued": Date;
    ".expires": Date;

    public CurrentSession(){
        this.access_token = "";
        this.token_type = "";
        this.expires_in = 0;
        this.sessionID = 0;
        this.id = 0;
        this.nr = 0;
        this.userName = "";
        this.name = "";
        this.surname = "";
        this.defaultWorkspaceNr = 0;
        this.profilePhotoURL = "";
        this.ERPToken = "";
        this.isAdmin = false;
        this[".issued"] = new Date();
        this[".expires"] = new Date();
    }
}