import { DraftExpense } from "@/src/schemas"

type ExpenseFormProps = {
    expense?: DraftExpense
}

export default function ExpenseForm({expense}: ExpenseFormProps) {
    return (
        <>
            <div className="mb-5">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre del gasto
                </label>
                <input
                    id="name"
                    className="w-full p-3  border border-gray-100  bg-white"
                    type="text"
                    placeholder="Nombre del gasto"
                    name="name"
                    defaultValue={expense?.name}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="amount" className="text-sm uppercase font-bold">
                    Cantidad del gasto
                </label>
                <input
                    id="amount"
                    className="w-full p-3  border border-gray-100 bg-white"
                    type="number"
                    placeholder="Cantidad del gasto"
                    name="amount"
                    defaultValue={expense?.amount}
                />
            </div>
        </>
    )
}