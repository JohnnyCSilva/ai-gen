"use client";

import { useState } from "react";
import { runAiTextModel } from "../actions/ai";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import ReactMarkdown from "react-markdown";

export default function Page() {
  const [textToGenerate, setTextToGenerate] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateText = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await runAiTextModel(textToGenerate);
      setGeneratedText(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-full p-12 ">
      <form
        className="w-1/2 flex flex-col items-left justify-left space-y-4"
        onSubmit={(e) => handleGenerateText(e)}>
        <Textarea
          value={textToGenerate}
          onChange={(e) => setTextToGenerate(e.target.value)}
          placeholder="Enter text to generate..."
          className="w-full"
        />

        <Button disabled={loading} className="w-fit">
          Generate Response
        </Button>
      </form>

      <Card className="w-1/2 mt-4">
        <CardHeader>
          <CardTitle>Gemini 1.5 Flash</CardTitle>
        </CardHeader>
        {loading ? (
          <CardContent>
            <p>Generating text...</p>
          </CardContent>
        ) : (
          <CardContent>
            <ReactMarkdown>{generatedText}</ReactMarkdown>
          </CardContent>
        )}

        {generatedText && (
          <CardFooter>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(generatedText);
                toast({
                  description: "Your message has been sent.",
                });
              }}
              variant={"outline"}
              disabled={loading}>
              Copy Response
            </Button>
          </CardFooter>
        )}
      </Card>
    </main>
  );
}
