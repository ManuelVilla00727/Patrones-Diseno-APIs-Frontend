import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-dashboard',
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div *ngIf="errorMessage" class="alert alert-danger py-2 shadow-sm">
            {{ errorMessage }}
          </div>
          <app-login-form 
            [isLoading]="loading" 
            (submitLogin)="onExecuteLogin($event)">
          </app-login-form>
        </div>
      </div>
    </div>
  `
})
export class LoginDashboardComponent {
  loading = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onExecuteLogin(credentials: any): void {
    this.loading = true;
    this.errorMessage = null;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['empleados']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.message || 'Error al validar credenciales.';
      }
    });
  }
}