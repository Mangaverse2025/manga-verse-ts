
export interface Manga {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  author: string;
  artist?: string;
  status: "Ongoing" | "Completed" | "Hiatus";
  genres: string[];
  tags: string[];
  rating: number;
  releaseYear: number;
  lastUpdated: string;
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  releaseDate: string;
  readStatus?: "read" | "unread";
  pages?: string[];
}

// Mock manga data
export const popularManga: Manga[] = [
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    coverImage: "https://source.unsplash.com/random/300x450/?manga,anime",
    description: "Tanjiro Kamado's life changed when his family was slaughtered by demons, with only his sister Nezuko surviving but transformed into a demon. Determined to avenge his family and cure his sister, Tanjiro embarks on a journey to become a Demon Slayer.",
    author: "Koyoharu Gotouge",
    status: "Completed",
    genres: ["Action", "Fantasy", "Historical"],
    tags: ["Demons", "Supernatural", "Swordplay"],
    rating: 4.8,
    releaseYear: 2016,
    lastUpdated: "2020-05-18"
  },
  {
    id: "one-piece",
    title: "One Piece",
    coverImage: "https://source.unsplash.com/random/300x450/?pirate,manga",
    description: "Monkey D. Luffy sets off on a journey to find the mythical treasure One Piece and become the Pirate King. Along the way, he recruits a diverse crew of pirates and faces numerous rivals and enemies.",
    author: "Eiichiro Oda",
    status: "Ongoing",
    genres: ["Adventure", "Fantasy", "Comedy"],
    tags: ["Pirates", "Superpowers", "Treasure Hunt"],
    rating: 4.9,
    releaseYear: 1997,
    lastUpdated: "2023-04-11"
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    coverImage: "https://source.unsplash.com/random/300x450/?dark,fantasy",
    description: "Yuji Itadori, an unnaturally fit high school student, joins his school's Occult Club to avoid the track team. When club members open a cursed object, Yuji swallows it to protect his friends, becoming host to a powerful Curse named Ryomen Sukuna.",
    author: "Gege Akutami",
    status: "Ongoing",
    genres: ["Action", "Supernatural", "Horror"],
    tags: ["Curses", "School Life", "Dark Fantasy"],
    rating: 4.7,
    releaseYear: 2018,
    lastUpdated: "2023-04-10"
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    coverImage: "https://source.unsplash.com/random/300x450/?horror,blood",
    description: "Denji is a young man trapped in poverty, working off his father's debt to the yakuza by harvesting demon corpses with his pet devil-dog Pochita. When the yakuza betray Denji and kill him, Pochita merges with his body, granting him the ability to transform into the Chainsaw Man.",
    author: "Tatsuki Fujimoto",
    status: "Ongoing",
    genres: ["Action", "Horror", "Supernatural"],
    tags: ["Demons", "Gore", "Anti-hero"],
    rating: 4.6,
    releaseYear: 2018,
    lastUpdated: "2023-04-05"
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    coverImage: "https://source.unsplash.com/random/300x450/?superhero",
    description: "In a world where most of the population has superpowers, or 'Quirks,' Izuku Midoriya is born without one. Still, he dreams of becoming a hero. After meeting his idol, the world's greatest hero All Might, Izuku's life changes forever.",
    author: "Kohei Horikoshi",
    status: "Ongoing",
    genres: ["Action", "Superhero", "School Life"],
    tags: ["Superpowers", "Coming of Age", "Friendship"],
    rating: 4.5,
    releaseYear: 2014,
    lastUpdated: "2023-04-08"
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    coverImage: "https://source.unsplash.com/random/300x450/?giant,wall",
    description: "Humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason. Eren Yeager vows to retake the world after a Titan brings about the destruction of his hometown and the death of his mother.",
    author: "Hajime Isayama",
    status: "Completed",
    genres: ["Action", "Dark Fantasy", "Post-Apocalyptic"],
    tags: ["Titans", "Mystery", "Military"],
    rating: 4.8,
    releaseYear: 2009,
    lastUpdated: "2021-04-09"
  }
];

