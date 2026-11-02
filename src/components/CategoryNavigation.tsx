"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/utils";

export function CategoryNavigation({
  categories,
}: {
  categories: Category[];
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-5 py-2">
      {categories.map((category) => {
        const isActive = pathname === `/category/${category.slug}`;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition ${
              isActive
                ? "bg-green-50 font-semibold text-green-700"
                : "hover:bg-gray-100"
            }`}
            href={`/category/${category.slug}`}
            key={category.id}
          >
            {category.icon} {category.nameBn}
          </Link>
        );
      })}
    </div>
  );
}
