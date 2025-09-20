"use client";
export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-[#f5fafd]">
      <div className="text-center bg-white w-1/2 p-12 rounded-lg shadow-lg">
        <p className="text-3xl font-bold text-[#1f3a6d] mb-8">
          Para o recuperação de senha, por favor, escreva seu email cadastrado
        </p>
        <input
          type="email"
          placeholder="Digite seu email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-md"
          required
        />
        <button
          className="w-full py-3 rounded-md bg-[#1f3a6d] text-white font-semibold hover:bg-[#16274a]"
          onClick={() => {
            alert("Email enviado com sucesso");
            window.location.href = "/no-auth/reset-password";
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
