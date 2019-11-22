import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(
    private _http: HttpClient
  ) { }

  // Get top teams
  public getTopTeams() {
    return this._http
      .get(environment.rootEndpoint + environment.teamEndpoint)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A client error occurred:', error);
      return throwError(error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`
      );
      return throwError(error);
    }
  }
}
