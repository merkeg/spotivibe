import axios from "axios";
import { Song } from "./Song";

export default class PlaylistService {
  static async getPlaylists(): Promise<Playlist[] | null> {
    try {
      const req = await axios.request({ url: "/api/playlists", method: "get" });
      return req.data;
    } catch (error) {
      return null;
    }
  }
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  image_url: string;
  snapshot_id: string;
  last_fetch: string;
  songs: Song[];
}
