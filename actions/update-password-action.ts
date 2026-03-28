"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema, UpdatePasswordSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function updatePassword(prevState: ActionStateType, formData: FormData) {

    const passwordCredentials = {
        current_password: formData.get("current_password"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation")
    }
    console.log(passwordCredentials)

    const updatePassword = UpdatePasswordSchema.safeParse(passwordCredentials)
    if(!updatePassword.success){
        return {
            errors: updatePassword.error.issues.map(issue => issue.message),
            success: ""
        }
    }

    const token = getToken()
    const url = `${process.env.API_URL}/auth/update-password`
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "application/json"
        }, body: JSON.stringify({
            current_password: updatePassword.data.current_password,
            password: updatePassword.data.password,
        })
    })
    const json = await req.json()
    if(!req.ok) {
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ""
        }
    }

    const success = SuccessSchema.parse(json)
    return {
        errors: [],
        success
    }
}