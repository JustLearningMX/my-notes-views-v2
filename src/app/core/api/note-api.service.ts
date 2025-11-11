import {inject, Injectable} from "@angular/core";
import {environments} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INote, INoteFull, INoteResponse, INotes, INoteToUpdate} from "../interfaces/note.interface";
import {AuthService} from "../../modules/auth/services/auth.service";
import {IDelete} from "../interfaces/delete.interface";

@Injectable({
  providedIn: 'root',
})
export class NoteApiService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private baseUrl: string = environments.baseUrl;

  getAllUnarchived(page: number = 0): Observable<INotes> {
    return this.http.get<INotes>(`${this.baseUrl}/notes/unarchived?page=${page}`,{ headers: this.authService.addTokenToHeaders() });
  }

  getAllArchived(page: number = 0): Observable<INotes> {
    return this.http.get<INotes>(`${this.baseUrl}/notes/archived?page=${page}`,{ headers: this.authService.addTokenToHeaders() });
  }

  getNoteById(id: number): Observable<INoteFull> {
    return this.http.get<INoteFull>(`${this.baseUrl}/notes/${ id }`,{ headers: this.authService.addTokenToHeaders() });
  }

  updateNote( body: INoteToUpdate ): Observable<INoteFull> {
    return this.http.put<INoteFull>(`${this.baseUrl}/notes`, body,{ headers: this.authService.addTokenToHeaders() });
  }

  createNote( body: INoteToUpdate ): Observable<INoteResponse> {
    return this.http.post<INoteResponse>(`${this.baseUrl}/notes`, body,{ headers: this.authService.addTokenToHeaders() });
  }

  deleteNote( id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/notes/${id}`, { headers: this.authService.addTokenToHeaders() });
  }

  archiveNote( id: number ): Observable<INoteResponse> {
    return this.http.put<INoteResponse>(`${this.baseUrl}/notes/archived/${ id }`, null,{ headers: this.authService.addTokenToHeaders() });
  }

  unarchivedNote( id: number ): Observable<INoteResponse> {
    return this.http.put<INoteResponse>(`${this.baseUrl}/notes/unarchived/${ id }`, null,{ headers: this.authService.addTokenToHeaders() });
  }

}
