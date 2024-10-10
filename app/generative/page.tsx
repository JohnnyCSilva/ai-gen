"use client";

import { useState, useEffect, useRef } from "react";
import { conversationModel } from "@/actions/ai"; // Atualizado para usar o modelo de conversa
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import {
  Brain,
  Rocket,
  Code,
  Camera,
  Music,
  Dna,
  Palette,
  Atom,
  Building2,
  HeartPulse,
  Languages,
  Boxes,
  Lightbulb,
  Users,
  Compass,
  Loader2Icon,
  Sparkles,
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
  const chatEndRef = useRef<HTMLDivElement | null>(null);

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
      icon: "Brain",
      text: "Explain the concept of neuroplasticity.",
      color: "text-pink-400",
    },
    {
      icon: "Rocket",
      text: "What are the latest developments in space exploration?",
      color: "text-purple-500",
    },
    {
      icon: "Code",
      text: "Compare functional and object-oriented programming paradigms.",
      color: "text-green-500",
    },
    {
      icon: "Camera",
      text: "Describe the evolution of photography from film to digital.",
      color: "text-gray-600",
    },
    {
      icon: "Music",
      text: "How does music affect cognitive function?",
      color: "text-indigo-400",
    },
    {
      icon: "Dna",
      text: "Explain CRISPR gene editing technology and its potential applications.",
      color: "text-blue-600",
    },
    {
      icon: "Palette",
      text: "Analyze the impact of AI on creative industries.",
      color: "text-yellow-500",
    },
    {
      icon: "Atom",
      text: "What are the latest breakthroughs in quantum computing?",
      color: "text-teal-500",
    },
    {
      icon: "Building2",
      text: "Describe sustainable architecture practices and their benefits.",
      color: "text-orange-400",
    },
    {
      icon: "HeartPulse",
      text: "How do wearable devices impact personal health management?",
      color: "text-red-500",
    },
    {
      icon: "Languages",
      text: "Discuss the influence of technology on language evolution.",
      color: "text-cyan-600",
    },
    {
      icon: "Boxes",
      text: "Explain the potential applications of blockchain beyond cryptocurrency.",
      color: "text-blue-400",
    },
    {
      icon: "Lightbulb",
      text: "What are some innovative solutions for urban waste management?",
      color: "text-amber-500",
    },
    {
      icon: "Users",
      text: "How is social media reshaping political discourse?",
      color: "text-violet-500",
    },
    {
      icon: "Compass",
      text: "Describe the ethical considerations in artificial intelligence development.",
      color: "text-emerald-600",
    },
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationHistory]);

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

          <div className="flex flex-row items-start justify-center gap-4 w-full">
            {boxes.map((box, index) => (
              <div
                key={index}
                onClick={() => setTextToGenerate(box.text)}
                className="flex flex-col p-4 border rounded-xl md:w-full gap-4 cursor-pointer transition hover:bg-accent">
                {box.icon === "Brain" && <Brain className="text-blue-400" />}
                {box.icon === "Rocket" && (
                  <Rocket className="text-yellow-400" />
                )}
                {box.icon === "Code" && <Code className="text-purple-400" />}
                {box.icon === "Camera" && <Camera className="text-red-400" />}
                {box.icon === "Music" && <Music className="text-green-400" />}
                {box.icon === "Dna" && <Dna className="text-orange-400" />}
                {box.icon === "Palette" && (
                  <Palette className="text-brown-400" />
                )}
                {box.icon === "Atom" && <Atom className="text-green-600" />}
                {box.icon === "Building2" && (
                  <Building2 className="text-blue-600" />
                )}
                {box.icon === "HeartPulse" && (
                  <HeartPulse className="text-lightblue-400" />
                )}
                {box.icon === "Languages" && (
                  <Languages className="text-indigo-400" />
                )}
                {box.icon === "Boxes" && <Boxes className="text-teal-400" />}
                {box.icon === "Lightbulb" && (
                  <Lightbulb className="text-red-600" />
                )}
                {box.icon === "Users" && <Users className="text-yellow-600" />}
                {box.icon === "Compass" && (
                  <Compass className="text-purple-600" />
                )}

                <p className="text-sm text-gray-300 text-normal">{box.text}</p>
              </div>
            ))}
          </div>

          {loading && (
            <div className="flex flex-row items-center justify-start gap-2 mt-8">
              <img src="/logo.png" alt="AI" className="w-8 h-8" />
              <p className="text-transparent ml-4 bg-clip-text bg-gradient-to-r from-gray-600 via-white to-gray-600 animate-glow">
                Generating response...
              </p>
            </div>
          )}
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

          {loading && (
            <div className="flex flex-row items-center justify-start gap-2 mt-8">
              <img src="/logo.png" alt="AI" className="w-8 h-8" />
              <p className="text-transparent ml-4 bg-clip-text bg-gradient-to-r from-gray-600 via-white to-gray-600 animate-glow">
                Generating response...
              </p>
            </div>
          )}

          <Button
            variant="outline"
            onClick={() => setConversationHistory([])}
            className="rounded-xl p-6 mt-8 cursor-pointer w-fit text-white">
            Reset AI Memory
          </Button>
        </div>
      )}

      <div ref={chatEndRef} />

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
                <Sparkles size={16} />{" "}
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
