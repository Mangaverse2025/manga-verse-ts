
// This file contains the data for chapter pages

export interface ChapterPage {
  id: string;
  url: string;
}

export interface ChapterPages {
  [chapterId: string]: ChapterPage[];
}

// Sample chapter pages data
export const chapterPages: ChapterPages = {
  "c1": [
    { id: "p1", url: "https://placekitten.com/800/1200" },
    { id: "p2", url: "https://placekitten.com/800/1201" },
    { id: "p3", url: "https://placekitten.com/800/1202" },
    { id: "p4", url: "https://placekitten.com/800/1203" },
    { id: "p5", url: "https://placekitten.com/800/1204" },
  ],
  "c2": [
    { id: "p1", url: "https://placekitten.com/800/1205" },
    { id: "p2", url: "https://placekitten.com/800/1206" },
    { id: "p3", url: "https://placekitten.com/800/1207" },
    { id: "p4", url: "https://placekitten.com/800/1208" },
    { id: "p5", url: "https://placekitten.com/800/1209" },
  ],
  "c3": [
    { id: "p1", url: "https://placekitten.com/800/1210" },
    { id: "p2", url: "https://placekitten.com/800/1211" },
    { id: "p3", url: "https://placekitten.com/800/1212" },
    { id: "p4", url: "https://placekitten.com/800/1213" },
    { id: "p5", url: "https://placekitten.com/800/1214" },
  ],
};

// Function to get chapter pages by chapter ID
export const getChapterPagesById = (chapterId: string): ChapterPage[] => {
  return chapterPages[chapterId] || [];
};
