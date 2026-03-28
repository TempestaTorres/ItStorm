import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/validators';

@Component({
  selector: 'app-modal-service',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './modal-service.html',
  styleUrl: './modal-service.css',
})
export class ModalService implements OnInit {

  @Input() dialogOpened:boolean = false;
  @Input() modalType:string = 'consultation';
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  public processing: boolean = false;
  public closing: boolean = false;

  public confirmed: boolean = false;
  public formError: boolean = false;
  public errorMsg: string = '';
  public buttonLabel = 'Заказать консультацию';

  public modalForm!: FormGroup;

  get name() {return this.modalForm.get('name');};
  get serviceName() {return this.modalForm.get('serviceName');};
  get phone() {return this.modalForm.get('phone');};

  ngOnInit() {

    if (this.modalType === 'consultation') {
      this.modalForm = new FormGroup({
        name: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required, CustomValidators.phoneValidator]),
      });
    }
    else if (this.modalType === 'service') {
      this.modalForm = new FormGroup({
        serviceName: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required, CustomValidators.phoneValidator]),
      });

      this.buttonLabel = 'Оставить заявку';
    }
  }

  public onSubmit() {

     this.processing = true;

    if (this.modalForm.status === 'VALID') {

      if (this.modalType === 'consultation') {
        setTimeout(() => {
          this.modalForm.reset();
          this.processing = false;
          this.confirmed = true;
          this.formError = false;

        }, 500);
      }
    }
    else {
      setTimeout(() => {
        this.processing = false;
        this.formError = true;
        this.errorMsg = "Заполните обязательные поля!";
      }, 500);
    }

  }

  public closeModal(): void {
    this.closing = true;

    setTimeout(() => {
      this.closing = false;
      this.confirmed = false;
      this.close.emit(false);
    }, 350);
  }
}
