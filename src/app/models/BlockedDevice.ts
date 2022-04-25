import { User } from "./User";


export class BlockedDevice {
    id: number = 0;
    deviceID: string = "";
    definition: string = "";
    blockedUserID: number = 0;
    BlockedUser: User = new User();
}