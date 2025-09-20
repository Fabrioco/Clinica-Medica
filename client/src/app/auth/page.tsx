"use client";
import React, { useState } from "react";
import { AuthFormLogin } from "./_components/authFormLogin";
import { AuthFormRegister } from "./_components/authFormRegister";

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
          {/* Login Form */}
          <AuthFormLogin setIsLogin={setIsLogin} />
          
          {/* Login Side Image/Text */}
          <div className="w-1/2 bg-[#1f3a6d] flex-col justify-center items-center text-white p-12 hidden sm:flex">
            <h2 className="text-4xl font-bold mb-4">Bem-vindo de volta!</h2>
            <p className="text-lg text-center">
              Entre com seus dados e continue explorando nossas soluções.
            </p>
          </div>

          {/* Register Side Image/Text */}
          <div className="w-1/2 bg-[#1f3a6d] flex-col justify-center items-center text-white p-12 hidden sm:flex">
            <h2 className="text-4xl font-bold mb-4">Crie sua conta</h2>
            <p className="text-lg text-center">
              Cadastre-se agora e tenha acesso a todos os nossos recursos.
            </p>
          </div>

          {/* Register Form */}
          <AuthFormRegister setIsLogin={setIsLogin} />
        </div>
      </div>
    </div>
  );
}
