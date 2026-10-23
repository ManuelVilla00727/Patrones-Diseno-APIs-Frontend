import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // <-- Importar HTTP_INTERCEPTORS
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoService } from './services/empleado.service';
import { AuthService } from './services/auth.service'; // <-- Importar AuthService
import { AuthInterceptor } from './core/interceptors/auth.interceptor'; // <-- Importar el Interceptor

// Importación de componentes Smart y Dumb (Reto 4)
import { EmpleadoContainerComponent } from './components/smart/empleado-container.component';
import { EmpleadoFormComponent } from './components/dumb/empleado-form/empleado-form.component';
import { EmpleadoTableComponent } from './components/dumb/empleado-table/empleado-table.component';
import { LoginDashboardComponent } from './features/auth/login-dashboard.component'; // <-- Importar Login
import { LoginFormComponent } from './features/auth/components/login-form/login-form.component'; // <-- Importar LoginForm

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoContainerComponent,
    EmpleadoFormComponent,
    EmpleadoTableComponent,
    LoginDashboardComponent, // <-- Declarar Login
    LoginFormComponent       // <-- Declarar LoginForm
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EmpleadoService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // <-- Registrar el Interceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }