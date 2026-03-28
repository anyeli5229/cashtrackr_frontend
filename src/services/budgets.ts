import { cache } from "react";
import getToken from "../auth/token";
import { BudgetAPIResponseSchema } from "../schemas";
import { notFound } from "next/navigation";

export const getBudget = cache(async (budgetId: string) => {//cache reutiliza los datos si no han sido cambiados, evita consultas repetidas o dobles
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const json = await req.json()

    if (!req.ok) {
        notFound()
    }

    const budget = BudgetAPIResponseSchema.parse(json)
    return budget
})