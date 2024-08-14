import { EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react"
import Header from "./_components/ui/header"
import { Button } from "./_components/ui/ui/button"
import { Input } from "./_components/ui/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/ui/card"
import { Badge } from "./_components/ui/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershoItem from "./_components/ui/barbershop-Item"

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
            <Button className="gap-2" variant="secondary">
            <Image src="/Cabelo.svg" width={16} height={16} alt="Cabelo"/>
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/Barba.svg" width={16} height={16} alt="Barba"/>
            Barba
          </Button>
          
          <Button className="gap-2" variant="secondary">
            <Image src="/Acabamento.svg" width={16} height={16} alt="Acabamento"/>
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <FootprintsIcon size={16}/>
            Pézinho
          </Button>

          <Button className="gap-2" variant="secondary">
            <EyeIcon size={16}/>
            Sobrancelha
          </Button>

          <Button className="gap-2" variant="secondary">
            <FootprintsIcon size={16}/>
            Massagem
          </Button>

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
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Agendamentos</h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex itens center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"></AvatarImage>
                </Avatar>
                <p>Barbearia FSW</p>
              </div>

            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>

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