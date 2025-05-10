
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Settings() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languageOptions } = useLanguage();
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    // Apply theme based on selection
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      // Default - use system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, [theme]);

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">{t('settings.title')}</h1>
        
        <div className="space-y-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.theme.title')}</CardTitle>
              <CardDescription>{t('settings.theme.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={theme} 
                onValueChange={setTheme}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="theme-default" />
                  <Label htmlFor="theme-default">{t('settings.theme.default')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light">{t('settings.theme.light')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark">{t('settings.theme.dark')}</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          
          {/* Language Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t('settings.systemLanguage.title')}</CardTitle>
              <CardDescription>{t('settings.systemLanguage.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={currentLanguage} onValueChange={changeLanguage}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder={t('settings.systemLanguage.selectLanguage')} />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
