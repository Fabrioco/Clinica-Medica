import Link from "next/link";
import { Warning } from "@phosphor-icons/react/ssr";

export default function NotFoundPage() {
  return (
    <div className="container h-screen flex flex-col items-center justify-center bg-[#f5fafd]">
      <div className="text-center flex flex-col items-center justify-center bg-white w-11/12 md:w-1/2 p-12 rounded-lg shadow-lg">
        <Warning size={100} color="black" />
        <h1 className="text-3xl font-bold text-[#1f3a6d] mb-4">404</h1>
        <p className="text-lg mb-4">Página não encontrada</p>
        <Link
          href="/"
          className="bg-[#1f3a6d] text-white py-2 px-4 rounded hover:bg-[#16274a]"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
