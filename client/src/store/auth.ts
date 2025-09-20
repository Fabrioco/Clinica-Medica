import { api } from "@/libs/api";
import { translateError } from "@/services/translateError";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: UserResponse | null;
  token: string | null;
  isLoading: boolean;
  errorMessage: string[];
  login: (
    email: string,
    password: string
  ) => Promise<{ success?: true; error?: string[] }>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<{ success?: true; error?: string[] }>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      errorMessage: [],

      login: async (email: string, password: string) => {
        try {
          if (!email || !password) {
            return { error: ["Email e senha são necessários"] };
          }

          set({ isLoading: true, errorMessage: [] });

          const response = await api("auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (response.statusCode >= 400) {
            const errors = Array.isArray(response.message)
              ? response.message.map((msg: string) => translateError(msg))
              : [translateError(response.message)];
            set({ errorMessage: errors });
            return { error: errors };
          }

          set({ user: response.user, token: response.token });
          return { success: true };
        } catch (err) {
          const errMsg = ["Erro interno do servidor"];
          set({ errorMessage: errMsg });
          return { error: errMsg };
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (name, email, password, confirmPassword) => {
        try {
          if (!name || !email || !password || !confirmPassword) {
            return { error: ["Todos os campos são obrigatórios"] };
          }

          set({ isLoading: true, errorMessage: [] });

          const response = await api("auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, confirmPassword }),
          });

          if (response.statusCode >= 400) {
            const errors = Array.isArray(response.message)
              ? response.message.map((msg: string) => translateError(msg))
              : [translateError(response.message)];
            set({ errorMessage: errors });
            return { error: errors };
          }

          set({ user: response.user, token: response.token });
          return { success: true };
        } catch (err) {
          const errMsg = ["Erro interno do servidor"];
          set({ errorMessage: errMsg });
          return { error: errMsg };
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => set({ user: null, token: null, errorMessage: [] }),
    }),
    {
      name: "auth-storage",
    }
  )
);
