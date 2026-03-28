import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Olvidé mi contraseña"
}

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="font-black text-4xl text-purple-950">¿Olvidaste tu contraseña?</h1>
      <p className="text-3xl font-bold mt-3">Aquí puedes <span className="text-amber-500">reestablecerla</span></p>

      <ForgotPasswordForm />

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          href="/auth/login"
          className="text-center text-gray-500 hover:text-purple-800 transition-colors"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>

        <Link
          href="/auth/register"
          className="text-center text-gray-500 hover:text-purple-800 transition-colors"
        >
          ¿No tienes una cuenta? Crea una
        </Link>
      </nav>
    </>
  )
}
