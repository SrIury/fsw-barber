"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, Divide, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, useSession } from "next-auth/react";

const SidebarSheet = () => {
    const { data } = useSession()
    const handleLoginWithGoogleClick = () => signIn("google")
    // const handleLogoutClick = () => signOut()

    return (
        <SheetContent>
            <SheetHeader className="overflow-y-auto">
                <SheetTitle className="text-left">
                    Menu
                </SheetTitle>
            </SheetHeader>
            <div className="flex items-center justify-between border-b border-solid py-5 gap-3">
                {data?.user ? (
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={data?.user?.image ?? ""} />
                        </Avatar>

                        <div>
                            <p className="font-bold">{data.user.name}</p>
                            <p className="text-xs">{data.user.email}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2 className="font-bold">Olá, faça seu login</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[90%]">
                                <DialogHeader>
                                    <DialogTitle>Faça login na plataforma</DialogTitle>
                                    <DialogDescription>
                                        Conecte-se usando sua conta do Google.
                                    </DialogDescription>
                                </DialogHeader>

                                <Button
                                    variant="outline"
                                    className="gap-1 font-bold"
                                    onClick={handleLoginWithGoogleClick}>

                                    <Image
                                        alt="Fazer logion com o Google"
                                        src="/Google.svg"
                                        width={18}
                                        height={18} /> Google
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </>

                    )}
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
                <Button 
                variant="ghost" 
                className="justify-start gap-2"
                // onClick={handleLogoutClick}
                >
                    <LogOutIcon size={18} />
                    Sair da conta
                </Button>

            </div>
        </SheetContent>
    );
}

export default SidebarSheet;