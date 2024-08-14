import { SearchIcon } from "lucide-react"
import Header from "./_components/ui/header"
import { Button } from "./_components/ui/ui/button"
import { Input } from "./_components/ui/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/ui/card"
import { Badge } from "./_components/ui/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershoItem from "./_components/ui/barbershop-Item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/ui/booking-item"



const Home = async () => {
  // chamar meu banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })

  return (
    <div>
      {/* header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá Iury</h2>
        <p>Segunda-feira, 05 de agosto.</p>

        {/* BUSCA */}
        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map(option => (
            <Button className="gap-2" variant="secondary" key={option.title}>
            <Image src={option.imageUrl} 
            width={16} 
            height={16} 
            alt={option.title} 
            />
            {option.title}
          </Button>
          ) )}

        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/Banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        {/* IMAGEM */}
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map(barbershop => (
            <BarbershoItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        {/* IMAGEM */}
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map(barbershop => (
            <BarbershoItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <footer>
          <Card>
            <CardContent className="px-5 py-6">
              <p className="text-sm text-gray-400">© 2023 Copyright <span className="font-bold">FSW Barber</span> </p>
            </CardContent>
          </Card>
        </footer>

      </div>
    </div>
  )
}

export default Home