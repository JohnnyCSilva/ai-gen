import React from "react";

import { ClipboardCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

import { QueryResponse, Props } from "@/utils/types";

const wordCount = (str: string) => {
  return str.split(" ").length;
};

export default function QueryTable({ data }: Props) {
  const { toast } = useToast();

  return (
    <div className="overflo-x-auto p-4">
      <table className="min-w-full bg-white dark:bg-slate-900/50 text-sm rounded-xl">
        <thead>
          <tr className="border-b">
            <th className="py-6 px-6 text-left">TEMPLATE</th>
            <th className="py-6 px-6 text-left">QUERY</th>
            <th className="py-6 px-6 text-left">DATE</th>
            <th className="py-6 px-6 text-left">WORDS</th>
            <th className="py-6 px-6 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-all ">
              <td className="py-4 px-6">
                <div className="flex gap-4">
                  <Image
                    src={item.template.icon}
                    alt={item.template.name}
                    width={24}
                    height={24}
                  />
                  <p>{item.template.name}</p>
                </div>
              </td>
              <td className="py-4 px-6">{item.query}</td>
              <td className="py-4 px-6">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-6">{wordCount(item.content)}</td>
              <td className="py-4 px-6">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(item.query);
                    toast({
                      description: "Copied to Clipboard",
                    });
                  }}
                  className="w-fit py-6 px-4 flex gap-2 rounded-xl"
                  variant="outline">
                  <ClipboardCopy size={16} />
                  Copy
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
