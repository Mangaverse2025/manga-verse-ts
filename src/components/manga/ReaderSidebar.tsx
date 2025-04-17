
import { X, ChevronDown, ChevronUp, User, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface ReaderSidebarProps {
  mangaId: string;
  chapterId: string;
  chapterTitle: string;
  chapterNumber: string;
}

export function ReaderSidebar({ mangaId, chapterId, chapterTitle, chapterNumber }: ReaderSidebarProps) {
  const [readingDirection, setReadingDirection] = useState<"ltr" | "rtl">("ltr");
  const [headerHidden, setHeaderHidden] = useState(false);
  const [progressMode, setProgressMode] = useState<"normal" | "long">("normal");

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <h3 className="text-primary-500 font-medium">
            <a href={`/manga/${mangaId}`} className="hover:underline">{`<a>manga name</a>`}</a>
          </h3>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>Chapter name</span>
            <span className="text-xs opacity-50">/*text*/</span>
          </div>
        </div>
      </div>

      <div className="relative py-2 bg-zinc-800 rounded mb-4">
        <button className="absolute top-1/2 -translate-y-1/2 left-2">
          <ChevronUp className="h-5 w-5" />
        </button>
        <div className="text-center">
          <div className="font-medium">Chapter</div>
          <div className="text-sm">{`Chapter ${chapterNumber}`}</div>
        </div>
        <button className="absolute top-1/2 -translate-y-1/2 right-2">
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>

      <Button variant="secondary" className="bg-zinc-700 hover:bg-zinc-600 w-full mb-4">
        Report Chapter
      </Button>

      <Separator className="my-4 bg-zinc-700" />

      <Button variant="secondary" className="bg-zinc-700 hover:bg-zinc-600 w-full mb-4">
        Be the first to comment
      </Button>

      <div className="text-sm mb-2">Uploaded By</div>
      <div className="space-y-2 mb-4">
        <Button variant="ghost" className="flex items-center justify-start gap-2 w-full">
          <User className="h-4 w-4" />
          <span>Group name</span>
        </Button>
        <Button variant="ghost" className="flex items-center justify-start gap-2 w-full">
          <User className="h-4 w-4" />
          <span>uploader"user" name</span>
        </Button>
      </div>

      <Separator className="my-4 bg-zinc-700" />

      <div className="space-y-4">
        <Button 
          variant="secondary" 
          className={`w-full text-left justify-start ${progressMode === "long" ? "bg-zinc-700" : "bg-zinc-800"}`}
          onClick={() => setProgressMode("long")}
        >
          Long strip
        </Button>

        <Button 
          variant="secondary" 
          className={`w-full text-left justify-start ${readingDirection === "ltr" ? "bg-zinc-700" : "bg-zinc-800"}`}
          onClick={() => setReadingDirection("ltr")}
        >
          Left To Right
        </Button>

        <div className="flex items-center justify-between p-3 bg-zinc-800 rounded">
          <span>Header Hidden</span>
          <Switch 
            checked={headerHidden}
            onCheckedChange={setHeaderHidden}
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-zinc-700 rounded">
          <span>Normal Progress</span>
          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
            <Settings2 className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="secondary" className="w-full text-left justify-start bg-zinc-800">
          <Settings2 className="h-4 w-4 mr-2" />
          Reader Settings
        </Button>
      </div>
    </div>
  );
}
