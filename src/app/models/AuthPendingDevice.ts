import { User } from "./User"

export class AuthPendingDevice {

    id: number = 0;
    deviceID: string = "";
    requester: number = 0;
    message: string = "";
    requestDate: Date = new Date();
    Requester: User = new User();

}