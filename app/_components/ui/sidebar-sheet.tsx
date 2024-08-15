import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const SidebarSheet = () => {
    return (
        <SheetContent>
            <SheetHeader className="overflow-y-auto">
                <SheetTitle className="text-left">
                    Menu
                </SheetTitle>
            </SheetHeader>

            <div className="flex items-center border-b border-solid py-5 gap-3">
                <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                </Avatar>

                <div>
                    <p className="font-bold">Iury Bonadiman</p>
                    <p className="text-xs">iury.bonadiman@gmail.com</p>
                </div>
            </div>

            {/* Botões menu Lateral */}
            <div className="flex flex-col gap-2 py-5 border-b border-solid">
                <SheetClose asChild>
                    <Button className="justify-start gap-2" variant={"ghost"} asChild>
                        <Link href="/">
                            <HomeIcon size={18} />
                            Inicio
                        </Link>
                    </Button>
                </SheetClose>

                <Button className="justify-start gap-2" variant={"ghost"}>
                    <CalendarIcon size={18} />
                    Agendamentos
                </Button>
            </div>

            <div className="flex flex-col gap-2 py-5 border-b border-solid">
                {quickSearchOptions.map((Option) => (
                    <Button
                        key={Option.title}
                        className="justify-start gap-2"
                        variant={"ghost"}>
                        <Image
                            alt={Option.title}
                            src={Option.imageUrl}
                            height={18}
                            width={18} />
                        {Option.title}
                    </Button>
                ))}
            </div>

            <div className="flex flex-col gap-2 border-b border-solid">
                <Button variant="ghost" className="justify-start gap-2">
                    <LogOutIcon size={18} />
                    Sair da conta
                </Button>

            </div>
        </SheetContent>
    );
}

export default SidebarSheet;