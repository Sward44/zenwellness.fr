import { Header } from "@/conponents/header/Header";
import { Zenwellness } from "@/conponents/logos/Logos";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="bg-blanc h-20">
      <Header className="shadow-ha fixed z-30 flex bg-neutral-100 transition-transform duration-300 md:px-4 md:py-2 lg:px-8 2xl:px-16">
        <span className="h-6 w-20">
          <Zenwellness />
        </span>
      </Header>
    </div>
  );
}
