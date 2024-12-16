'use client';

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-destructive">
            Authentication Error
          </h1>
          <p className="text-sm text-muted-foreground">
            {error === "AccessDenied"
              ? "You need to grant access to your Google account to continue."
              : "There was an error signing you in. Please try again."}
          </p>
        </div>
        <Button asChild>
          <Link href="/auth/signin">
            Try Again
          </Link>
        </Button>
      </div>
    </div>
  );
} 