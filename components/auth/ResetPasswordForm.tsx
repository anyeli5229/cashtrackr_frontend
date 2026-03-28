import { resetPassword } from "@/actions/reset-password-action"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"


export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter()
  const resetPasswordWithToken = resetPassword.bind(null, token)
  const [state, dispatch] = useFormState(resetPasswordWithToken, {
    errors: [],
    success: ''
  })

  useEffect(() => {
    if (state.errors) {
      state.errors.forEach(error => {
        toast.error(error)
      })
    }
    if (state.success) {
      toast.success(state.success, {
        onClick: () => {
          router.push("/auth/login")
        },
        onClose: () => {
          router.push("/auth/login")
        }
      })
    }
  }, [state, router])//Router es una dependencia externa es por eso que se coloca tambien, la regla de integridad de los Hooks (Exhaustive Deps).

  return (
    <form
      className=" mt-14 space-y-5"
      noValidate
      action={dispatch}
    >
      <div className="flex flex-col gap-5">
        <label
          className="font-bold text-2xl"
        >Contraseña</label>

        <input
          type="password"
          placeholder="Contraseña de registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password"
        />
      </div>

      <div className="flex flex-col gap-5">
        <label
          className="font-bold text-2xl"
        >Repetir contraseña</label>

        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite tu contraseña de registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          name="password_confirmation"
        />

      </div>

      <input
        type="submit"
        value='Guardar contraseña'
        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer block"
      />
    </form>
  )
}