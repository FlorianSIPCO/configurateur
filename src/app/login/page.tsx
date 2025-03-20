"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // Empêche la redirection automatique
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect");
    } else {
      router.push("/dashboard/admin"); // Redirige après connexion réussie
    }
  };

  return (
    <div className="flex flex-col items-center bg-white justify-center h-screen relative p-10 min-h-screen bg-cover bg-center">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Connexion</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-gray-600 p-8 rounded-xl shadow-lg w-full max-w-xl border border-gray-200">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Se connecter
        </button>
      </form>
    </div>
  );
}
