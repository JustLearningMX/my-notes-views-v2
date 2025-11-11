import {Component, inject, signal} from '@angular/core';
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidatorsService} from "../../../../shared/services/validators.service";
import {NgStyle} from "@angular/common";
import {ILoginBody} from "../../../../core/interfaces/auth/auth.interface";
import {AuthService} from "../../services/auth.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CheckboxModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {

  // Services
  private fb: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  validatorService: ValidatorsService = inject(ValidatorsService);

  // Signals
  isButtonDisabled = signal(false);

  // Variables
  private loginBody!: ILoginBody;

  myForm: FormGroup = this.fb.group({
    email: ['john.doe@gmail.com', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['$uper-pass123', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    this.isButtonDisabled.set(true);

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.isButtonDisabled.set(false);
      return;
    }

    this.loginBody = this.myForm.value;

    this.authService.login(this.loginBody).pipe(
      finalize(() => this.isButtonDisabled.set(false) )
    ).subscribe();
  }

}
