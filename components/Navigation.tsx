'use client';

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold tracking-tight">
              DataNexus
            </Link>
            {session && (
              <div className="hidden md:block ml-10 space-x-8">
                <Link href="/visualize" className="text-foreground/60 hover:text-foreground transition-colors">
                  Visualize
                </Link>
                <Link href="/drives" className="text-foreground/60 hover:text-foreground transition-colors">
                  Drive Nodes
                </Link>
                <Link href="/ai-tools" className="text-foreground/60 hover:text-foreground transition-colors">
                  AI Tools
                </Link>
                <Link href="/docker" className="text-foreground/60 hover:text-foreground transition-colors">
                  Docker
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            {session ? (
              <div className="flex items-center gap-4">
                {session.user?.image && (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild>
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 