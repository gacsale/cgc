import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { HandleError } from '../common/handle-error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getSales() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'sale/all' ).pipe(
      catchError( this.handleError.handleError<any>(`getSales`))
    );
  }

  public getSale(id: number) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'sale/' + id ).pipe(
      catchError( this.handleError.handleError<any>(`getSale`))
    );
  }

  public postSale(data: any) {
    return this.http.put<any>(this.appConfig.getUrlBase() + 'sale/add', data).pipe(
      catchError(this.handleError.handleError<any>(`postSale`))
    );
  }

  public putSale(id: number, data: any) {
    return this.http.post<any>(this.appConfig.getUrlBase() + 'sale/' + id, data).pipe(
      catchError(this.handleError.handleError<any>(`putSale`))
    );
  }
}
