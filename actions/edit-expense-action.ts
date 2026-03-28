"use server"

import getToken from "@/src/auth/token"
import { Budget, DraftExpenseSchema, ErrorResponseSchema, Expense, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

type BudgetAndExpenseIdType = {
    budgetId: Budget['id']
    expenseId: Expense['id']
}

export async function editExpense({budgetId,  expenseId} : BudgetAndExpenseIdType, prevState: ActionStateType, formData: FormData) {
    const expenseCredentials = {
        name: formData.get('name'),
        amount: formData.get('amount'),
    }

    const expense = DraftExpenseSchema.safeParse(expenseCredentials)
    if(!expense.success) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ""
        }
    }
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const token = getToken()
    const req = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
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