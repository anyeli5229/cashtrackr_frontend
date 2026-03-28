"use client"

import { useRouter } from "next/navigation"

export default function AddExpenseButton() {
    const router = useRouter()
  return (
    <button 
        className="font-bold bg-amber-500 hover:bg-amber-600 transition-colors text-white rounded-lg py-2 px-10 cursor-pointer"
        onClick={() => router.push("?addExpense=true&showModal=true")}>
        Agregar Gasto
    </button>
  )
}
