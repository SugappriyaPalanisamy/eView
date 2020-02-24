import { Injectable } from '@angular/core';
import { Client } from './models';
import { CLIENTS } from './Data';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
private Clients : Client[];
  constructor() {
    this.Clients = CLIENTS;
   }
  getClietns(): Client[]{
    return this.Clients;
  }
  getClient(id:number):Client{
    return this.Clients.find(x => x.Id == id);
  }
  deleteClient(id:number):boolean{
    return true;
  }
}

