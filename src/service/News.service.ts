import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) { }
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private pathUrl = 'http://localhost:3333/';
  private prefixRequest = 'news/';

  public getNewsByTheme(theme:string): Observable<any> {
    const url = this.pathUrl + this.prefixRequest + "?theme=" + theme;
    return this.http.get(url, {headers: this.headers});
  }

  public createNews(img_url : string, title : string, description : string, theme : string, link : string): Observable<any> {
    const url = this.pathUrl + this.prefixRequest + "create";
    return this.http.post(url, {headers: this.headers, img_url, title, description, theme, link});
  }

  public deleteNews(id:string): Observable<any>{
    const url = this.pathUrl + this.prefixRequest + "delete/" + "?id=" + id;
    return this.http.delete(url);
  }

  public updateNews(img_url : string, title : string, description : string, theme : string, link : string, id : string): Observable<any> {
    const url = this.pathUrl + this.prefixRequest + "update";
    return this.http.post(url, {headers: this.headers, img_url, title, description, theme, link, id});
  }
}