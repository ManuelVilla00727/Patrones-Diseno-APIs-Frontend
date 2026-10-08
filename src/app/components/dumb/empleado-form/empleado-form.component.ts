import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado, CreateEmpleadoDTO } from '../../../models/empleado';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html'
})
export class EmpleadoFormComponent implements OnChanges {
  @Input() empleado: Empleado | null = null;
  @Input() isSubmitting: boolean | null = false;

  @Output() onSave = new EventEmitter<{ data: CreateEmpleadoDTO; id?: string }>();
  @Output() onCancel = new EventEmitter<void>();

  form: FormGroup;
  departamentos: string[] = [
    'Tecnología',
    'Recursos Humanos',
    'Finanzas',
    'Operaciones',
    'Marketing',
    'Ventas'
  ];

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', [Validators.required, Validators.minLength(2)]],
      departamento: ['Tecnología', Validators.required],
      sueldo: [null, [Validators.required, Validators.min(100)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['empleado'] && this.empleado) {
      this.form.patchValue({
        nombre: this.empleado.nombre,
        cargo: this.empleado.cargo,
        departamento: this.empleado.departamento,
        sueldo: this.empleado.sueldo
      });
    } else if (changes['empleado'] && !this.empleado) {
      this.form.reset({ departamento: 'Tecnología' });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const value: CreateEmpleadoDTO = {
      nombre: this.form.value.nombre.trim(),
      cargo: this.form.value.cargo.trim(),
      departamento: this.form.value.departamento.trim(),
      sueldo: Number(this.form.value.sueldo)
    };

    this.onSave.emit({
      data: value,
      id: this.empleado?._id
    });
  }

  cancel(): void {
    this.form.reset({ departamento: 'Tecnología' });
    this.onCancel.emit();
  }
}