"use client"

import { confirmAccount } from "@/actions/confirm-account-action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function ConfirmAccountForm() {
    const router = useRouter()
    const [isComplete, setIsComplete] = useState(false)
    const [token, setToken] = useState("")
    const confirmAccountWithToken = confirmAccount.bind(null, token)//Se crea una nueva funcíon igual a confirmAccount, pero que recibe más parámetros (token), esto se hace porque useFormState sólo tiene dos parámetros predeterminados, prevState y formData en caso de los formularios, si se le pasa otro argumento se genera un error, entonces se le pasa el token como primer argumento para poder validarlo
    const [state, dispatch] = useFormState(confirmAccountWithToken, {
        errors: [],
        success: ''
    })

    useEffect(() => {//Se utiliza el useEffect para que el token pueda cambiar su estado en el último digito, ya que de lo contrario handleChange y handleComplete se mandarían a llamar al mismo tiempo y no toma el último valor, entonces primero se cambia el valor del token y después se cambia el valor de isComplete para que mande a llamar el server action
        if(isComplete) {//Cuando isComplete sea true se manda a llamar la función de confirmAccountWithToken - dispatch
            dispatch()
        }
    }, [isComplete, dispatch])

    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if(state.success){
            toast.success(state.success, {
                onClose: () => {
                    router.push("/auth/login")
                }
            })
        }
    }, [state, router])

    const handleChange = (token: string) => {
        setIsComplete(false)
        setToken(token)
    }
    const handleComplete = () => {//Función que se manda a llamar cuando se detecta el último número de manera autómatica
        setIsComplete(true)//Y se cambia el estado de isComplete a true
    }
  return (
    <div className="flex justify-center my-10 gap-2">
        
        <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
        >
            <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
            <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
            <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
            <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
            <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
            <PinInputField className="h-10 w-10 border border-gray-300 shadow rounded-lg text-center placeholder-white"/>
        </PinInput>
    </div>
  )
}
