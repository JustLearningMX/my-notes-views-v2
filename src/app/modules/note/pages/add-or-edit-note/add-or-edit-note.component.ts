import {Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild} from '@angular/core';
import {NoteService} from "../../services/note.service";
import {ActivatedRoute} from "@angular/router";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {INote, INoteForm, INoteFull, INoteToUpdate, NoteState} from "../../../../core/interfaces/note.interface";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {tap} from "rxjs";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CalendarModule} from "primeng/calendar";
import {ICategory, ICategoryCreate} from "../../../../core/interfaces/category.interface";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputGroupModule} from "primeng/inputgroup";
import {TitleCasePipe} from "@angular/common";
import {CategoryService} from "../../services/category.service";

type controlType = 'title' | 'description' | 'lastEdited' | 'state' | 'deleted';

@Component({
  selector: 'app-add-or-edit-note',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DividerModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    CalendarModule,
    InputTextareaModule,
    InputGroupModule,
    TitleCasePipe
  ],
  templateUrl: './add-or-edit-note.component.html',
  styleUrl: './add-or-edit-note.component.css'
})
export default class AddOrEditNoteComponent implements OnInit {

  //@Input({ required: true }) categories!: ICategory[];
  @ViewChild('category') categoryInput: ElementRef | undefined;

  // Services
  private noteService = inject(NoteService);
  private categoryService = inject(CategoryService);
  private nnfb = inject(NonNullableFormBuilder);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  // Variables
  public noteId: string | null = null;
  categories = signal<ICategory[]>([])

  constructor() {
    this.noteId = this.route.snapshot.paramMap.get('id');
  }

  public noteForm = this.nnfb.group<INoteForm>(
    {
      id: this.nnfb.control(0),
      title: this.nnfb.control('', [Validators.required]),
      description: this.nnfb.control('', [Validators.required]),
      lastEdited: this.nnfb.control(new Date()),
      state: this.nnfb.control(NoteState.ACTIVE),
      deleted: this.nnfb.control(false),
    }
  );

  ngOnInit(): void {
    if (this.noteId) {

      const id = Number(this.noteId);
      this.noteService
        .getNoteById(id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          tap( note => this.fillFormData(note) ),
          tap( note => this.categories.update(() => note.categories))
        )
        .subscribe();
    }

  }

  fillFormData(note: INote) {
    this.noteForm.patchValue({
      title: note.title,
      description: note.description,
      lastEdited: note.lastEdited,
      state: note.state,
      deleted: note.deleted,
    });
  }

  inputValid(control: controlType): boolean {
    return (
      !!this.noteForm.get(control)?.invalid &&
      !!this.noteForm.get(control)?.touched
    );
  }

  save() {

    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }

    if (this.noteId) { // Update

      if (this.noteForm.pristine) return;

      this.noteForm.controls['title'].clearValidators();
      this.noteForm.controls['description']?.clearValidators();
      this.noteForm.controls['lastEdited'].clearValidators();
      this.noteForm.controls['state']!.clearValidators();
      this.noteForm.controls['deleted']!.clearValidators();

      this.noteForm.controls['title'].updateValueAndValidity();
      this.noteForm.controls['description']?.updateValueAndValidity();
      this.noteForm.controls['lastEdited'].updateValueAndValidity();
      this.noteForm.controls['state']!.updateValueAndValidity();
      this.noteForm.controls['deleted']!.updateValueAndValidity();
    }

    if (this.noteForm.invalid) return this.noteForm.markAllAsTouched();

    let note: INoteToUpdate = {
      title: this.noteForm.controls['title'].value,
      description: this.noteForm.controls['description']?.value ? this.noteForm.controls['description']?.value : '',
      lastEdited: this.noteForm.controls['lastEdited'].value,
      state: this.noteForm.controls['state']?.value,
      deleted: this.noteForm.controls['deleted']?.value,
    };

    if (this.noteId) {
      note = { ...note, id: Number(this.noteId), categories: this.categories()};
    }

    this.noteId ? this.updateNote(note) : this.addNote(note);
  }

  addNote(note: INoteToUpdate) {
    this.noteService
      .createNote(note)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap( note => {

          if(this.categories().length > 0) {
            const categoriesReq: ICategoryCreate = {
              note_id: note.id,
              categories: this.categories()
            };

            this.categoryService.createCategories(categoriesReq)
              .pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe();
          }

        })
      )
      .subscribe();
  }

  updateNote(note: INoteToUpdate ) {
    this.noteService
      .updateNote( note )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  addCategory() {
    if(!this.categoryInput || this.categoryInput.nativeElement.value.trim() === '') return;

    const categoryValue = this.categoryInput.nativeElement.value;
    this.categories.update(() => [...this.categories(), { name: categoryValue }]);
    this.categoryInput.nativeElement.value = '';
  }

  removeCategory(category: ICategory) {
    this.categories.update(() => this.categories().filter(cat => cat.name !== category.name));
  }

}
