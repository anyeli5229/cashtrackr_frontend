import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type ValidateTokenFormProps = {
    setIsValidToken: Dispatch<SetStateAction<boolean>>
    token: string
    setToken: Dispatch<SetStateAction<string>>
}

export default function ValidateTokenForm({setIsValidToken, token, setToken}: ValidateTokenFormProps) {
    const[isComplete, setIsComplete] = useState(false)
    //const [token, setToken] = useState('')
    const validateTokenInput = validateToken.bind(null, token)
    const [state, dispatch] = useFormState(validateTokenInput, {
        errors: [],
        success: ''
    })

    useEffect(() => {
        if(isComplete) {
            dispatch()
        }
    }, [isComplete, dispatch])//React obliga a poner en la lista de dependias cualquier función que se use en useEffect(dispatch) - la regla de integridad de los Hooks (Exhaustive Deps).

    useEffect(() => {//Se usa useEffect para cambiar el valor de setIsValidToken. Es el momento seguro para avisar al padre sin romper el ciclo de renderizado de React, es decir, que la variable cambia de valor cuando ValidateTokenForm se termina de renderizar, ya que si no se hace de esta forma se genera un error porque se intenta renderizar ambos componentes
        if(state.errors){
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if(state.success) {
            toast.success(state.success)
            setIsValidToken(true)
        }
    },[state, setIsValidToken])//como setIsValidToken una variable "externa" que React no está vigilando,es por eso que se coloca en la lista de dependencias, es simplemente decirle a React: "Oye, sé que estoy usando esta función de afuera, vigílala por si acaso, aunque sé que es estable" - la regla de integridad de los Hooks (Exhaustive Deps).

    const handleChange = (token: string) => {
        setIsComplete(false)
        setToken(token)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }

    return (
        <div className="flex justify-center gap-2 my-10">
            <PinInput
                value={token}
                onChange={handleChange}
                onComplete={handleComplete}
            >
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
                <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
            </PinInput>
        </div>
    )
}