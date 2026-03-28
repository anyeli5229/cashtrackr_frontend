import PasswordResetHandler from "@/components/auth/PasswordResetHandler";


export default function NewPasswordPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Reestablecer contraseña</h1>
      <p className="text-3xl font-bold mt-3">Ingresa el código que recibiste
        <span className="text-amber-500"> por email</span>
      </p>

       <PasswordResetHandler/> {/*//Maneja la lógica para mostrar primero el componente de ValidateTokenForm y si es valido muestra el ResetPasswordForm */}
    </>
  )
}
