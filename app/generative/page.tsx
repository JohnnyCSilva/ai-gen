"use client";

import { useState, useEffect } from "react";
import { runAiTextModel } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import {
  Search,
  CloudSun,
  NotebookPen,
  Beef,
  Book,
  Sun,
  Trees,
  Leaf,
  Globe,
  Droplet,
  Bolt,
  ChartLine,
  User,
  Shield,
  Loader2Icon,
  Sparkle,
} from "lucide-react";

interface InputData {
  icon: string;
  text: string;
  color: string;
}

export default function Page() {
  const [textToGenerate, setTextToGenerate] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [boxes, setBoxes] = useState<InputData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const handleResize = () => {
      // Verificar largura da tela e ajustar o número de caixas
      const isMobile = window.innerWidth < 768; // Define o breakpoint (mobile abaixo de 768px)
      const data = getRandomInputs(inputsData, isMobile ? 2 : 4);
      setBoxes(data);
    };

    handleResize(); // Chamar ao carregar a página
    window.addEventListener("resize", handleResize); // Adicionar listener para resize

    return () => window.removeEventListener("resize", handleResize); // Limpar listener
  }, []);

  const handleGenerateText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textToGenerate) return;

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      toast({
        description: "Copied to Clipboard",
      });
    } catch {
      toast({
        description: "Failed to copy to Clipboard",
      });
    }
  };

  const inputsData: InputData[] = [
    {
      icon: "Search",
      text: "Give me articles about global warming.",
      color: "text-blue-400",
    },
    {
      icon: "CloudSun",
      text: "It's going to rain in Portugal in the next 3 days?",
      color: "text-yellow-400",
    },
    {
      icon: "NotebookPen",
      text: "Create a poem in the style of Camões about Next.js.",
      color: "text-purple-400",
    },
    {
      icon: "Beef",
      text: "Create a recipe low carbs and high protein.",
      color: "text-red-400",
    },
    {
      icon: "Book",
      text: "Summarize the latest research on climate change.",
      color: "text-green-400",
    },
    {
      icon: "Sun",
      text: "What are the benefits of solar energy?",
      color: "text-orange-400",
    },
    {
      icon: "TreePine",
      text: "How can I contribute to reforestation efforts?",
      color: "text-brown-400",
    },
    {
      icon: "Leaf",
      text: "What are the effects of deforestation?",
      color: "text-green-600",
    },
    {
      icon: "Globe",
      text: "What can we do to combat global warming?",
      color: "text-blue-600",
    },
    {
      icon: "Droplet",
      text: "How to conserve water in daily life?",
      color: "text-lightblue-400",
    },
    {
      icon: "Bolt",
      text: "What are the challenges of renewable energy?",
      color: "text-indigo-400",
    },
    {
      icon: "ChartLine",
      text: "Explain the greenhouse effect.",
      color: "text-teal-400",
    },
    {
      icon: "PersonStanding",
      text: "How does climate change affect biodiversity?",
      color: "text-red-600",
    },
    {
      icon: "Shield",
      text: "What policies can help mitigate climate change?",
      color: "text-yellow-600",
    },
  ];

  const getRandomInputs = (data: InputData[], num: number = 4): InputData[] => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  return (
    <main className="flex flex-col items-center justify-end h-full p-4 md:p-12 w-full">
      <Button
        className="rounded-xl p-6 mb-8 mt-4 md:mt-0 w-fit"
        variant="outline">
        Elysium 1.5 Flash
      </Button>

      {generatedText && (
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="w-full flex flex-col border rounded-xl p-8 gap-2">
            <ReactMarkdown>{generatedText}</ReactMarkdown>
          </div>

          <Button
            variant="outline"
            className="rounded-xl p-6 w-fit mb-24 mt-4"
            onClick={copyToClipboard}>
            Copy to Clipboard
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-4 mt-4 fixed bottom-2 w-full md:w-1/2 p-4 md:p-8">
        {!generatedText && (
          <div className="flex flex-col items-center justify-center gap-4 w-full md:flex-row ">
            {boxes.map((box, index) => (
              <div
                key={index}
                onClick={() => setTextToGenerate(box.text)}
                className="flex flex-col p-4 border rounded-xl w-full gap-4 cursor-pointer transition hover:bg-accent">
                {box.icon === "Search" && <Search className="text-blue-400" />}
                {box.icon === "CloudSun" && (
                  <CloudSun className="text-yellow-400" />
                )}
                {box.icon === "NotebookPen" && (
                  <NotebookPen className="text-purple-400" />
                )}
                {box.icon === "Beef" && <Beef className="text-red-400" />}
                {box.icon === "Book" && <Book className="text-green-400" />}
                {box.icon === "Sun" && <Sun className="text-orange-400" />}
                {box.icon === "TreePine" && (
                  <Trees className="text-brown-400" />
                )}
                {box.icon === "Leaf" && <Leaf className="text-green-600" />}
                {box.icon === "Globe" && <Globe className="text-blue-600" />}
                {box.icon === "Droplet" && (
                  <Droplet className="text-lightblue-400" />
                )}
                {box.icon === "Bolt" && <Bolt className="text-indigo-400" />}
                {box.icon === "ChartLine" && (
                  <ChartLine className="text-teal-400" />
                )}
                {box.icon === "PersonStanding" && (
                  <User className="text-red-600" />
                )}
                {box.icon === "Shield" && (
                  <Shield className="text-yellow-600" />
                )}

                <p className="text-sm text-gray-300 text-normal">{box.text}</p>
              </div>
            ))}
          </div>
        )}

        <form
          className="w-full mt-4 flex flex-row items-left justify-left gap-4"
          onSubmit={handleGenerateText}>
          <Input
            value={textToGenerate}
            onChange={(e) => setTextToGenerate(e.target.value)}
            placeholder="Enter text to generate..."
            className="w-full text-md py-8 px-6 rounded-xl bg-[#09090b]"
          />
          <Button
            disabled={loading}
            variant="outline"
            className="rounded-full text-md py-8 px-6 bg-[#09090b] md:rounded-xl md:px-4">
            {loading ? (
              <Loader2Icon size={24} className="animate-spin" />
            ) : (
              <p className="flex flex-row gap-2 items-center">
                <Sparkle size={16} />{" "}
                <span className="md:block hidden">Generate</span>
              </p>
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
