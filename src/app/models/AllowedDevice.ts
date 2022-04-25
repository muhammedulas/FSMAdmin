import { ActiveSession } from "./ActiveSession";
import { DevicePermission } from "./DevicePermission";
import { User } from "./User";

export class AllowedDevice {
    id: number = 0;
    nr: number = 0;
    deviceID: string = "";
    definition: string = "";
    allowedUserID: number = 0;

    AllowedUser?: User;
    DevicePermissions?: DevicePermission[];
    ActiveSessions?: ActiveSession[];
}