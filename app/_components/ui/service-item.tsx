"use client"

import { BarbershopService } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Calendar } from "./calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { format, set, setHours, setMinutes } from "date-fns";
import { createBooking } from "@/app/_action/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface ServiceItemProps {
    service: BarbershopService
    barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
]

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const {data} = useSession()
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<String | undefined>(undefined)

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDay(date)
    }

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time)
    }

    const handleCreateBooking = async () => {
       try {
        if (!selectedDay || !selectedTime) return;
        const hour = Number(selectedTime.split(":") [0])
        const minute = Number(selectedTime.split(":") [1])
        const newDate = set(selectedDay, {
            minutes: minute,
            hours: hour,   
        })
        await createBooking({
            serviceId: service.id,
            userId: "cm04kw43v0000kxhckbsiiyhv",
            date: newDate,
        })
        toast.success("Reserva Criada com Sucesso!")
       } catch (error) {
        console.error(error)
        toast.error("Erro ao criar reservar!")
       }
    }

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
                <div className="space-y-3">
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

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="secondary" size="sm">
                                    Reservar
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="px-0">
                                <SheetHeader>
                                    <SheetTitle>Fazer Reserva</SheetTitle>
                                </SheetHeader>

                                <div className="py-5 border-b border-solid">
                                    <Calendar
                                        mode="single"
                                        locale={ptBR}
                                        selected={selectedDay}
                                        onSelect={handleDateSelect}
                                        styles={{
                                            head_cell: {
                                                width: "100%",
                                                textTransform: "capitalize",
                                            },
                                            cell: {
                                                width: "100%",
                                            },
                                            button: {
                                                width: "100%",
                                            },
                                            nav_button_previous: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            nav_button_next: {
                                                width: "32px",
                                                height: "32px",
                                            },
                                            caption: {
                                                textTransform: "capitalize",
                                            },
                                        }}
                                    />
                                </div>

                                {selectedDay && (
                                    <div className="p-5 flex overflow-x-auto gap-3 [&::-webkit-scrollbar]:hidden border-b border-solid">
                                        {TIME_LIST.map((time) => (
                                            <Button
                                                key={time}
                                                variant={selectedTime === time ? "default" : "outline"}
                                                className="rounded-full"
                                                onClick={() => handleTimeSelect(time)}>
                                                {time}
                                            </Button>
                                        ))}
                                    </div>
                                )}

                                {selectedTime && selectedDay && (
                                    <div className="p-5">
                                        <Card>
                                            <CardContent className="p-3 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <h2>{service.name}</h2>
                                                    <p className="text-sm font-bold">
                                                        {Intl.NumberFormat("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        }).format(Number(service.price))}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center text-gray-400">
                                                    <h2 className="text-sm">Data</h2>
                                                    <p className="text-sm">
                                                        {format(selectedDay, "d 'de' MMMM 'de' y", {
                                                            locale: ptBR,
                                                        })}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center text-gray-400">
                                                    <h2 className="text-sm">Horário</h2>
                                                    <p className="text-sm">
                                                        {selectedTime}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center text-gray-400">
                                                    <h2 className="text-sm">Barbearia</h2>
                                                    <p className="text-sm">
                                                        {barbershop.name}
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}

                                <SheetFooter className="px-5">
                                    <SheetClose asChild>
                                        <Button onClick={handleCreateBooking}>Confirmar</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>

                    </div>
                </div>

            </CardContent>
        </Card>
    );
}

export default ServiceItem