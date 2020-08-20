import { Component, OnInit, Inject } from '@angular/core';
import { SalesService } from '../services/sales.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-sails',
  templateUrl: './sails.component.html',
  styleUrls: ['./sails.component.css']
})
export class SailsComponent implements OnInit {

  sales: any[] = [];


  constructor(
    private saleSrv: SalesService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.saleSrv.getSales().subscribe(
      res => {
        if (res.status === 1) {
          this.sales = res.data;
          console.log(this.sales);

        }
      }
    );
  }

  upsert(id: number) {
    const dialogRef = this.dialog.open(SaleEditComponent, {
      width: '750px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getClients();
    });
  }


}


@Component({
  selector: 'app-sale-edit',
  templateUrl: './sale-edit.component.html'
})
export class SaleEditComponent implements OnInit {
  saleId: number;
  sale: any = {};
  optionsStatus = [ {name: 'Activo', id: 1}, {name: 'Inactivo', id: 0} ];

  constructor(
    public dialogRef: MatDialogRef<SaleEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private saleSrv: SalesService,
    ) {

      this.saleId = +data;
      if (this.saleId > 0) {
        this.getSale(this.saleId);
      }
    }

  ngOnInit() {
  }

  getSale(id: number) {
    this.saleSrv.getSale(id).subscribe(
      res => {
        if (res.status === 1) {
          this.sale = res.data[0];
        }
      }
    );
  }


  close() {
    this.dialogRef.close();
  }

}
