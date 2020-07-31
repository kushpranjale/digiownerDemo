import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SiteMasterService {
  // URL = 'http://localhost:3000/';
  URL = 'https://sleepy-cliffs-85651.herokuapp.com/';
  constructor(private http: HttpClient) {}

  getUrls(id: string) {
    return this.http.get(this.URL + 'get_urls/' + id);
  }
}
