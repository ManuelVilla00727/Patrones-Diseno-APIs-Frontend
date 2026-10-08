import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado, CreateEmpleadoDTO, UpdateEmpleadoDTO } from '../../models/empleado';

@Component({
  selector: 'app-empleado-container',
  templateUrl: './empleado-container.component.html'
})
export class EmpleadoContainerComponent {
  // [Reto 4]: Flujos reactivos consumidos directamente en plantilla con el async pipe
  readonly empleados$: Observable<Empleado[]> = this.empleadoService.empleados$;
  readonly selectedEmpleado$: Observable<Empleado | null> = this.empleadoService.selectedEmpleado$;
  readonly loading$: Observable<boolean> = this.empleadoService.loading$;
  readonly error$: Observable<string | null> = this.empleadoService.error$;

  constructor(private readonly empleadoService: EmpleadoService) {}

  handleSave(event: { data: CreateEmpleadoDTO; id?: string }): void {
    if (event.id) {
      this.empleadoService.actualizarEmpleado(event.id, event.data as UpdateEmpleadoDTO).subscribe();
    } else {
      this.empleadoService.crearEmpleado(event.data).subscribe();
    }
  }

  handleCancel(): void {
    this.empleadoService.seleccionarEmpleado(null);
  }

  handleEdit(emp: Empleado): void {
    this.empleadoService.seleccionarEmpleado(emp);
  }

  handleDelete(id: string): void {
    this.empleadoService.eliminarEmpleado(id).subscribe();
  }

  handleRefresh(): void {
    this.empleadoService.cargarEmpleados();
  }
}