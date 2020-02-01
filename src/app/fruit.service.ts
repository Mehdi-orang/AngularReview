import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Fruit } from './fruit';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class FruitService {
  
  private fruitsUrl = 'api/fruits';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  /** GET fruits from the server */
 getFruits (): Observable<Fruit[]> {
  return this.http.get<Fruit[]>(this.fruitsUrl)
    .pipe(
      tap(_ => this.log('fetched fruits')),
      catchError(this.handleError<Fruit[]>('getFruits', []))
    );
}

/** GET fruit by id. Will 404 if id not found */
getFruit(id: number): Observable<Fruit> {
  const url = `${this.fruitsUrl}/${id}`;
  return this.http.get<Fruit>(url).pipe(
    tap(_ => this.log(`fetched fruit id=${id}`)),
    catchError(this.handleError<Fruit>(`getFruit id=${id}`))
  );
}
  /** Log a Fruitervice message with the MessageService */
private log(message: string) {
  this.messageService.add(`FruitService: ${message}`);
}

/** PUT: update the hero on the server */
updateFruit (fruit: Fruit): Observable<any> {
  return this.http.put(this.fruitsUrl, fruit, this.httpOptions).pipe(
    tap(_ => this.log(`updated fruit id=${fruit.id}`)),
    catchError(this.handleError<any>('updateFruit'))
  );
}
/** POST: add a new hero to the server */
addFruit (fruit: Fruit): Observable<Fruit> {
  return this.http.post<Fruit>(this.fruitsUrl, fruit, this.httpOptions).pipe(
    tap((newFruit: Fruit) => this.log(`added fruit w/ id=${newFruit.id}`)),
    catchError(this.handleError<Fruit>('addHero'))
  );
}

/** DELETE: delete the hero from the server */
deleteFruit (fruit: Fruit | number): Observable<Fruit> {
  const id = typeof fruit === 'number' ? fruit : fruit.id;
  const url = `${this.fruitsUrl}/${id}`;

  return this.http.delete<Fruit>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted fruit id=${id}`)),
    catchError(this.handleError<Fruit>('deleteFruit'))
  );
}

searchFruits(term: string): Observable<Fruit[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Fruit[]>(`${this.fruitsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found fruits matching "${term}"`)),
    catchError(this.handleError<Fruit[]>('searchFruits', []))
  );
}

}

