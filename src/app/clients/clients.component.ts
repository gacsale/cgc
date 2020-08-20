import { Component, OnInit, Inject } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];


  constructor(
    private clientSrv: ClientsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.clientSrv.getClients().subscribe(
      res => {
        if (res.status === 1) {
          this.clients = res.data;
          console.log(this.clients);

        }
      }
    );
  }

  upsert(id: number) {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      width: '750px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClients();
    });
  }

}

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html'
})
export class ClientEditComponent implements OnInit {
  clientId: number;
  client: any = {};
  formClient: FormGroup;
  optionsStatus = [ {name: 'Activo', id: 1}, {name: 'Inactivo', id: 0} ];

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientSrv: ClientsService,
    ) {

      this.clientId = +data;
      this.formClient = new FormGroup({
        clientDesc: new FormControl('', Validators.required),
        nit: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        birthday: new FormControl('', Validators.required),
        statusId: new FormControl(1, Validators.required),
      });

      if (this.clientId > 0) {
        this.getClient(this.clientId);
      }
    }

  ngOnInit() {
  }

  getClient(id: number) {
    this.clientSrv.getClient(id).subscribe(
      res => {
        if (res.status === 1) {
          this.client = res.data[0];
          this.formClient.patchValue(this.client);
        }
      }
    );
  }

  upsert() {
    const client = JSON.parse(JSON.stringify(this.formClient.value));
    if (this.clientId > 0) {
      this.update(this.clientId, client);
    } else {
      this.insert(client);
    }
  }

  update(id: number, data: any) {
    data.clientId = id;
    this.clientSrv.putClient(id, data).subscribe(
      res => {
        if (res.status === 1) {
          console.log('ok');
          this.close();
        }
      }
    );
  }

  insert(data: any) {
    this.clientSrv.postClient(data).subscribe(
      res => {
        if (res.status === 1) {
          console.log('ok');
          this.close();
        }
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
