import { Role } from "./role";

export interface permissions {
    objectName: string;
    permission: string;
}

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    clientId?: number;
    venueId?: number;
    zoneId?:number
    role: Role;
    token?: string;
    permissions?: Array<permissions>;
}