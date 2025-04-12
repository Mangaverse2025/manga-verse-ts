
import { Button } from "@/components/ui/button";
import { Grid2X2, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  resultCount: number;
}

export function ViewToggle({ view, setView, resultCount }: ViewToggleProps) {
  return (
    <div className="flex items-center ml-auto">
      <span className="text-sm text-muted-foreground mr-3">
        {resultCount} results
      </span>
      <div className="flex border border-input rounded-md overflow-hidden">
        <Button
          variant={view === "grid" ? "secondary" : "ghost"}
          size="sm"
          className="rounded-none border-0"
          onClick={() => setView("grid")}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          variant={view === "list" ? "secondary" : "ghost"}
          size="sm"
          className="rounded-none border-0"
          onClick={() => setView("list")}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
