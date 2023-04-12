import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) {
  }

  getTasks(filters: any): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/tasks?completed=${filters.completed}&page=${filters.page}`);
  }

  save(task: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/tasks/`, task);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/tasks/${id}`);
  }

  markCompleted(id: string): Observable<any> {
    return this.http.patch<any>(`${environment.baseUrl}/tasks/${id}`, {});
  }

  update(task: any): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/tasks/${task.id}`, task);
  }
}
