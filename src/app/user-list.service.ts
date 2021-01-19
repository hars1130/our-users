import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private http: HttpClient) { }

  httpOptions: any = {
    observe: 'response'
  };

  private apiUrl = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json";
  private jsonUrl = "assets/json/recipes.json";

  public getUsersFromServer() {
    return this.http.get(this.apiUrl, this.httpOptions).pipe(map(result => result['body']));
  }

  public getUsersfromJSON() {
    return this.http.get(this.jsonUrl, this.httpOptions).pipe(map(result => result['body']));
  }

}
