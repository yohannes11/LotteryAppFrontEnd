import { Component, OnInit } from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  title: string;
  message: string;
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {

  }

}
