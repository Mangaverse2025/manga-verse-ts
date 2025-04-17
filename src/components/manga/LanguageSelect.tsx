
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function LanguageSelect() {
  return (
    <Select defaultValue="EN">
      <SelectTrigger className="w-[130px]">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="EN">English</SelectItem>
        <SelectItem value="ZH-CN">Chinese (Simplified)</SelectItem>
        <SelectItem value="ZH-TW">Chinese (Traditional)</SelectItem>
        <SelectItem value="JA">Japanese</SelectItem>
        <SelectItem value="KO">Korean</SelectItem>
        <SelectItem value="ES">Spanish</SelectItem>
        <SelectItem value="FR">French</SelectItem>
      </SelectContent>
    </Select>
  );
}
