import axios from "axios";
import { Artist } from "./Song";

export default class Queue {
  static async requestQueue(): Promise<Artist[] | null> {
    try {
      const req = await axios.request({ url: "/api/queue", method: "get" });
      return req.data;
    } catch (error) {
      return null;
    }
  }
}
