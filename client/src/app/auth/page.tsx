"use client";
import Link from "next/link";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { ButtonAuth } from "./_components/button";
import { useAuthStore } from "@/store/auth";


export default function AuthPage() {
  const { login, register, isLoading, errorMessage } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);

  // Login
  const [emailLogin, setEmailLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");

  // Register
  const [nameRegister, setNameRegister] = useState<string>("");
  const [emailRegister, setEmailRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");
  const [confirmPasswordRegister, setConfirmPasswordRegister] =
    useState<string>("");

  // Handle Login
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await login(emailLogin, passwordLogin);

    if (result?.error) {
      result.error.forEach((msg: string) => toast.error(msg));
    } else {
      toast.success("Login efetuado com sucesso");
    }
  }

  // Handle Register
  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await register(
      nameRegister,
      emailRegister,
      passwordRegister,
      confirmPasswordRegister
    );

    if (result?.error) {
      result.error.forEach((msg: string) => toast.error(msg));
    } else {
      toast.success("Cadastro efetuado com sucesso");
      setIsLogin(true); // opcional: voltar para tela de login após cadastro
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#f5fafd]">
      <div className="relative w-full h-screen overflow-hidden shadow-lg bg-white">
        <div
          className={`absolute top-0 left-0 h-full w-[200%] flex transition-transform duration-700 ${
            isLogin ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          {/* Login Form */}
          <form
            className="w-1/2 flex flex-col justify-center items-center p-12 bg-white"
            onSubmit={handleLogin}
          >
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold text-[#1f3a6d]">MinhaMarca</h1>
              <h2 className="text-lg text-gray-500">Sua solução digital</h2>
            </div>

            <h2 className="text-3xl font-bold text-[#1f3a6d] mb-8">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
              onChange={(e) => setEmailLogin(e.target.value)}
              value={emailLogin}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
              onChange={(e) => setPasswordLogin(e.target.value)}
              value={passwordLogin}
            />

            <ButtonAuth
              text={isLoading ? "Entrando..." : "Entrar"}
              type="submit"
              onClick={() => {}}
              isLink={false}
            />

            {errorMessage.length > 0 && (
              <p className="text-red-500 flex flex-col gap-2 mt-1">
                {errorMessage.map((msg) => (
                  <span key={msg}>{msg}</span>
                ))}
              </p>
            )}


            <div className="mt-6 text-sm flex flex-row gap-4">
              <p>
                Esqueceu a senha?{" "}
                <Link

                  href="/no-auth/forgot-password"

                  className="text-[#1f3a6d] font-semibold hover:underline"
                >
                  Clique aqui
                </Link>
              </p>

              <p>
                Não tem conta?{" "}
                <ButtonAuth
                  text="Cadastre-se"
                  type="button"
                  onClick={() => setIsLogin(false)}
                  isLink={true}
                />
              </p>
            </div>
          </form>

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
          <form
            className="w-1/2 flex flex-col justify-center items-center p-12 bg-white"
            onSubmit={handleRegister}
          >
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
              onChange={(e) => setNameRegister(e.target.value)}
              value={nameRegister}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
              onChange={(e) => setEmailRegister(e.target.value)}
              value={emailRegister}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
              onChange={(e) => setPasswordRegister(e.target.value)}
              value={passwordRegister}
            />
            <input
              type="password"
              placeholder="Confirmar senha"
              className="w-full mb-4 p-3 border border-gray-300 rounded-md"
              onChange={(e) => setConfirmPasswordRegister(e.target.value)}
              value={confirmPasswordRegister}
            />
            <ButtonAuth
              text={isLoading ? "Registrando..." : "Registrar"}
              type="submit"
              onClick={() => {}}
              isLink={false}
            />
            <p className="mt-6 text-sm">
              Já tem conta?{" "}
              <ButtonAuth
                text="Clique aqui"
                type="button"
                onClick={() => setIsLogin(true)}
                isLink={true}
              />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
