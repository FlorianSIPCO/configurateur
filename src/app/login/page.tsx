"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [visible, setVisible] = useState(false);
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
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou mot de passe incorrect");
    } else {
      router.push("/dashboard/admin");
    }
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  return (
    <main className="relative h-screen bg-gray-100 text-white flex items-center justify-center">
      {/* Image de fond */}
      <Image
        src="/images/bg.jpg"
        alt="Connexion background"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />

      {/* Formulaire */}
      <div 
        className={`bg-green-950 bg-opacity-50 backdrop-blur-lg p-8 rounded-xl shadow-xl max-w-md w-full relative z-10 transform transition-all duration-700 ease-out
        ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-600"
            required
          />

          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 transition text-white font-bold py-3 rounded-lg shadow-lg"
          >
            Se connecter
          </button>
          {/* Lien mot de passe oublié */}
          <div className="text-right">
            <Link
              href="#"
              className="text-sm text-amber-400 hover:underline hover:text-amber-300 transition"
            >
              Mot de passe oublié ?
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}
