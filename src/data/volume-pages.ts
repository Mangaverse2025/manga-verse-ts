
// This file contains the data for volume pages

export interface Volume {
  id: string;
  number: string;
  title: string;
  coverImage: string;
  releaseDate: string;
  mangaId: string;
}

export interface Volumes {
  [mangaId: string]: Volume[];
}

// Sample volumes data
export const volumes: Volumes = {
  "m1": [
    {
      id: "v1",
      number: "1",
      title: "Volume 1",
      coverImage: "https://placekitten.com/400/600",
      releaseDate: "2023-01-15",
      mangaId: "m1"
    },
    {
      id: "v2",
      number: "2",
      title: "Volume 2", 
      coverImage: "https://placekitten.com/401/600",
      releaseDate: "2023-03-20",
      mangaId: "m1"
    },
    {
      id: "v3",
      number: "3",
      title: "Volume 3",
      coverImage: "https://placekitten.com/402/600",
      releaseDate: "2023-06-10",
      mangaId: "m1"
    }
  ],
  "m2": [
    {
      id: "v1",
      number: "1",
      title: "Volume 1",
      coverImage: "https://placekitten.com/403/600",
      releaseDate: "2022-11-05",
      mangaId: "m2"
    },
    {
      id: "v2",
      number: "2",
      title: "Volume 2",
      coverImage: "https://placekitten.com/404/600",
      releaseDate: "2023-02-15",
      mangaId: "m2"
    }
  ]
};

// Function to get volumes by manga ID
export const getVolumesByMangaId = (mangaId: string): Volume[] => {
  return volumes[mangaId] || [];
};

// Function to get volume by ID
export const getVolumeById = (mangaId: string, volumeId: string): Volume | undefined => {
  const mangaVolumes = volumes[mangaId] || [];
  return mangaVolumes.find(volume => volume.id === volumeId);
};
