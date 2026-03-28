import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Crear Cuenta"
}

export default function RegisterPage() {
  return (
    <>
      <h1 className="font-black text-4xl text-purple-950">Crear una cuenta</h1>
      <p className="text-3xl font-bold mt-3">y controla tus <span className="text-amber-500">finanzas</span></p>

      <RegisterForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href="/auth/login"
          className="text-center text-gray-500 hover:text-purple-800 transition-colors"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>

        <Link
          href="/auth/forgot-password"
          className="text-center text-gray-500 hover:text-purple-800 transition-colors"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  )
}
