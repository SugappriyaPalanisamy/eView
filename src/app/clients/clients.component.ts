import { Component, OnInit } from '@angular/core';
import {ClientsService} from '../services/clients.service';
import { Client } from '../services/models';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare var $:any;

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: Client[];
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  public dataTable: DataTable;
  private svc : ClientsService;

  constructor(clientService: ClientsService, private router:Router) { 
    this.svc = clientService;
   
  }

  ngOnInit(): void {
    this.dataTable = {
      headerRow: [ 'Id', 'Client Name', 'Address', 'Actions' ],
      footerRow: [ 'Id', 'Client Name', 'Address', 'Actions' ],
      dataRows: this.svc.getClietns()
    };
  }

  editClient(id:any){
    console.log(this.router);
    this.router.navigate(['/clientdetails/', id])
  }
  deleteClient(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes, delete it!',
       buttonsStyling: false
    }).then((result) => {
      if (result.value) {
        var success = this.svc.deleteClient(id);
        if(success){
          Swal.fire(
            {
              title: 'Deleted!',
              text: 'Client has been deleted.',
              type: 'success',
              confirmButtonClass: "btn btn-success",
              buttonsStyling: false
            }
          )
        }
      }
      else{
        Swal.fire({
          title: 'Cancelled',
          text: 'Client is safe :)',
          type: 'error',
          confirmButtonClass: "btn btn-info",
          buttonsStyling: false
        })
      }
    });
  }

  // ************************************************************************
  // These are client side (jQuery) functions being attached with the table
  //*************************************************************************
  ngAfterViewInit(){
    $('#datatable').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Search records",
      }

    });

    var table = $('#datatable').DataTable();
    
    // These were client side button events that 
    // we won't be using so commented out (MM)

    // Edit record
    // table.on('click', '.edit', function() {
    //   let $tr = $(this).closest('tr');

    //   var data = table.row($tr).data();
    //   //alert(['/clientdetails/' + data[0]]);
    //   console.log(this.router);
    //   this.router.navigate(['/clientdetails/' , data[0]]);
    //   //alert('You press on Row: ' + data[0] + ' ' + data[1] + ' ' + data[2] + '\'s row.');
    //});

    // Delete a record
    // table.on('click', '.remove', function(e) {
    //   let $tr = $(this).closest('tr');
    //   table.row($tr).remove().draw();
    //   e.preventDefault();
    // });

    //Like record
    // table.on('click', '.like', function() {
    //   alert('You clicked on Like button');
    // });
  }
}
