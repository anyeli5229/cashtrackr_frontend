"use server"

import getToken from "@/src/auth/token"
import { DraftBudgetSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function createBudget(prevData: ActionStateType, formData : FormData) {
    const budgetCredentials = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const budget = DraftBudgetSchema.safeParse(budgetCredentials)
    if(!budget.success){
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: ''
        }
    }
    const url = `${process.env.API_URL}/budgets`
    const token = getToken()
    const req = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount
        })
    })
    const json = await req.json()
    if(!req.ok){
        const {error} = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ''
        }
    }
    revalidatePath('/admin')//Carga de nuevo la página con los nuevos datos, simpre se utiliza este tipo de funciones cuando se hace una mutación de los datos, como crear, actualizar o borrar
    const success = SuccessSchema.parse(json)
    return {
        errors: [],
        success
    }
}