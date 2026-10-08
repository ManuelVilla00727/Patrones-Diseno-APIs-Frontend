export interface Empleado {
  _id?: string;
  nombre: string;
  cargo: string;
  departamento: string;
  sueldo: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: any;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

export type CreateEmpleadoDTO = Omit<Empleado, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateEmpleadoDTO = Partial<CreateEmpleadoDTO>;