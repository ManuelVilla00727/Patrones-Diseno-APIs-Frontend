import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoService } from './services/empleado.service';

// Importación de componentes Smart y Dumb (Reto 4)
import { EmpleadoContainerComponent } from './components/smart/empleado-container.component';
import { EmpleadoFormComponent } from './components/dumb/empleado-form/empleado-form.component';
import { EmpleadoTableComponent } from './components/dumb/empleado-table/empleado-table.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoContainerComponent,
    EmpleadoFormComponent,
    EmpleadoTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EmpleadoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
