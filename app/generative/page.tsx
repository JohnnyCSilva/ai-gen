"use client";

import { useState, useEffect } from "react";
import { conversationModel } from "@/actions/ai"; // Atualizado para usar o modelo de conversa
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
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

interface Conversation {
  user: string;
  ai: string;
}

interface InputData {
  icon: string;
  text: string;
  color: string;
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Page() {
  const [textToGenerate, setTextToGenerate] = useState("");
  const [conversationHistory, setConversationHistory] = useState<
    Conversation[]
  >([]);

  const [boxes, setBoxes] = useState<InputData[]>([]);
  const [chatBotModel, setChatBotModel] = useState<"flash" | "pro">("flash");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const data = getRandomInputs(inputsData, isMobile ? 2 : 4);
      setBoxes(data);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Se o scroll for maior que 100px, altera o estado para true
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGenerateText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textToGenerate) return;

    setLoading(true);

    try {
      const aiResponse = await conversationModel(
        textToGenerate,
        conversationHistory,
        chatBotModel
      );
      setConversationHistory([
        ...conversationHistory,
        { user: textToGenerate, ai: aiResponse },
      ]);
      setTextToGenerate("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
    <main className="flex flex-col items-center justify-end h-fit p-4 md:p-4 w-full text-gray-100">
      <div
        className={`w-full flex  fixed ${
          isScrolled ? "md:top-8" : "md:top-32"
        }  md:left-8 transition-all duration-300 top-[32px] md:justify-start justify-center`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-6 py-6 rounded-xl">
              {chatBotModel === "flash"
                ? "Elysium 1.5 Flash"
                : "Elysium 1.5 Pro"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Model</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={chatBotModel}
              onValueChange={(value: string) => {
                if (value === "flash" || value === "pro") {
                  setChatBotModel(value as "flash" | "pro");
                }
              }}>
              <DropdownMenuRadioItem value="pro">
                Elysium 1.5 Pro
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="flash">
                Elysium 1.5 Flash
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {conversationHistory.length === 0 ? (
        <div className="md:w-1/2 w-full space-y-24 md:h-[700px] h-[500px] flex flex-col items-center justify-center">
          <img
            src="/logo.png"
            alt="AI"
            className="w-[50px] h-[50px] object-contain animate-bounce"
          />

          <div className="flex flex-col items-start justify-center gap-4 w-full md:flex-row ">
            {boxes.map((box, index) => (
              <div
                key={index}
                onClick={() => setTextToGenerate(box.text)}
                className="flex flex-col p-4 border rounded-xl md:w-full gap-4 cursor-pointer transition hover:bg-accent">
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
        </div>
      ) : (
        <div className="w-full md:w-1/2  flex flex-col rounded-xl p-4 gap-2 overflow-y-auto min-h-full mb-32">
          {conversationHistory.map((message, index) => (
            <div key={index} className="w-full flex flex-col mt-6 space-y-8">
              <div className="bg-gray-100/10 text-white p-4 w-2/3 rounded-xl mt-4">
                <ReactMarkdown>{message.user}</ReactMarkdown>
              </div>
              <div className="flex gap-4 flex-col items-start w-full mt-2">
                <ReactMarkdown>{message.ai}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-4 mt-4 fixed bottom-2 w-full md:w-1/2 p-4 md:p-8">
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

/*
<Button
          variant="outline"
          className="rounded-xl p-6 w-fit mb-4 mt-4 bg-gray-700 text-white hover:bg-gray-600"
          onClick={copyToClipboard}>
          Copy Conversation to Clipboard
        </Button>

        */
