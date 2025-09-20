"use client";

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col bg-[#f5fafd] md:w-full">
      <div className="w-full md:w-1/2 flex flex-col gap-4 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#1f3a6d]">Recuperação de senha</h1>
        <p className="text-lg">
          Para o recuperação de senha, por favor, insira o código que foi
          enviado para o seu email e em seguida sua senha nova confirmada
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Código"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
        <div className="flex w-full">
          <button
            className="w-full py-3 rounded-md bg-[#1f3a6d] text-white font-semibold hover:bg-[#16274a] cursor-pointer"
            onClick={() => {
              alert("Senha alterada com sucesso");
              window.location.href = "/auth";
            }}
          >
            Recuperar
          </button>
        </div>
      </div>
    </div>
  );
}
