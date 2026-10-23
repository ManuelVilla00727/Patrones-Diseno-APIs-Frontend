import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {
  @Input() isLoading = false;
  @Output() submitLogin = new EventEmitter<any>();

  formModel = { email: '', password: '' };

  onSubmit(): void {
    if (this.formModel.email && this.formModel.password) {
      this.submitLogin.emit({ ...this.formModel });
    }
  }
}