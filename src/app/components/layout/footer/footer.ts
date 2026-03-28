import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ModalService} from '../../../modals/modal-service/modal-service';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    ModalService
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
 public serviceOpen: boolean = false;

 public dialogOpen(): void {
   this.serviceOpen = true;
 }
 public close(status: boolean): void {
   this.serviceOpen = status;
 }
}
