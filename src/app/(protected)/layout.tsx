"use client";

import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Fixed nav bars */}
      <TopNav />
      {/* Content area should scroll between top(64px) and bottom(64px) navs */}
      <main className="pt-16 pb-16 min-h-screen overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
