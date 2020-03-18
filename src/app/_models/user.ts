import { Role } from "./role";

export interface Permissions {
    objectName: string;
    permission: string;
}
export interface UserInfo {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    emailAddress: string;
    clientId?: number;
    venueId?: number;
    zoneId?: number
}
export class User {
    user: UserInfo;
    role: Role;
    token?: string;
    effectivePermissions?: Array<Permissions>;
}