import { Suspense } from "react";
import Link from "next/link";
import { CategoryNavigation } from "@/components/CategoryNavigation";
import { DateLabel } from "@/components/DateLabel";
import { NavbarAccount } from "@/components/NavbarAccount";
import type { Category } from "@/lib/utils";

export default function Navbar({ categories }: { categories: Category[] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-700 text-xl">
            🛒
          </span>
          <span className="leading-tight">
            <b className="block text-lg">বাজার দর</b>
            <DateLabel />
          </span>
        </Link>
        <NavbarAccount />
      </div>
      <nav
        aria-label="পণ্যের বিভাগ"
        className="sticky top-[72px] z-40 border-t border-gray-100 bg-white"
      >
        <Suspense
          fallback={
            <div aria-hidden="true" className="mx-auto h-10 max-w-6xl px-5 py-2" />
          }
        >
          <CategoryNavigation categories={categories} />
        </Suspense>
      </nav>
    </header>
  );
}

