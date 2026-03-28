import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Iniciar Sesión"
}

export default function LoginPage() {
  return (
    <>
      <h1 className="font-black text-4xl text-purple-950">Iniciar sesión</h1>
      <p className="text-3xl font-bold mt-3">y controla tus <span className="text-amber-500">finanzas</span></p>

      <LoginForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href="/auth/register"
          className="text-center text-gray-500 hover:text-purple-800 transition-colors"
        >
          ¿No tienes una cuenta? Crea una
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
