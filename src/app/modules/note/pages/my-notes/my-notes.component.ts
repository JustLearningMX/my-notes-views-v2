import {Component, inject, OnInit} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {SubmenuNoteComponent} from "../../components/submenu-note/submenu-note.component";
import {finalize, tap} from "rxjs";
import {GridNoteComponent} from "../../components/grid-note-card/grid-note.component";
import {MessagesModule} from "primeng/messages";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-my-notes',
  standalone: true,
  imports: [
    SubmenuNoteComponent,
    GridNoteComponent,
    MessagesModule,
    ProgressSpinnerModule
  ],
  templateUrl: './my-notes.component.html',
  styleUrl: './my-notes.component.css'
})
export default class MyNotesComponent implements OnInit {

  noteService = inject(NoteService);
  title: string = 'actives';
  isLoading: boolean = true;

  messageNotData = [
    { severity: 'info', summary: 'No Notes!', detail: 'Create your first notes' },
  ];

  ngOnInit(): void {
    this.noteService.getAllUnarchived(0).pipe(
      tap(() => this.isLoading = true),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

}
