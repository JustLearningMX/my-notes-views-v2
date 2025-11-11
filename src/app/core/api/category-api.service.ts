import {inject, Injectable} from "@angular/core";
import {environments} from "../../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../../modules/auth/services/auth.service";
import {ICategories, ICategory, ICategoryCreate} from "../interfaces/category.interface";

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private baseUrl: string = environments.baseUrl;

  createCategories(body: ICategoryCreate ): Observable<ICategoryCreate> {
    return this.http.post<ICategoryCreate>(`${this.baseUrl}/categories`, body,{ headers: this.authService.addTokenToHeaders() });
  }

  getCategoriesFromUser(): Observable<ICategories> {
    return this.http.get<ICategories>(`${this.baseUrl}/categories`,{ headers: this.authService.addTokenToHeaders() });
  }

}
