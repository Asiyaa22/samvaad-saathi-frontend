"use client";

import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Fixed nav bars */}
      <TopNav />
      {/* Content area should scroll between top(64px) and bottom(64px) navs */}
      <main className="pt-16 pb-16 px-8 flex-1 overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
