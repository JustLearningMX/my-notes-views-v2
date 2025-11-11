import {inject, Injectable, signal} from '@angular/core';
import {Router} from "@angular/router";
import {AuthApiService} from "../../../core/api/auth-api.service";
import {ILoginBody, IRegisterBody, ITokenAuth, LocalStorage} from "../../../core/interfaces/auth/auth.interface";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {getFirstMessageOfError} from "../../../core/utils/message-values.util";
import {MessagesService} from "../../../shared/services/messages.service";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //services
  private messageService = inject(MessagesService);
  private router = inject(Router);
  private authApi = inject(AuthApiService);

  // User Authenticated
  public authUser = signal<ITokenAuth | undefined>(undefined);

  // isAuth
  isAuth = signal<boolean>(false);

  login(data: ILoginBody): Observable<void> {
    return this.authApi.login(data).pipe(
      tap(( data ) => {
        this.authUser.set(data);
        this.isAuth.set(true);
        localStorage.setItem('token', data.token);
      }),
      tap(( data ) => {
        this.messageService.showMessage(
          `Welcome ${data?.firstName} ${data?.lastName}`,
          'Welcome',
          'success');

        setTimeout(() => {
          this.router.navigate(['/notes'])
        }, 600);
      }),
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : 'An error occurred while trying login.',
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap(() => EMPTY)
    );
  }

  checkAuthentication(): Observable<boolean> {
    return !localStorage.getItem(LocalStorage.UserAuthToken) ? of(false) : of(true);
  }

  logout() {
    localStorage.removeItem(LocalStorage.UserAuthToken);
    localStorage.removeItem(LocalStorage.User);
    this.isAuth.set(false);

    this.messageService.showMessage(
      `See you later aligator!`,
      'Goodbye!',
      'success');

    setTimeout(() => {
      this.router.navigate(['/'])
    }, 300);
  }

  getToken(): string | null {
    return localStorage.getItem(LocalStorage.UserAuthToken);
  }

  addTokenToHeaders(): HttpHeaders {
    const token = this.getToken();

    if (token) {
      this.isAuth.set(true);
      return new HttpHeaders({
        'Authorization': `Bearer ${ token }`
      });
    } else {
      return new HttpHeaders();
    }
  }

  register(data: IRegisterBody): Observable<void> {
    return this.authApi.register(data).pipe(
      tap(( data ) => {
        localStorage.setItem(LocalStorage.User, JSON.stringify( data ));
      }),
      tap(( data ) => {
        this.messageService.showMessage(
          `You have been registered successfully!`,
          'Thank you!',
          'success');

        setTimeout(() => {
          this.router.navigate(['/'])
        }, 600);
      }),
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : 'An error occurred while trying register.',
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap(() => EMPTY)
    );
  }

}
