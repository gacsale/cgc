import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getProducts() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'product/all' ).pipe(
      catchError( this.handleError.handleError<any>(`getProducts`))
    );
  }

  public getProduct(id: number) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'product/' + id ).pipe(
      catchError( this.handleError.handleError<any>(`getProduct`))
    );
  }

  public postProduct(data: any) {
    return this.http.put<any>(this.appConfig.getUrlBase() + 'product/add', data).pipe(
      catchError(this.handleError.handleError<any>(`postProduct`))
    );
  }

  public putProduct(id: number, data: any) {
    return this.http.post<any>(this.appConfig.getUrlBase() + 'product/' + id, data).pipe(
      catchError(this.handleError.handleError<any>(`putClient`))
    );
  }
}
