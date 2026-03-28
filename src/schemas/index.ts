import z from "zod";

export const RegisterSchema = z.object({
  email:
    z.email("El email no es válido")
      .min(1, "El email no puede ir vacío"),
  name: z.string()
    .min(1, "El nombre no puede ir vacío"),
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  password_confirmation: z.string()
    .min(1, "Debes confirmar tu contraseña"),
}).refine((data) => data.password === data.password_confirmation, {//Refine sirve para crear validaciones propias y obtiene los datos de todos los campos (data)
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"], // El error se asocia a este campo
})

export const LoginSchema = z.object({
  email: z.email('Email no válido'),
  password: z.string()
    .min(1, 'La contraseña no puede ir vacía')
})

export const TokenSchema = z.string("Token no válido").length(6, "Token no válido")

export const SuccessSchema = z.string()//Cuando se pase la validación se verifica que la respuesta del servidor sea un string ("Cuenta creada correctamente")
export const ErrorResponseSchema = z.object({
  error: z.string()
})

export const ForgotPasswordSchema = z.object({
  email: z.email('Email no válido')
})

export const PasswordValidationSchema = z.string().min(1, 'Contraseña no válida')

export const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  password_confirmation: z.string()
    .min(1, "Debes confirmar tu contraseña"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"],
})

export const UpdatePasswordSchema = z.object({
  current_password: z.string().min(1, "La contraseña actual no puede ir vacía"),
  password: z.string()
    .min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
  password_confirmation: z.string()
    .min(1, "Debes confirmar tu contraseña"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Las contraseñas no coinciden",
  path: ["password_confirmation"],
})

export const UpdateUserSchema = z.object({
  name: z.string()
    .min(1, "El nombre no puede ir vacío"),
  email:
    z.email("El email no es válido")
      .min(1, "El email no puede ir vacío"),
})

export const DraftBudgetSchema = z.object({
  name: z.string()
    .min(1, 'El nombre del presupuesto es obligatorio'),
  amount: z.coerce.
    number('Cantidad no válida')
    .min(1, 'Cantidad no válida'),
})

export const DraftExpenseSchema = z.object({
  name: z.string()
    .min(1, 'El nombre del gasto es obligatorio'),
  amount: z.coerce.
    number('Cantidad no válida')
    .min(1, 'Cantidad no válida'),
})

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email()
})

export const ExpenseAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  budgetId: z.number()
})

export const BudgetAPIResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.string(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expenses: z.array(ExpenseAPIResponseSchema)
})

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema.omit({ expenses: true }))

export type User = z.infer<typeof UserSchema>
export type Budget = z.infer<typeof BudgetAPIResponseSchema>
export type DraftExpense = z.infer<typeof DraftExpenseSchema>
export type Expense = z.infer<typeof ExpenseAPIResponseSchema>