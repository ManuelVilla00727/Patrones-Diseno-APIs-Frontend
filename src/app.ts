import authRoutes from './auth/routes/auth.routes.js';

// ...

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/empleados', empleadoRouter);