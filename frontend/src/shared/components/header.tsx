"use client";

import { useState, useEffect } from "react";
import { Music } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { useRouter } from "next/navigation";
import { ROUTES } from "../navigation";

export function Header() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => router.push(ROUTES.editor)}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">SRTech Editor</span>
          </div>

          <div className="flex-1 flex justify-center"></div>

          <div className="flex items-center">
            {mounted && <LanguageSwitcher />}
          </div>
        </div>
      </div>
    </header>
  );
}
