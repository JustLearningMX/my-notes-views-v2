import {Component, inject, Input, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {DividerModule} from "primeng/divider";
import {RippleModule} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";
import {INoteFull} from "../../../../core/interfaces/note.interface";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteService} from "../../services/note.service";

@Component({
  selector: 'note-card',
  standalone: true,
  imports: [
    ButtonModule,
    DatePipe,
    DividerModule,
    RippleModule,
    TooltipModule,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {

  @Input({ required: true }) note!: INoteFull;

  noteService = inject(NoteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isActiveNotesSection = signal(true);

  constructor() {
    let currentUrl = this.router.url;
    this.isActiveNotesSection.set(currentUrl === '/notes');
  }

  archiveNote(id: number) {
    const idNote = Number(id);
    this.noteService.archiveNote(idNote).subscribe();
  }

  unarchivedNote(id: number) {
    const idNote = Number(id);
    this.noteService.unarchivedNote(idNote).subscribe();
  }

}
