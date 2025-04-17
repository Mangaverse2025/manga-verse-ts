
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";

export default function Upload() {
  const [isOneshot, setIsOneshot] = useState(false);
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="/">
              <ArrowLeft className="h-5 w-5" />
            </a>
          </Button>
          <h1 className="text-2xl font-semibold">Upload Chapter</h1>
        </div>
        
        <div className="p-4 my-4 bg-orange-500/20 text-orange-700 dark:text-orange-300 rounded-md">
          Make sure to read the guidelines!
        </div>
        
        <div className="space-y-8">
          <div className="bg-card p-4 rounded-md border border-border">
            <h2 className="font-semibold mb-4">Details</h2>
            
            <div className="flex gap-4 items-center">
              <img 
                src="https://placekitten.com/100/150"
                alt="Manga Cover"
                className="w-20 h-28 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">Manga name</h3>
                <p className="text-sm text-muted-foreground">Author's name, Artist name</p>
                <div className="inline-block px-2 py-0.5 text-xs bg-green-500/20 text-green-600 dark:text-green-400 rounded-full mt-1">
                  Ongoing
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-4">
                <Checkbox 
                  id="oneshot" 
                  checked={isOneshot} 
                  onCheckedChange={(checked) => setIsOneshot(checked === true)}
                />
                <Label htmlFor="oneshot">This is a Oneshot</Label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="volume">Volume Number</Label>
                  <Input 
                    id="volume" 
                    placeholder="Volume Number" 
                    disabled={isOneshot}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="chapter">Chapter Number</Label>
                  <Input 
                    id="chapter" 
                    placeholder="Chapter Number" 
                    disabled={isOneshot}
                  />
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="chapterName">Chapter Name</Label>
                <Input 
                  id="chapterName" 
                  placeholder="Chapter Name" 
                />
              </div>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="language">Scanlation Language</Label>
                  <span className="text-red-500">*</span>
                </div>
                <Select>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                    <SelectItem value="ko">Korean</SelectItem>
                    <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                    <SelectItem value="zh-tw">Chinese (Traditional)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-4 rounded-md border border-border">
            <h2 className="font-semibold mb-4">Pages</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="aspect-[2/3] border-2 border-dashed border-border rounded-md flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors">
                <Plus className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Button variant="outline">Upload and add another chapter</Button>
            <Button className="bg-orange-500 hover:bg-orange-600">Upload</Button>
          </div>
          
          <div className="space-y-4">
            <h2 className="font-semibold">Chapter Upload Guidelines</h2>
            
            <div className="space-y-2">
              <p className="font-medium text-red-500">Do not upload:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Western comics (e.g. Marvel, DC...)</li>
                <li>Official releases, including raws, unless they fall under the exceptions in site rules section 12.1.</li>
                <li>Bulk chapters (e.g. Combining 10 chapters into 1).</li>
                <li>Images from aggregator websites if an original source is available.</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium">File requirements and limits:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>An image can be at most (10000 x 10000) pixels.</li>
                <li>The maximum size per image file is 20MB.</li>
                <li>The only allowed image formats are JPG, PNG, and GIF.</li>
                <li>The total file size per chapter may not exceed 200MB.</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium">Naming conventions:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the translator group name if available, but only if the original work uses per-chapter names.</li>
                <li>Include the volume number, only if the volume was officially released for purchase, leave it empty otherwise.</li>
                <li>If the title uses 'seasons', use the season number as a chapter prefix.</li>
                <li>Only put volume/chapter numbers into the chapter and volume number fields. Do not put them in the chapter name field.</li>
                <li>Use decimals (e.g. 1.5) for bonus chapters/omake/etc.</li>
                <li>DO NOT zero-pad volume or chapter numbers (i.e. Chapter 5, do not: Chapter 05).</li>
                <li>For oneshots, tick the relevant checkboxes, and leave everything else empty.</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium">Groups:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-red-500">DO NOT change the order of or remove any group unless you are part of the original scanlation group.</li>
                <li className="text-red-500">Do not evade group upload restrictions by any means. Your account will be restricted or banned.</li>
                <li>If it is your first upload in a given translated language, it will be subject to manual review by our moderation team to avoid spamming.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
