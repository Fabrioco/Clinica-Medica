"use client";

import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { AuthButton } from "./authButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AuthFormLogin = ({
  setIsLogin,
}: {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { login, isLoading, errorMessage } = useAuthStore();
  const [emailLogin, setEmailLogin] = useState<string>("");
  const [passwordLogin, setPasswordLogin] = useState<string>("");

  const { push } = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await login(emailLogin, passwordLogin);

    if (result?.error) {
      result.error.forEach((msg: string) => toast.error(msg));
    } else {
      toast.success("Login efetuado com sucesso");
      push("/dashboard");
    }
  }

  return (
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
        className="inputGlobal"
        onChange={(e) => setEmailLogin(e.target.value)}
        value={emailLogin}
      />
      <input
        type="password"
        placeholder="Senha"
        className="inputGlobal"
        onChange={(e) => setPasswordLogin(e.target.value)}
        value={passwordLogin}
      />
      <AuthButton
        text={isLoading ? "Entrando..." : "Entrar"}
        type="submit"
        isLink={false}
        disabled={isLoading}
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
          <AuthButton
            text="Cadastre-se"
            type="button"
            onClick={() => setIsLogin(false)}
            isLink={true}
          />
        </p>
      </div>
    </form>
  );
};
