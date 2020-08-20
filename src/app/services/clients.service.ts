import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../app-config.service';
import { catchError } from 'rxjs/operators';
import { HandleError } from '../common/handle-error';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private handleError: HandleError
  ) { }

  public getClients() {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'client/all' ).pipe(
      catchError( this.handleError.handleError<any>(`getClients`))
    );
  }

  public getClient(id: number) {
    return this.http.get<any>( this.appConfig.getUrlBase() + 'client/' + id ).pipe(
      catchError( this.handleError.handleError<any>(`getClient`))
    );
  }

  public postClient(data: any) {
    return this.http.put<any>(this.appConfig.getUrlBase() + 'client/add', data).pipe(
      catchError(this.handleError.handleError<any>(`postClient`))
    );
  }

  public putClient(id: number, data: any) {
    return this.http.post<any>(this.appConfig.getUrlBase() + 'client/' + id, data).pipe(
      catchError(this.handleError.handleError<any>(`putClient`))
    );
  }

}
