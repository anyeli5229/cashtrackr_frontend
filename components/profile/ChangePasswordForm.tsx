"use client"

import { updatePassword } from "@/actions/update-password-action"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import ErrorMessage from "../ui/ErrorMessage"

export default function ChangePasswordForm() {

    const ref = useRef<HTMLFormElement>(null)//Al principio es null porque el formulario todavía no se ha dibujado en la pantalla.

    const [state, dispatch] = useFormState(updatePassword, {
        errors: [],
        success: ""
    })

    useEffect(() => {
        if(state.success) {
            toast.success(state.success)
            ref.current?.reset()//Cuando el state es exitoso lo resetea
        }
    }, [state])

  return (
    <>
      <form
        className=" mt-14 space-y-5"
        noValidate
        action={dispatch}
        ref={ref}//Cuando se renderiza toma como referencia el formulario
      >
        {state.errors.map(error => ( <ErrorMessage key={error}>{error}</ErrorMessage>))}
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="current_password"
          >Contraseña actual</label>
          <input
            id="current_password"
            type="password"
            placeholder="Contraseña actual"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="current_password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            className="font-bold text-2xl"
            htmlFor="password"
          >Nueva contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña de registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password"
          />
        </div>
        <div className="flex flex-col gap-5">
          <label
            htmlFor="password_confirmation"
            className="font-bold text-2xl"
          >Repetir contraseña</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite la contraseña de registro"
            className="w-full border border-gray-300 p-3 rounded-lg"
            name="password_confirmation"
          />
        </div>

        <input
          type="submit"
          value='Cambiar contraseña'
          className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  )
}