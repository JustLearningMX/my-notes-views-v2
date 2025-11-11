export interface ICategory {
  id?:   number;
  name: string;
}

export interface ICategoryCreate {
  note_id:   number;
  categories: ICategory[];
}

export interface ICategories {
  categories: ICategory[];
}
