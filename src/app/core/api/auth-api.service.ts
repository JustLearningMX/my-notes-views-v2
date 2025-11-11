import {inject, Injectable} from "@angular/core";
import {environments} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {ILoginBody, IRegisterBody, IRegisterResAuth, ITokenAuth} from "../interfaces/auth/auth.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private http = inject(HttpClient);
  private baseUrl: string = environments.baseUrl;

  login(data: ILoginBody): Observable<ITokenAuth> {
    return this.http.post<ITokenAuth>(`${this.baseUrl}/users/auth`, data);
  }

  register(data: IRegisterBody): Observable<IRegisterResAuth> {
    return this.http.post<IRegisterResAuth>(`${this.baseUrl}/users`, data);
  }

}
