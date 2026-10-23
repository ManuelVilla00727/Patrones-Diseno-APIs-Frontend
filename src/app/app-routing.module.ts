import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginDashboardComponent } from './features/auth/login-dashboard.component';
import { EmpleadoContainerComponent } from './components/smart/empleado-container.component';

const routes: Routes = [
  { path: 'login', component: LoginDashboardComponent },
  { path: 'empleados', component: EmpleadoContainerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login
  { path: '**', redirectTo: '/login' } // Cualquier ruta desconocida va a login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }