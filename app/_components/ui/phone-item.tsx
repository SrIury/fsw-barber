"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemsProps {
    phone: String
}

const PhoneItem = ({ phone }: PhoneItemsProps) => {
    const handleCopyPhoneClick = (phone: string) => {
        navigator.clipboard.writeText(phone)
        toast.success("Telefone Copiado com Sucesso!")
    }

    return (
        <div className="flex justify-between" key={phone}>
            {/* ESQUERDA */}
            <div className="flex item-center gap-2">
                <SmartphoneIcon /> {phone}
            </div>

            {/* DIREITA */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyPhoneClick(phone)}
            >
            Copiar
            </Button>
        </div>
    )
}

export default PhoneItem