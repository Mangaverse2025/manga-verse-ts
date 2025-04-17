
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mangaId: string;
  manga: any;
}

const REPORT_REASONS = [
  "Incorrect Information",
  "Duplicate Content",
  "Copyright Violation",
  "Inappropriate Content",
  "Broken Links/Images",
  "Other"
];

export function ReportDialog({ open, onOpenChange, mangaId, manga }: ReportDialogProps) {
  const [reason, setReason] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");

  const handleSubmit = () => {
    console.log("Report submitted:", {
      mangaId,
      reason,
      explanation
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 text-white border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl">Report</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-gray-300">Reporting Title</h3>
            <div className="flex items-center space-x-3 p-3 bg-zinc-800 rounded-md">
              {manga.coverImage && (
                <img src={manga.coverImage} alt={manga.title} className="h-16 w-12 object-cover rounded" />
              )}
              <div>
                <p className="font-medium">{manga.title}</p>
                <p className="text-sm text-gray-400">Manga ID: {mangaId}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="mb-2 text-gray-300">Reason</h3>
            <Select onValueChange={setReason} value={reason}>
              <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Choose a reason" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {REPORT_REASONS.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <h3 className="mb-2 text-gray-300">Additional Explanation</h3>
            <Textarea
              placeholder="Provide additional details"
              className="min-h-[120px] bg-zinc-800 border-zinc-700"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </div>
          
          <p className="text-xs text-gray-400">
            This site is protected by reCAPTCHA and the Google <a href="#" className="text-primary hover:underline">Privacy Policy</a> and <a href="#" className="text-primary hover:underline">Terms of Service</a> apply.
          </p>
        </div>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-zinc-700 hover:bg-zinc-600 border-none">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600 text-white">
            Send Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
