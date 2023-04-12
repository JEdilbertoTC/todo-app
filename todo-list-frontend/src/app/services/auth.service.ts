import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/auth/login`, {
      email, password
    });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/auth/register`, {
      name: user.name, password: user.password, email: user.email
    });
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/auth/logout`, {});
  }

  user(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/auth/user`);
  }

}
