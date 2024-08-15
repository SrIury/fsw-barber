import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
    service: BarbershopService
}


const ServiceItem = ({ service }: ServiceItemProps) => {
    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-3">
                {/* IMAGE */}
                <div className="relative max-h-[150px] min-h-[150px] max-w-[150px] min-w-[150px]">
                    <Image
                        alt={service.name}
                        src={service.imageUrl}
                        fill className="object-cover rounded-xl"
                    />
                </div>

                {/* DIREITA */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-sm">{service.name}</h3>
                    <p className="text-sm text-gray-400">{service.description}</p>

                    {/* PREÇO E BOTÃO */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-primary font-bold" >
                            {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            }).format(Number(service.price))}
                        </p>

                        <Button variant="secondary" size="sm">
                            Reservar
                        </Button>

                    </div>
                </div>

            </CardContent>
        </Card>
    );
}

export default ServiceItem