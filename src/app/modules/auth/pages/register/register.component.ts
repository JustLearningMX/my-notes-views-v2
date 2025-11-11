import {Component, inject, signal} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {AuthService} from "../../services/auth.service";
import {ValidatorsService} from "../../../../shared/services/validators.service";
import {IRegisterBody} from "../../../../core/interfaces/auth/auth.interface";
import {RouterLink} from "@angular/router";
import {NgStyle} from "@angular/common";
import {finalize, tap} from "rxjs";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    RippleModule,
    RouterLink,
    NgStyle
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {

  // Services
  private fb: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  validatorService: ValidatorsService = inject(ValidatorsService);

  // Signals
  isButtonDisabled = signal(false);

  // Variables
  private registerBody!: IRegisterBody;

  myForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    this.isButtonDisabled.set(true);

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.isButtonDisabled.set(false);
      return;
    }

    this.registerBody = this.myForm.value;

    this.authService.register(this.registerBody).pipe(
      finalize(() => this.isButtonDisabled.set(false) )
    ).subscribe();

  }

}
