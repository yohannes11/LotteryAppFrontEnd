/* tslint:disable */
import { RegisterUserIn } from './register-user-in';
import { Status } from './status';
export interface RegisterUserOut {
  id?: number;
  registerUserIn?: RegisterUserIn;
  status?: Status;
}
