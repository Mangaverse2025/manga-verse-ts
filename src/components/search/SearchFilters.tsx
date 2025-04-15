
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Search, X, ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface SearchFiltersProps {
  sort: string;
  setSort: (sort: string) => void;
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  statusFilters: string[];
  setStatusFilters: (status: string[]) => void;
}

export function SearchFilters({ 
  sort, 
  setSort, 
  selectedGenres, 
  setSelectedGenres, 
  statusFilters, 
  setStatusFilters 
}: SearchFiltersProps) {
  // Original data
  const statuses = ["Ongoing", "Completed", "Hiatus", "Discontinued"];
  const originalGenres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural", "Thriller"];

  // New filter options
  const mangaTypes = ["None", "Manga", "One-Shot", "Doujinshi", "Manhwa", "Manhua"];
  const sortOptions = [
    "None", "Best Match", "Highest Rating", "Lowest Rating", 
    "Most Follows", "Fewest Follows", "Recently Added", "Oldest Added"
  ];
  
  const allGenres = [
    ...originalGenres,
    "Ecchi", "Game", "Harem", "Hentai", "Historical", "Josei", "Kids", "Magic",
    "Martial Arts", "Mecha", "Military", "Music", "Parody", "Police", "Psychological",
    "Samurai", "School", "Seinen", "Shoujo", "Shounen", "Super Power", "Vampire",
    "Yaoi", "Yuri", "Boys' Love", "Girls' Love", "Isekai", "Magical Girls", "Medical",
    "Philosophical", "Superhero", "Tragedy", "Wuxia", "Aliens", "Animals", "Cooking",
    "Crossdressing", "Delinquents", "Ghosts", "Incest", "Loli", "Mafia", "Monster Girls",
    "Monsters", "Ninja", "Office Workers", "Post-Apocalyptic", "Reincarnation",
    "Reverse Harem", "Shota", "Survival", "Time Travel", "Traditional Games",
    "Virtual Reality", "Zombies", "Demons", "Gender Bender", "Shoujo Ai", "Shounen Ai",
    "Gender swap", "Vampires", "Villainess"
  ];
  
  const languages = [
    "Japanese", "Korean", "Chinese (Simplified)", "Chinese (Traditional)", "English",
    "Afrikaans", "Albanian", "Arabic", "Azerbaijani", "Basque", "Belarusian", "Bengali",
    "Bulgarian", "Burmese", "Catalan", "Chuvash", "Croatian", "Czech", "Danish", "Dutch",
    "Esperanto", "Estonian", "Filipino", "Finnish", "French", "Georgian", "German", "Greek",
    "Hebrew", "Hindi", "Hungarian", "Indonesian", "Irish", "Italian", "Javanese", "Kazakh",
    "Latin", "Lithuanian", "Malay", "Mongolian", "Nepali", "Norwegian", "Persian", "Polish",
    "Portuguese", "Portuguese (Br)", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian",
    "Spanish", "Spanish (LATAM)", "Swedish", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian",
    "Urdu", "Uzbek", "Vietnamese"
  ];
  
  // Search states for dropdowns
  const [typeSearch, setTypeSearch] = useState("");
  const [sortSearch, setSortSearch] = useState("");
  const [genreSearch, setGenreSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");
  const [artistSearch, setArtistSearch] = useState("");
  
  // New filter states
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedTranslations, setSelectedTranslations] = useState<string[]>([]);
  const [excludedGenres, setExcludedGenres] = useState<string[]>([]);
  
  // Handle genre toggle (include, exclude, none)
  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      // First click already happened, now exclude it
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
      setExcludedGenres([...excludedGenres, genre]);
    } else if (excludedGenres.includes(genre)) {
      // Was excluded, now remove it from both arrays
      setExcludedGenres(excludedGenres.filter(g => g !== genre));
    } else {
      // Not selected at all, now include it
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Filter helper function
  const filterItems = (items: string[], search: string) => {
    return search 
      ? items.filter(item => item.toLowerCase().includes(search.toLowerCase())) 
      : items;
  };

  // Reset all filters
  const resetAllFilters = () => {
    setSelectedGenres([]);
    setExcludedGenres([]);
    setStatusFilters([]);
    setSelectedTypes([]);
    setSelectedAuthors([]);
    setSelectedArtists([]);
    setSelectedLanguages([]);
    setSelectedTranslations([]);
    setSort("popular");
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-2">
        {/* Manga Type Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Type
              {selectedTypes.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                  {selectedTypes.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="start">
            <div className="p-4 space-y-4">
              <Input 
                placeholder="Search types..." 
                value={typeSearch} 
                onChange={(e) => setTypeSearch(e.target.value)}
                className="mb-2"
              />
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {filterItems(mangaTypes, typeSearch).map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`type-${type}`} 
                        checked={selectedTypes.includes(type)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTypes([...selectedTypes, type]);
                          } else {
                            setSelectedTypes(selectedTypes.filter(t => t !== type));
                          }
                        }}
                      />
                      <label 
                        htmlFor={`type-${type}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>

        {/* Sort Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Sort by
              {sort !== "popular" && (
                <span className="ml-1 rounded-full bg-primary w-2 h-2"></span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="start">
            <div className="p-4 space-y-4">
              <Input 
                placeholder="Search sorting options..." 
                value={sortSearch} 
                onChange={(e) => setSortSearch(e.target.value)}
                className="mb-2"
              />
              <ScrollArea className="h-[300px] pr-4">
                <RadioGroup value={sort} onValueChange={setSort} className="space-y-2">
                  <div className="space-y-2">
                    {filterItems([...sortOptions, "popular", "updated", "newest", "oldest", "a-z", "z-a"], sortSearch).map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.toLowerCase().replace(/\s+/g, '-')} id={`sort-${option}`} />
                        <label 
                          htmlFor={`sort-${option}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>

        {/* Status Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Status
              {statusFilters.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                  {statusFilters.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <div className="p-4 space-y-2">
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`status-${status}`} 
                    checked={statusFilters.includes(status)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setStatusFilters([...statusFilters, status]);
                      } else {
                        setStatusFilters(statusFilters.filter(s => s !== status));
                      }
                    }}
                  />
                  <label 
                    htmlFor={`status-${status}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {status}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Genres Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Genres
              {(selectedGenres.length > 0 || excludedGenres.length > 0) && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                  {selectedGenres.length + excludedGenres.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <div className="p-4 space-y-4">
              <Input 
                placeholder="Search genres..." 
                value={genreSearch} 
                onChange={(e) => setGenreSearch(e.target.value)}
                className="mb-2"
              />
              <ScrollArea className="h-[300px]">
                <div className="grid grid-cols-2 gap-2">
                  {filterItems(allGenres, genreSearch).map((genre) => (
                    <Button 
                      key={genre} 
                      variant="outline"
                      size="sm"
                      className={cn(
                        "justify-start text-left font-normal",
                        selectedGenres.includes(genre) 
                          ? "bg-green-500/20 border-green-500 text-green-500" 
                          : excludedGenres.includes(genre)
                            ? "bg-red-500/20 border-red-500 text-red-500"
                            : ""
                      )}
                      onClick={() => handleGenreToggle(genre)}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>

        {/* Authors Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Authors
              {selectedAuthors.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                  {selectedAuthors.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-4" align="start">
            <div className="flex flex-col space-y-2">
              <Input 
                placeholder="Search authors..." 
                value={authorSearch} 
                onChange={(e) => setAuthorSearch(e.target.value)}
                className="mb-2"
              />
              {authorSearch && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    if (authorSearch.trim() && !selectedAuthors.includes(authorSearch.trim())) {
                      setSelectedAuthors([...selectedAuthors, authorSearch.trim()]);
                      setAuthorSearch("");
                    }
                  }}
                >
                  Add "{authorSearch}"
                </Button>
              )}
              {selectedAuthors.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium">Selected Authors:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedAuthors.map(author => (
                      <div key={author} className="flex items-center bg-accent rounded-full pl-3 pr-1 py-1">
                        <span className="text-xs mr-1">{author}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-5 w-5 p-0 rounded-full"
                          onClick={() => setSelectedAuthors(selectedAuthors.filter(a => a !== author))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Artists Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Artists
              {selectedArtists.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                  {selectedArtists.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-4" align="start">
            <div className="flex flex-col space-y-2">
              <Input 
                placeholder="Search artists..." 
                value={artistSearch} 
                onChange={(e) => setArtistSearch(e.target.value)}
                className="mb-2"
              />
              {artistSearch && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    if (artistSearch.trim() && !selectedArtists.includes(artistSearch.trim())) {
                      setSelectedArtists([...selectedArtists, artistSearch.trim()]);
                      setArtistSearch("");
                    }
                  }}
                >
                  Add "{artistSearch}"
                </Button>
              )}
              {selectedArtists.length > 0 && (
                <div className="mt-2 space-y-1">
                  <p className="text-sm font-medium">Selected Artists:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedArtists.map(artist => (
                      <div key={artist} className="flex items-center bg-accent rounded-full pl-3 pr-1 py-1">
                        <span className="text-xs mr-1">{artist}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-5 w-5 p-0 rounded-full"
                          onClick={() => setSelectedArtists(selectedArtists.filter(a => a !== artist))}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Original Languages Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Original Languages
              {selectedLanguages.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                  {selectedLanguages.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="start">
            <ScrollArea className="h-[300px]">
              <div className="p-4 space-y-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`lang-${language}`} 
                      checked={selectedLanguages.includes(language)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedLanguages([...selectedLanguages, language]);
                        } else {
                          setSelectedLanguages(selectedLanguages.filter(l => l !== language));
                        }
                      }}
                    />
                    <label 
                      htmlFor={`lang-${language}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {/* Translated Chapters Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              Translated Chapters
              {selectedTranslations.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-white">
                  {selectedTranslations.length}
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0" align="start">
            <ScrollArea className="h-[300px]">
              <div className="p-4 space-y-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`trans-${language}`} 
                      checked={selectedTranslations.includes(language)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTranslations([...selectedTranslations, language]);
                        } else {
                          setSelectedTranslations(selectedTranslations.filter(l => l !== language));
                        }
                      }}
                    />
                    <label 
                      htmlFor={`trans-${language}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>

        {/* Reset All Filters */}
        <Button 
          variant="ghost"
          onClick={resetAllFilters}
          className="ml-auto"
        >
          Reset Filters
        </Button>
      </div>

      {/* Display Active Filters */}
      {(selectedGenres.length > 0 || excludedGenres.length > 0 || statusFilters.length > 0 || 
        selectedTypes.length > 0 || selectedAuthors.length > 0 || selectedArtists.length > 0 || 
        selectedLanguages.length > 0 || selectedTranslations.length > 0) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedGenres.map(genre => (
            <div key={`include-${genre}`} className="flex items-center bg-green-500/20 border border-green-500 text-green-500 rounded-full pl-2 pr-1 py-0.5">
              <span className="text-xs mr-1">+{genre}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 rounded-full text-green-500 hover:bg-green-500/10"
                onClick={() => setSelectedGenres(selectedGenres.filter(g => g !== genre))}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          
          {excludedGenres.map(genre => (
            <div key={`exclude-${genre}`} className="flex items-center bg-red-500/20 border border-red-500 text-red-500 rounded-full pl-2 pr-1 py-0.5">
              <span className="text-xs mr-1">-{genre}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 rounded-full text-red-500 hover:bg-red-500/10"
                onClick={() => setExcludedGenres(excludedGenres.filter(g => g !== genre))}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          
          {/* Add tags for other selected filters */}
        </div>
      )}
    </div>
  );
}
