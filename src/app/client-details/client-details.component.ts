import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Client } from 'app/services/models';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  public client: Client;

  constructor() { }

  ngOnInit(): void {
    this.client = { Id: 0,      ClientName: 'New client',      ClientAddress: 'New Address' }
  }
  onSubmit(): void { }

}
