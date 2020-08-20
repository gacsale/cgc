import { Component, OnInit, Inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = [];
  constructor(
    private productSrv: ProductsService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productSrv.getProducts().subscribe(
      res => {
        if (res.status === 1) {
          this.products = res.data;
        }
      }
    );
  }

  upsert(id: number) {
    const dialogRef = this.dialog.open(ProductEditComponent, {
      width: '750px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }
}


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

  productId: number;
  product: any = {};
  formProduct: FormGroup;
  optionsStatus = [ {name: 'Activo', id: 1}, {name: 'Inactivo', id: 0} ];

  constructor(
    public dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productSrv: ProductsService,
    ) {

      this.productId = +data;
      this.formProduct = new FormGroup({
        productDesc: new FormControl('', Validators.required),
        price: new FormControl(0, Validators.required),
        statusId: new FormControl(1, Validators.required),
      });

      if (this.productId > 0) {
        this.getProduct(this.productId);
      }
    }

  ngOnInit() {
  }

  getProduct(id: number) {
    this.productSrv.getProduct(id).subscribe(
      res => {
        if (res.status === 1) {
          this.product = res.data[0];
          this.formProduct.patchValue(this.product);
        }
      }
    );
  }

  upsert() {
    const product = JSON.parse(JSON.stringify(this.formProduct.value));
    if (this.productId > 0) {
      this.update(this.productId, product);
    } else {
      this.insert(product);
    }
  }

  update(id: number, data: any) {
    data.productId = id;
    this.productSrv.putProduct(id, data).subscribe(
      res => {
        if (res.status === 1) {
          console.log('ok');
          this.close();
        }
      }
    );
  }

  insert(data: any) {
    this.productSrv.postProduct(data).subscribe(
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
