"use client";
import Link from "next/link";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen bg-[#f5fafd]">
      <div className="relative w-full h-screen overflow-hidden shadow-lg bg-white">
        <div
          className={`absolute top-0 left-0 h-full w-[200%] flex transition-transform duration-700 ${
            isLogin ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-white">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-[#1f3a6d]">MinhaMarca</h1>
              <h2 className="text-lg text-gray-500">Sua solução digital</h2>
            </div>

            <h2 className="text-3xl font-bold text-[#1f3a6d] mb-8">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
            <button className="w-full py-3 rounded-md bg-[#1f3a6d] text-white font-semibold hover:bg-[#16274a]">
              Entrar
            </button>
            <div className="mt-6 text-sm flex flex-row gap-4">
              <p>
                Esqueceu a senha?{" "}
                <Link
                  href={"/no-auth/forgot-password"}
                  className="text-[#1f3a6d] font-semibold hover:underline"
                >
                  Clique aqui
                </Link>
              </p>
              <p className="">
                Não tem conta?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-[#1f3a6d] font-semibold hover:underline"
                >
                  Registrar
                </button>
              </p>
            </div>
          </div>
          <div className="w-1/2 bg-[#1f3a6d] flex-col justify-center items-center text-white p-12 hidden sm:flex">
            <h2 className="text-4xl font-bold mb-4">Bem-vindo de volta!</h2>
            <p className="text-lg text-center">
              Entre com seus dados e continue explorando nossas soluções.
            </p>
          </div>

          <div className="w-1/2 bg-[#1f3a6d] flex-col justify-center items-center text-white p-12 hidden sm:flex">
            <h2 className="text-4xl font-bold mb-4">Crie sua conta</h2>
            <p className="text-lg text-center">
              Cadastre-se agora e tenha acesso a todos os nossos recursos.
            </p>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center p-12 bg-white">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-[#1f3a6d]">MinhaMarca</h1>
              <h2 className="text-lg text-gray-500">Sua solução digital</h2>
            </div>

            <h2 className="text-3xl font-bold text-[#1f3a6d] mb-8">
              Registrar
            </h2>
            <input
              type="text"
              placeholder="Nome completo"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Confirmar senha"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
            />
            <button className="w-full py-3 rounded-md bg-[#1f3a6d] text-white font-semibold hover:bg-[#16274a]">
              Registrar
            </button>
            <p className="mt-6 text-sm">
              Já tem conta?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-[#1f3a6d] font-semibold hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
