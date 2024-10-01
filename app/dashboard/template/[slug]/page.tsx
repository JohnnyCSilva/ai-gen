"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { ArrowLeft, Loader2Icon } from "lucide-react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import template from "@/utils/template";

import { runAiTextModel } from "@/actions/ai";

import ReactMarkdown from "react-markdown";

export interface Template {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  category: string;
  aiPrompt: string;
  form: Form[];
}

export interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}

export default function Page({ params }: { params: { slug: string } }) {
  const t = template.find((item) => item.slug === params.slug) as Template;

  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await runAiTextModel(t.aiPrompt + query);
      setContent(data);
    } catch {
      setContent("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
      <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-xl border p-8">
        <div className="flex flex-col gap-3">
          <Image src={t.icon} alt={t.name} width={50} height={50} />
          <h2 className="font-medium text-lg">{t.name}</h2>
          <p className="text-gray-500">{t.desc}</p>
        </div>

        <form className="mt-6" onSubmit={handleSubmit}>
          {t.form.map((item, index) => (
            <div key={index} className="my-2 flex flex-col gap-2">
              <label className="font-bold pb-5"> {item.label}</label>

              {item.field === "input" ? (
                <Input
                  key={index}
                  name={item.name}
                  required={item.required}
                  className="py-6"
                  onChange={(e) => setQuery(e.target.value)}
                />
              ) : item.field === "textarea" ? (
                <Textarea
                  key={index}
                  name={item.name}
                  required={item.required}
                  className="py-6"
                  onChange={(e) => setQuery(e.target.value)}
                />
              ) : null}
            </div>
          ))}

          <Button type="submit" className="w-full py-6 mt-2" disabled={loading}>
            {loading ? (
              <Loader2Icon size={24} className="animate-spin mr-2" />
            ) : (
              "Generate Content"
            )}
          </Button>
        </form>
      </div>

      <div className="col-span-2">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
