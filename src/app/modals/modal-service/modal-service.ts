import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/validators';
import {RequestType} from '../../requests/request-type';
import {Request} from '../../requests/request';
// @ts-ignore
import {HttpErrorResponse} from '@angular/common/module.d';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modal-service',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './modal-service.html',
  styleUrl: './modal-service.css',
})
export class ModalService implements OnInit, OnDestroy {

  @Input() dialogOpened:boolean = false;
  @Input() modalType:string = 'consultation';
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  public processing: boolean = false;
  public closing: boolean = false;

  public confirmed: boolean = false;
  public formError: boolean = false;
  public errorMsg: string = '';
  public buttonLabel = 'Заказать консультацию';
  public iconCaretActive: boolean = false;

  public modalForm!: FormGroup;

  private subscription: Subscription | undefined;

  constructor(private requestService: Request) {
  }

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
        serviceName: new FormControl('Фриланс', Validators.required),
        name: new FormControl('', Validators.required),
        phone: new FormControl('', [Validators.required, CustomValidators.phoneValidator]),
      });

      this.buttonLabel = 'Оставить заявку';
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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
      else if (this.modalType === 'service') {
        let req: RequestType = {
          name: this.modalForm.value.name,
          phone: this.modalForm.value.phone,
          service: this.modalForm.value.serviceName,
          type: 'order'
        }

        setTimeout(() => {
          this.processing = false;

          this.subscription = this.requestService.sendRequest(req).subscribe({
            next: result => {

              this.processing = false;

              if (!result.error) {

                this.confirmed = true;
                this.formError = false;
              }
              else {
                this.formError = true;
                this.errorMsg = result.message;
              }
            },
            error: (err: HttpErrorResponse) => {
              this.processing = false;
              this.formError = true;
              this.errorMsg = err.message;
            }
          });

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

  public serviceClicked(): void {
    this.iconCaretActive = !this.iconCaretActive;

  }
  public serviceBlur(): void {
    this.iconCaretActive = false;
  }

  public serviceChanged(): void {

    setTimeout(() => {
      this.iconCaretActive = false;
    }, 200);
  }
}
