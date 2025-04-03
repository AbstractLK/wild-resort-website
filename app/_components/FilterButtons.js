"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function FilterButton() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (filterType) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filterType);
    router.replace(`${pathname}?${String(params)}`, { scroll: false });
  };

  const activeFilter = searchParams.get("capacity") ?? "all";

  const Button = ({ filterType, activeFilter, handleFilter, children }) => {
    return (
      <button
        className={`px-3 py-2 md:px-5 text-sm md:text-base hover:bg-slate-700 ${
          activeFilter == filterType ? "bg-slate-700" : ""
        }`}
        onClick={() => handleFilter(filterType)}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="border border-slate-500 flex items-center">
      <Button
        filterType="all"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All cabins
      </Button>

      <Button
        filterType="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1 - 3 guests
      </Button>

      <Button
        filterType="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4 - 7 guests
      </Button>

      <Button
        filterType="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8 - 10 guests
      </Button>
    </div>
  );
}
