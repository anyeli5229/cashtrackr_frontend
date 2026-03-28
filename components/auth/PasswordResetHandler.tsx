"use client" //Es client component porque usa useState
import { useState } from "react"
import ValidateTokenForm from "./ValidateTokenForm"
import ResetPasswordForm from "./ResetPasswordForm"

export default function PasswordResetHandler() {//El Padre como "Fuente de la Verdad"- este componente es que se encarga de manejar toda la lógica entre los componentes hijos, muestro un formulario u otro, define y guarda el token como contexto entre los 3 para que no se pierda cuando el primer formulario se desmonte y el segundo formulario ya tenga el token listo para enviarlo a la API junto con la nueva contraseña,también es por eso que les pasa setIsValidToken y setToken mediante props, ya que es la forma de darle permiso a los hijos para que cambien los valores
//Los datos no son bidireccionales, los hijos cambian los valores de las variables, pero los cambios se hacen cuando se vuelve a renderizar el padre con los nuevo valores, si fuera bidireccional los hijos podrian cambiar los valores de las variables sin setIsValidToken y setToken
    const [isValidToken, setIsValidToken] = useState(false)
    const [token, setToken] = useState('')
    return (
        <>
            {!isValidToken ?
                <ValidateTokenForm //El Hijo como "Operador", hace el trabajo sucio (hablar con la API), y cuando termina, usa las herramientas que le prestó el padre para actualizar la información global de esa sección(setIsValidToken y setToken)
                    setIsValidToken={setIsValidToken}
                    token={token}
                    setToken={setToken}
                />
                :
                <ResetPasswordForm 
                    token={token}
                />
            }
        </>
    )
}