export const recentlyUpdatedManga: Manga[] = [
  {
    id: "spy-x-family",
    title: "Spy x Family",
    coverImage: "https://source.unsplash.com/random/300x450/?family,spy",
    description: "Master spy Twilight is unparalleled at what he does when it comes to going undercover on dangerous missions for the betterment of the world. But when he receives the ultimate assignment—to get married and have a kid—he may finally be in over his head!",
    author: "Tatsuya Endo",
    status: "Ongoing",
    genres: ["Action", "Comedy", "Slice of Life"],
    tags: ["Spy", "Found Family", "Telepathy"],
    rating: 4.7,
    releaseYear: 2019,
    lastUpdated: "2023-04-11"
  },
  {
    id: "tokyo-revengers",
    title: "Tokyo Revengers",
    coverImage: "https://source.unsplash.com/random/300x450/?gang,japan",
    description: "Takemichi Hanagaki learns that his ex-girlfriend, Hinata Tachibana, has died. When he's shoved in front of a train, he time leaps 12 years into the past. Now he must aim to rise to the top of Kanto's most dangerous delinquent gang to save Hinata.",
    author: "Ken Wakui",
    status: "Ongoing",
    genres: ["Action", "Drama", "Supernatural"],
    tags: ["Time Travel", "Gangs", "Redemption"],
    rating: 4.5,
    releaseYear: 2017,
    lastUpdated: "2023-04-10"
  },
  {
    id: "blue-lock",
    title: "Blue Lock",
    coverImage: "https://source.unsplash.com/random/300x450/?soccer,sport",
    description: "After a disastrous defeat at the 2018 World Cup, Japan's team struggles to regroup. The Japanese Football Union hires enigmatic coach Jinpachi Ego, who creates a radical new training program called Blue Lock that isolates 300 elite high school strikers.",
    author: "Muneyuki Kaneshiro",
    artist: "Yusuke Nomura",
    status: "Ongoing",
    genres: ["Sports", "Psychological", "Drama"],
    tags: ["Soccer", "Competition", "Training"],
    rating: 4.6,
    releaseYear: 2018,
    lastUpdated: "2023-04-09"
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    coverImage: "https://source.unsplash.com/random/300x450/?game,fantasy",
    description: "In a world where hunters — humans who possess magical abilities — battle dangerous monsters to protect humanity, Sung Jinwoo is known as the 'World's Weakest Hunter.' One day, after a brutal encounter in a high-rank dungeon, he begins to develop unique abilities.",
    author: "Chugong",
    status: "Completed",
    genres: ["Action", "Adventure", "Fantasy"],
    tags: ["Level Up", "Game Elements", "Monsters"],
    rating: 4.8,
    releaseYear: 2016,
    lastUpdated: "2023-04-08"
  }
];

export const trendingManga: Manga[] = [
  {
    id: "kaiju-no-8",
    title: "Kaiju No. 8",
    coverImage: "https://source.unsplash.com/random/300x450/?monster,kaiju",
    description: "Kafka Hibino has always dreamed of joining the Defense Force to fight the kaiju (monsters) that raid Japan. Despite failing the exam multiple times, a chance encounter with a unique kaiju changes his life forever when he gains the ability to transform into Kaiju No. 8.",
    author: "Naoya Matsumoto",
    status: "Ongoing",
    genres: ["Action", "Sci-Fi", "Fantasy"],
    tags: ["Monsters", "Transformation", "Military"],
    rating: 4.7,
    releaseYear: 2020,
    lastUpdated: "2023-04-11"
  },
  {
    id: "hell-paradise",
    title: "Hell's Paradise: Jigokuraku",
    coverImage: "https://source.unsplash.com/random/300x450/?paradise,hell",
    description: "Gabimaru the Hollow, a ninja condemned to death, is offered the chance to win a pardon by finding the elixir of immortality on a supernatural island. He's joined by a squad of death row convicts and their executioners to explore this dangerous paradise.",
    author: "Yuji Kaku",
    status: "Completed",
    genres: ["Action", "Adventure", "Supernatural"],
    tags: ["Ninja", "Survival", "Gore"],
    rating: 4.6,
    releaseYear: 2018,
    lastUpdated: "2022-01-25"
  },
  {
    id: "dandadan",
    title: "Dandadan",
    coverImage: "https://source.unsplash.com/random/300x450/?alien,ghost",
    description: "High schooler Momo Ayase believes in ghosts but not aliens, while her classmate Okarun believes in aliens but not ghosts. When they decide to prove each other wrong, they end up witnessing supernatural phenomena that entangle them in an unlikely alliance.",
    author: "Yukinobu Tatsu",
    status: "Ongoing",
    genres: ["Supernatural", "Comedy", "Romance"],
    tags: ["Ghosts", "Aliens", "High School"],
    rating: 4.8,
    releaseYear: 2021,
    lastUpdated: "2023-04-10"
  }
];

