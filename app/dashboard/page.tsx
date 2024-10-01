"use client";

import template from "@/utils/template";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";

export default function page() {
  const [search, setSearch] = useState("");

  const filteredTemplate = template.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="p-8 pb-0 w-full">
        <div className="flex justify-left border items-center rounded-xl pl-4 gap-4">
          <Search />
          <input
            className="w-full bg-transparent border-none focus:outline-none focus:border-none py-4 rounded-xl"
            placeholder="Search Template"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {filteredTemplate.map((item, index) => (
          <Link key={item.slug} href={`/dashboard/template/${item.slug}`}>
            <div className="p-5 shadow-md rounded-xl border flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all dark:hover:border-white">
              <Image src={item.icon} alt={item.name} width={25} height={25} />
              <h2 className="font-medium text-lg">{item.name}</h2>
              <p className="text-gray-500 line-clam-3">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
