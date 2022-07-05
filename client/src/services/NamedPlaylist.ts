import axios from "axios";
import { Playlist } from "./Playlist";

export default class NamedPlaylistService {
  static async createNewNamedPlaylist(data: NewNamedPlaylistRequest): Promise<null> {
    try {
      const req = await axios.request({ url: "/api/named-playlists", method: "post", data: data });
      return req.data;
    } catch (error) {
      return null;
    }
  }

  static async getNamedPlaylists(): Promise<NamedPlaylist[] | null> {
    try {
      const req = await axios.request({ url: "/api/named-playlists", method: "get" });
      return req.data;
    } catch (error) {
      return null;
    }
  }
}

export interface NewNamedPlaylistRequest {
  color: string;
  name: string;
  basePlaylistId?: string;
}

export interface NamedPlaylist {
  id: string;
  color: string;
  name: string;
  playlist: Playlist;
}
