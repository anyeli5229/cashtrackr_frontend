import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DraftExpense } from "@/src/schemas";
import { editExpense } from "@/actions/edit-expense-action";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";

export default function EditExpenseForm({ closeModal }: { closeModal: () => void }) {
  const [expense, setExpense] = useState<DraftExpense>()
  const { id: budgetId } = useParams()
  const searchParams = useSearchParams()
  const expenseId = searchParams.get('editExpense')!
  const router = useRouter()

  const editExpenseWithBudgetId = editExpense.bind(null, {
    budgetId: +budgetId,
    expenseId: +expenseId
  })

  const [state, dispatch] = useFormState(editExpenseWithBudgetId, {
    errors: [],
    success: ''
  })

  useEffect(() => {//Se hace la consulta en el componente para obtener la información del modal, se obtiene el gasto por su id, esto se hace porque seria poco fiable pasarlo de props en props, también porque desde un componente de cliente no se pueden obtener las cookies (JWT), es por eso que se crea la API Route (route.ts) que es el archivo que se encarga de consultar la verdadera API y retornar las respuesta 
    const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
    fetch(url)
      .then(res => res.json())
      .then(data => setExpense(data))//Cuando el json llega se guarda en la variable data y es el nuevo estado que se le da a expense, para que en el formulario se muestre la información
  }, [budgetId, expenseId])

  useEffect(() => {
    if (state.success) {
      toast.success(state.success)
      closeModal()
      router.refresh()
    }
  }, [state, closeModal, router])

  return (
    <>
      <DialogTitle
        as="h3"
        className="font-black text-4xl text-purple-950 my-5"
      >
        Editar gasto
      </DialogTitle>
      <p className="text-xl font-bold">Edita los detalles de un {''}
        <span className="text-amber-500">gasto</span>
      </p>

      {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
      <form
        className="bg-gray-100 shadow-lg rounded-lg p-10 mt-10 border"
        noValidate
        action={dispatch}
      >

        <ExpenseForm 
          expense={expense}
        />

        <input
          type="submit"
          className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
          value='Guardar Cambios'
        />
      </form>
    </>
  )
}