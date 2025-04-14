"use server"

import { auth, signIn, signOut } from "@/app/lib/auth"


export async function handleAuth() {
   const session = await auth();

   if (session) {
        // Se o usuário já estiver logado, faça logout
      return await signOut({
            redirectTo: "/login",
        });
    }
    // Quando o usuário for logado com sucesso ele será redirecionado para o dashboard
    await signIn("google"), {
        redirectTo: "/dashboard",
    };

}