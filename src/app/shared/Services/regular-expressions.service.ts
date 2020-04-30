import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegularExpressionsService {
  public phoneExpression = '^\\+[0-9]{2}[0-9]{10}$';
  public emailEmailExpression = '^[(a-zA-Z-0-9-\\_\\+\\.)]+@[(a-z-A-z)]+\\.[(a-zA-z)]{2,3}$';
  public alphabetExpression = '^[a-zA-Zs]*$';
  public shortPhoneExpression = '^[0-9]{9}$';
  constructor() { }
}
