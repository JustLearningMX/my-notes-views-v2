import {IUserResponse} from "./user/user.interface";
import {ICategory} from "./category.interface";
import {FormControl} from "@angular/forms";

export interface INote {
  id?: number,
  title: string,
  description?: string,
  lastEdited: Date,
  state: NoteState,
  deleted: boolean
}

export interface INoteToUpdate {
  id?: number,
  title: string,
  description?: string,
  lastEdited?: Date,
  state?: NoteState,
  deleted?: boolean,
  categories?: ICategory[]
}

export interface INoteForm {
  id?: FormControl<number>,
  title: FormControl<string>,
  description?: FormControl<string>,
  lastEdited: FormControl<Date>,
  state: FormControl<NoteState>,
  deleted: FormControl<boolean>
}

export interface INoteResponse {
  isError: boolean,
  id: number,
  title: string,
  description: string,
  lastEdited: Date,
  state: NoteState,
  deleted: boolean
}

export interface INoteFull {
  id: number,
  title: string,
  description: string,
  lastEdited: Date,
  state: NoteState,
  deleted: boolean,
  user: IUserResponse,
  categories:  ICategory[];
}

export interface INotes {
  content:          INoteFull[];
  pageable:         Pageable;
  last:             boolean;
  totalPages:       number;
  totalElements:    number;
  size:             number;
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  first:            boolean;
  empty:            boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}


export enum NoteState {
  ACTIVE,
  ARCHIVED
}
