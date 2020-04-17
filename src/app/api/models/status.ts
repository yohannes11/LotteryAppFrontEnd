/* tslint:disable */
import { ErrorMessage } from './error-message';
export interface Status {
  status?: boolean;
  message?: string;
  errorMessages?: Array<ErrorMessage>;
}
