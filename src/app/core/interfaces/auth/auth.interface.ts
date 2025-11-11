import {UserRole} from "../user/user-role.enum";

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IRegisterBody {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  active: true,
  role: UserRole
}

export interface ITokenAuth {
  isError:   boolean;
  id:        number;
  firstName: string;
  lastName:  string;
  email:     string;
  active:    boolean;
  role:      UserRole;
  token:     string;
}

export interface IRegisterResAuth {
  isError:   boolean;
  id:        number;
  firstName: string;
  lastName:  string;
  email:     string;
  active:    boolean;
  role:      UserRole;
}

export enum LocalStorage {
  UserAuthToken = 'token',
  User = 'user',
}
