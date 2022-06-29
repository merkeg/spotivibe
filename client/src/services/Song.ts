export interface Song {
  id: string;
  name: string;
  preview_url: string;
  image_url: string;
  uri: string;
  release_date: string;
  explicit: boolean;
  duration_ms: number;
  artists: Artist[];
}

export interface Artist {
  id: string;
  name: string;
}
