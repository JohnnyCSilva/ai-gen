import template from "@/utils/template";
import Image from "next/image";
import Link from "next/link";

import React from "react";

export default function page() {
  return (
    <div className="grid grid-cols-1 md-grid-cols-2 lg:grid-cols-3 gap-4 p-8">
      {template.map((item, index) => (
        <Link key={item.slug} href={`/dashboard/template/${item.slug}`}>
          <div className="p-5 shadow-md rounded-xl border flex flex-col gap-2 cursor-pointer hover:shadow-xl transition-all ">
            <Image src={item.icon} alt={item.name} width={25} height={25} />
            <h2 className="font-medium text-lg">{item.name}</h2>
            <p className="text-gray-500 line-clam-3">{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
