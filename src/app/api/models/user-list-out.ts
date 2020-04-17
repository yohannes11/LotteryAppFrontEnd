/* tslint:disable */
import { UserData } from './user-data';
import { CountDto } from './count-dto';
import { Status } from './status';
export interface UserListOut {
  userDatas?: Array<UserData>;
  countDto?: CountDto;
  status?: Status;
}
