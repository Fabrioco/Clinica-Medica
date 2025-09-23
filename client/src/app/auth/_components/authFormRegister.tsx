"use client";

import { useAuthStore } from "@/store/auth";
import { AuthButton } from "./authButton";
import { useState } from "react";
import { toast } from "react-toastify";

export const AuthFormRegister = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { register, isLoading, errorMessage } = useAuthStore();

  const [nameRegister, setNameRegister] = useState<string>("");
  const [emailRegister, setEmailRegister] = useState<string>("");
  const [passwordRegister, setPasswordRegister] = useState<string>("");
  const [confirmPasswordRegister, setConfirmPasswordRegister] =
    useState<string>("");

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
    <form
      className="w-1/2 flex flex-col justify-center items-center p-12 bg-white"
      onSubmit={handleRegister}
    >
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-[#1f3a6d]">MinhaMarca</h1>
        <h2 className="text-lg text-gray-500">Sua solução digital</h2>
      </div>

      <h2 className="text-3xl font-bold text-[#1f3a6d] mb-8">Registrar</h2>
      <input
        type="text"
        placeholder="Nome completo"
        className="inputGlobal"
        onChange={(e) => setNameRegister(e.target.value)}
        value={nameRegister}
      />
      <input
        type="email"
        placeholder="Email"
        className="inputGlobal"
        onChange={(e) => setEmailRegister(e.target.value)}
        value={emailRegister}
      />
      <input
        type="password"
        placeholder="Senha"
        className="inputGlobal"
        onChange={(e) => setPasswordRegister(e.target.value)}
        value={passwordRegister}
      />
      <input
        type="password"
        placeholder="Confirmar senha"
        className="inputGlobal"
        onChange={(e) => setConfirmPasswordRegister(e.target.value)}
        value={confirmPasswordRegister}
      />
      <AuthButton
        text={isLoading ? "Registrando..." : "Registrar"}
        type="submit"
        isLink={false}

      />

      {errorMessage.length > 0 && (
        <p className="text-red-500 flex flex-col gap-2 mt-1">
          {errorMessage.map((msg) => (
            <span key={msg}>{msg}</span>
          ))}
        </p>
      )}

      <p className="mt-6 text-sm">
        Já tem conta?{" "}
        <AuthButton
          text="Clique aqui"
          type="button"
          onClick={() => setIsLogin(true)}
          isLink={true}
        />
      </p>
    </form>
  );
};
