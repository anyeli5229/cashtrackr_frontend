"use client"
import { Fragment } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import AddExpenseForm from '../expenses/AddExpenseForm';
import EditExpenseForm from '../expenses/EditExpenseForm';
import DeleteExpenseForm from '../expenses/DeleteExpenseForm';

const componentsMap = {
    "AddExpense" : AddExpenseForm,
    "EditExpense" : EditExpenseForm,
    "DeleteExpense" : DeleteExpenseForm,
}

export default function ModalContainer() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const showModal = searchParams.get("showModal")
    const show = showModal ? true : false

    const addExpense = searchParams.get("addExpense")
    const editExpense = searchParams.get('editExpense')
    const deleteExpense = searchParams.get('deleteExpense')

    const getComponentName = () => {
        if(addExpense) return "AddExpense"//Si hay algo en addExpense retornas un string "AddExpense" que es las llaves(keys) del objeto componentsMap 
        if(editExpense) return "EditExpense"
        if(deleteExpense) return "DeleteExpense"
    }

    const componentName = getComponentName()//key se guarda en una variable

    //Si dicha variable tiene algo se retorna el valor que tiene la llave(key) en el objeto o un null en caso contrario
    const ComponentToRender = componentName ? componentsMap[componentName] : null

    const closeModal = () => {
        const hideModal = new URLSearchParams(searchParams.toString()) //Se pasan los QS
        Array.from(hideModal.entries()).forEach(([key]) => {//Se convierten en arreglo y se itera sobre cada uno
            hideModal.delete(key)//Y se van eliminando
        });
        router.replace(`${pathname}?${hideModal}`)//Remplaza la ruta con el pathname y hideModal sin valor
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    {/* Si hay algo en la variable de ComponentToRender entonces muestrálo como componente, o no muestres nada(null) */}
                                    {ComponentToRender ? <ComponentToRender closeModal={closeModal}/> : null}
                                    
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}