"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "@/app/utils";
import { User } from "@/app/types/user.types";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const userDetails = getLocalStorage<User>("user_details");

    if (!userDetails) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}




