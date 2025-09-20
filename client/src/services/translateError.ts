export function translateError(message: string) {
  const map: Record<string, string> = {
    "email must be an email": "Formato de email inválido",
    "password must be longer than or equal to 8 characters":
      "Senha deve ser maior ou igual a 8 caracteres",
    "password must be shorter than or equal to 32 characters":
      "Senha deve ser menor ou igual a 32 caracteres",
    "Invalid credentials": "Credenciais inválidas",
    "User not found": "Usuário não encontrado",
    "Credentials invalid": "Credenciais inválidas",
  };

  return map[message] || message;
}
