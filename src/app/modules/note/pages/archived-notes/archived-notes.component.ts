import {Component, inject, OnInit} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {SubmenuNoteComponent} from "../../components/submenu-note/submenu-note.component";
import {GridNoteComponent} from "../../components/grid-note-card/grid-note.component";
import {MessagesModule} from "primeng/messages";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {finalize, tap} from "rxjs";

@Component({
  selector: 'app-archived-notes',
  standalone: true,
  imports: [
    SubmenuNoteComponent,
    GridNoteComponent,
    MessagesModule,
    ProgressSpinnerModule
  ],
  templateUrl: './archived-notes.component.html',
  styleUrl: './archived-notes.component.css'
})
export default class ArchivedNotesComponent implements OnInit {

  title: string = 'archived';
  noteService = inject(NoteService);
  isLoading: boolean = true;

  messageNotData = [
    { severity: 'info', summary: 'No Archives Notes!', detail: "You don't have any archived notes yet."},
  ];

  ngOnInit(): void {
    this.noteService.getAllArchived(0).pipe(
      tap(() => this.isLoading = true),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

}
