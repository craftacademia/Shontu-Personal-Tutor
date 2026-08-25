"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, user, router]);

  const handleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      setError("Sign-in failed. Please try again.");
    }
  };

  if (loading || user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 dark:bg-black">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Ask Spidey
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Sign in to continue.
        </p>
      </div>
      <button
        onClick={handleSignIn}
        className="flex h-12 items-center justify-center gap-3 rounded-full border border-zinc-300 bg-white px-6 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
      >
        Sign in with Google
      </button>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