export const demonSlayerChapters: Chapter[] = [
  {
    id: "ds-001",
    number: "1",
    title: "Cruelty",
    releaseDate: "2016-02-15",
    readStatus: "read",
    pages: Array(24).fill(0).map((_, i) => `https://mangadex.org/covers/26102334-1f7b-4a5b-a64f-107c5c24a70f/1690f164-78d6-45e6-9e41-392516cf0178.jpg.512.jpg${i+1}`)
  },
  {
    id: "ds-002",
    number: "2",
    title: "The Stranger",
    releaseDate: "2016-02-22",
    readStatus: "read",
    pages: Array(22).fill(0).map((_, i) => `https://mangadex.org/covers/26102334-1f7b-4a5b-a64f-107c5c24a70f/36aadca0-c9ab-473c-824d-035ab866bd2e.jpg.512.jpg${i+1}`)
  },
  {
    id: "ds-003",
    number: "3",
    title: "The Promise",
    releaseDate: "2016-02-29",
    readStatus: "unread",
    pages: Array(24).fill(0).map((_, i) => `https://mangadex.org/covers/26102334-1f7b-4a5b-a64f-107c5c24a70f/c5a839de-8fec-42ec-ab69-1f664b37f327.jpg.512.jpg${i+1}`)
  },
  {
    id: "ds-004",
    number: "4",
    title: "Final Selection",
    releaseDate: "2016-03-07",
    readStatus: "unread",
    pages: Array(25).fill(0).map((_, i) => `https://mangadex.org/covers/26102334-1f7b-4a5b-a64f-107c5c24a70f/7c4917a0-ba02-4359-81db-4868ba0c31c6.jpg.512.jpg${i+1}`)
  },
  {
    id: "ds-005",
    number: "5",
    title: "My Own Steel",
    releaseDate: "2016-03-14",
    readStatus: "unread",
    pages: Array(23).fill(0).map((_, i) => `https://mangadex.org/covers/26102334-1f7b-4a5b-a64f-107c5c24a70f/555832fe-36b4-417d-b89a-feae1fdda1eb.jpg.512.jpg${i+1}`)
  }
];

export function getMangaById(id: string): Manga | undefined {
  return [...popularManga, ...recentlyUpdatedManga, ...trendingManga].find(manga => manga.id === id);
}

export function getChaptersByMangaId(mangaId: string): Chapter[] {
  if (mangaId === "demon-slayer") {
    return demonSlayerChapters;
  }
  
  // Generate random chapters for other manga
  const numChapters = Math.floor(Math.random() * 10) + 5;
  return Array(numChapters).fill(0).map((_, i) => ({
    id: `${mangaId}-${i+1}`,
    number: `${i+1}`,
    title: `Chapter ${i+1}`,
    releaseDate: `2023-${Math.floor(Math.random() * 3) + 1}-${Math.floor(Math.random() * 28) + 1}`,
    readStatus: Math.random() > 0.7 ? "read" : "unread",
    pages: Array(Math.floor(Math.random() * 10) + 20).fill(0).map((_, j) => 
      `https://source.unsplash.com/random/800x1200/?manga,page${j+1}`)
  }));
}

export function getChapterById(mangaId: string, chapterId: string): Chapter | undefined {
  return getChaptersByMangaId(mangaId).find(chapter => chapter.id === chapterId);
}
