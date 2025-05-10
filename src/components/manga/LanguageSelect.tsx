
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export function LanguageSelect() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languageOptions } = useLanguage();
  
  const displayText = {
    'en': 'English',
    'es': 'Español',
    'zh-CN': '中文',
  };
  
  return (
    <Select 
      value={currentLanguage} 
      onValueChange={changeLanguage}
    >
      <SelectTrigger className="w-[130px]">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue placeholder={t('language.title')}>
            {displayText[currentLanguage as keyof typeof displayText] || displayText.en}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
