import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";


export default function ConfirmAccountPage() {
    return (
        <>
            <h1 className="font-black text-4xl text-purple-950">Confirmar cuenta</h1>
            <p className="text-3xl font-bold mt-3">Ingresa el código que recibiste <span className="text-amber-500">por email</span></p>

            <ConfirmAccountForm/>
        </>
    )
}
