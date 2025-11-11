import {Component, inject, Input, signal} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {NoteCardComponent} from "../note-card/note-card.component";
import {Router} from "@angular/router";

@Component({
  selector: 'grid-note',
  standalone: true,
  templateUrl: './grid-note.component.html',
  imports: [
    NoteCardComponent
  ],
  styleUrl: './grid-note.component.css'
})
export class GridNoteComponent {

  noteService = inject(NoteService);
  private router = inject(Router);

  currentUrl = signal<string>('')

  constructor() {
    this.currentUrl.set(this.router.url);
  }

}
