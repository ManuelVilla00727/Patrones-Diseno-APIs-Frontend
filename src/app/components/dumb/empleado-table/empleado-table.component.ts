import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Empleado } from '../../../models/empleado';

@Component({
  selector: 'app-empleado-table',
  templateUrl: './empleado-table.component.html'
})
export class EmpleadoTableComponent {
  @Input() empleados: Empleado[] | null = [];
  @Input() isLoading: boolean | null = false;

  @Output() onEdit = new EventEmitter<Empleado>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onRefresh = new EventEmitter<void>();

  edit(empleado: Empleado): void {
    this.onEdit.emit(empleado);
  }

  delete(id?: string): void {
    if (id && confirm('¿Está seguro de eliminar este registro de empleado?')) {
      this.onDelete.emit(id);
    }
  }

  refresh(): void {
    this.onRefresh.emit();
  }
}