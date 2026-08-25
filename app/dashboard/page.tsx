"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { useAuth } from "@/lib/auth-context";

function DashboardContent() {
  const { user, logOut } = useAuth();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 px-6 dark:bg-black">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Welcome, {user?.displayName}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">{user?.email}</p>
      </div>
      <button
        onClick={() => logOut()}
        className="flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Sign out
      </button>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
