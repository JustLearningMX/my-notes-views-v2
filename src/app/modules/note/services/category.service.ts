import {inject, Injectable, signal} from '@angular/core';
import {CategoryApiService} from "../../../core/api/category-api.service";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {getFirstMessageOfError} from "../../../core/utils/message-values.util";
import {MessagesService} from "../../../shared/services/messages.service";
import {ICategories, ICategory, ICategoryCreate} from "../../../core/interfaces/category.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryApi = inject(CategoryApiService);
  private messageService = inject(MessagesService);
  userCategories = signal<ICategory[] | null>(null);

  createCategories( body: ICategoryCreate ): Observable<ICategoryCreate> {
    return this.categoryApi.createCategories( body ).pipe(
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : "An error occurred while trying to create note's categories.",
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap(() => EMPTY)
    );
  }

  getCategoriesFromUser(): Observable<ICategories> {
    return this.categoryApi.getCategoriesFromUser().pipe(
      tap( data => this.userCategories.update( () => data.categories)),
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : "An error occurred while trying to get note's categories.",
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap((categories) => {
        if(categories) {
          return of({...categories});
        }

        return EMPTY;
      })
    );
  }

}
