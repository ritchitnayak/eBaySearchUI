import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchItem } from '../models/SearchItem';

@Injectable({
  providedIn: 'root'
})
export class EbaySearchService {

  constructor(private http:HttpClient) { }

  getItems(url:string):Observable<SearchItem[]> {
    return this.http.get<SearchItem[]>('/api/search?'+url);
  }
}
