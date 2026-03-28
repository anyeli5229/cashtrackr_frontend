"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema, UpdateUserSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function updateUser(prevState: ActionStateType, formData: FormData) {
    const userCredentials = {
        name: formData.get("name"),
        email: formData.get("email"),
    }
    const updateUser = UpdateUserSchema.safeParse(userCredentials)
    if(!updateUser.success){
        return {
            errors: updateUser.error.issues.map(issue => issue.message),
            success: ""
        }
    }
    const token = getToken()
    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url , {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            name: updateUser.data.name,
            email: updateUser.data.email,
        })
    })
    const json = await req.json()
    if(!req.ok){
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ""
        }
    }
    revalidatePath('/admin/profile/settings')
    const success = SuccessSchema.parse(json)
    return {
        errors: [],
        success
    }
}