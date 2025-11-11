import {inject, Injectable, signal} from '@angular/core';
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {INoteFull, INoteResponse, INotes, INoteToUpdate} from "../../../core/interfaces/note.interface";
import {NoteApiService} from "../../../core/api/note-api.service";
import {MessagesService} from "../../../shared/services/messages.service";
import {getFirstMessageOfError} from "../../../core/utils/message-values.util";
import {Router} from "@angular/router";
import {ConfirmationService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  resNotes = signal<INotes | null>(null);
  notes = signal<INoteFull[]>([]);

  private noteApi = inject(NoteApiService);
  private messageService = inject(MessagesService);
  public confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  getAllUnarchived(page: number = 0): Observable<INotes> {
    return this.noteApi.getAllUnarchived(page).pipe(
      tap((notes) => {
        this.resNotes.set(notes);
        this.notes.update( ( ) =>
          notes.content.filter((note) => !note.deleted)
        );
      }),
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : 'An error occurred while trying to get your active notes.',
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap(() => EMPTY)
    );
  }

  getAllArchived(page: number = 0): Observable<INotes> {
    return this.noteApi.getAllArchived(page).pipe(
      tap((notes) => {
        this.resNotes.set(notes);
        this.notes.update( ( ) =>
          notes.content.filter((note) => !note.deleted)
        );
      }),
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : 'An error occurred while trying to get your archived notes.',
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap(() => EMPTY)
    );
  }

  getNoteById(id: number): Observable<INoteFull> {
    return this.noteApi.getNoteById( id ).pipe(
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : 'An error occurred while trying to get your note.',
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap((note) => {
        if(note)
          return of(note);

        return EMPTY;
      })
    );
  }

  updateNote( body: INoteToUpdate ): Observable<INoteFull> {
    return this.noteApi.updateNote( body ).pipe(
      tap((note) => {
        this.messageService.showMessage(
          `Note updated successfully!`,
          'Update!',
          'success');

        setTimeout(() => {
          this.router.navigate(['/notes'])
        }, 600);
      }),
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : 'An error occurred while trying to update your note.',
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap(() => EMPTY)
    );
  }

  createNote( body: INoteToUpdate ): Observable<INoteResponse> {
    return this.noteApi.createNote( body ).pipe(
      tap((note) => {
        this.messageService.showMessage(
          `Note created successfully!`,
          'Created!',
          'success');

        setTimeout(() => {
          this.router.navigate(['/notes'])
        }, 600);
      }),
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : 'An error occurred while trying to get your note.',
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap((note) => {
        if(note)
          return of(note);

        return EMPTY;
      })
    );
  }

  confirmDeleteNote(id: number | undefined) {
    if (id === undefined) return;

    return this.confirmationService.confirm({
      key: 'dialog',
      target: document.body,
      message: 'Are you sure you want to delete this note?',
      header: 'Delete note',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.deleteNote(id).subscribe({
        next: () => {
          this.messageService.showMessage(
            `Note deleted successfully!`,
            'Deleted!',
            'success'
          );

        },
        error: () => {
          this.messageService.showMessage(
            'An error occurred while trying to delete your note.',
            'Error',
            'error');
        },
      }),
    });
  }

  private deleteNote( id: number ) {
    return this.noteApi.deleteNote(id).pipe(
      tap(() => {
        this.notes.update((notes ) =>
          notes.filter((note) => note.id !== id && !note.deleted)
        );
      }),
      tap((_) => {
        this.messageService.showMessage(
          `Note deleted successfully!`,
          'Deleted!',
          'success');

        setTimeout(() => {
          this.router.navigate(['/notes'])
        }, 600);
      }),
      switchMap(() => EMPTY)
    );
  };

  archiveNote( id: number ): Observable<INoteResponse> {
    return this.noteApi.archiveNote( id ).pipe(
      tap(() => {
        this.notes.update((notes ) =>
          notes.filter((note) => note.id !== id && !note.deleted)
        );
      }),
      tap((note) => {
        this.messageService.showMessage(
          `Note archived successfully!`,
          'Archived!',
          'success');

        setTimeout(() => {
          this.router.navigate(['/notes'])
        }, 600);
      }),
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : 'An error occurred while trying to archive your note.',
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap((note) => {
        if(note)
          return of(note);

        return EMPTY;
      })
    );
  }

  unarchivedNote( id: number ): Observable<INoteResponse> {
    return this.noteApi.unarchivedNote( id ).pipe(
      tap(() => {
        this.notes.update((notes ) =>
          notes.filter((note) => note.id !== id && !note.deleted)
        );
      }),
      tap((note) => {
        this.messageService.showMessage(
          `Note unarchived successfully!`,
          'Unarchived!',
          'success');

        setTimeout(() => {
          this.router.navigate(['/notes/archived'])
        }, 600);
      }),
      catchError(({ error }) => {
        const messageError = getFirstMessageOfError(error.messages ? error.messages : '');

        this.messageService.showMessage(
          messageError ? messageError : 'An error occurred while trying to unarchived your note.',
          'Error',
          'error');
        return of(undefined);
      }),
      switchMap((note) => {
        if(note)
          return of(note);

        return EMPTY;
      })
    );
  }

}
