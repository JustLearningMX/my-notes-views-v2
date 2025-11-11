import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {SelectItem} from "primeng/api";
import {TitleCasePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {tap} from "rxjs";
import {NoteService} from "../../services/note.service";
import {INoteFull} from "../../../../core/interfaces/note.interface";

@Component({
  selector: 'app-submenu-note',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    FormsModule,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './submenu-note.component.html',
  styleUrl: './submenu-note.component.css'
})
export class SubmenuNoteComponent {

  @Input({ required: true }) title: string = '';

  categoryService = inject(CategoryService);
  noteService = inject(NoteService);

  allNotes: INoteFull[] = [];

  isFirstLoad = true;

  categories: SelectItem[] = [];

  constructor() {

    this.categories = [
      { label: 'All', value: { id: 0, name: 'All', code: 'ALL' } },
    ];

    this.categoryService.getCategoriesFromUser().pipe(
      tap( ({categories}) => {
        const cat = categories.map( category => ({ label: category.name, value: category }));
        this.categories = [...this.categories, ...cat];
      }),
    ).subscribe();
  }

  filterByCategory($event: DropdownChangeEvent) {

    if($event.value === null) {
      this.noteService.notes.set(this.allNotes);
      return
    }

    if(this.isFirstLoad) {
      this.allNotes = this.noteService.notes();
      this.isFirstLoad = false;
    }

    if($event.value.id === 0) {
      this.noteService.notes.set(this.allNotes);
      return;
    }

    const filterNotes = this.allNotes.filter( note => note.categories.filter( category => category.id === $event.value.id).length > 0 );

    this.noteService.notes.set(filterNotes);
  }
}
