"use server"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ErrorResponseSchema, LoginSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
}

export async function authenticate(prevState: ActionStateType, formData: FormData) {
    const loginCredentials = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const auth = LoginSchema.safeParse(loginCredentials)
    if(!auth.success) {
        return {
            errors: auth.error.issues.map(issue => issue.message)
        }
    }

    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify({
            password: auth.data.password,
            email: auth.data.email
        })
    })

    const json = await req.json()
    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error]
        }
    }

    // Setear Cookies (definir cookie)
    cookies().set({
        name: 'CASHTRACKR_TOKEN',
        value: json,
        httpOnly: true,//Unicamente el codigo del servidor puede acceder a esa cookie
        path: '/'//Es valida en todas las urls
    })

    redirect('/admin')//Como no se retorna el arreglo de errors es necesario colocar el redirect ya que se genera un error, porque dicho arreglo queda como undefined y genera un conflicto, cuando se redirecciona errors no llega a ser undefined porque no se generan errores en TS
    //También al redireccionar al usuario ya no es necesario retornar lo arreglo de errores
}