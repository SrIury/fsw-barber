import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface BarbershoItemProps {
    barbershop: Barbershop
}

const BarbershoItem = ({ barbershop }: BarbershoItemProps) => {
    return (
        <Card className="min-w-[167px] rounded-2xl">
            <CardContent className="p-0 px-1 pt-1">
                {/* IMAGE */}
                <div className="relative h-[159px] w-full p-1">
                    <Image
                        alt="{barbershop.name}"
                        fill
                        className="rounded-2xl object-cover"
                        src={barbershop.imageUrl} 
                        />
                        <Badge className="absolute left-2 top-2 space-x-1" variant="secondary">
                            <StarIcon size={12} className="fill-primary text-primary" />
                            <p className="text-xs font-semibold">5,0</p>
                        </Badge>
                </div>

                {/* TEXTO */}
                <div className="py-3 px-1">
                    <h3 className="truncate font-semibold">{barbershop.name}</h3>
                    <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
                    <Button variant="secondary" className="mt-3 w-full">Reservar</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BarbershoItem;