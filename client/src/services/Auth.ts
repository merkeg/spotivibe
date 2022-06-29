import axios from "axios";

export default class Auth {
  static async getProfile(): Promise<ProfileResponse | null> {
    try {
      const req = await axios.request({ url: "/api/auth/profile", method: "get" });
      return req.data;
    } catch (error) {
      return null;
    }
  }
}

export interface ProfileResponse {
  id: string;
  email: string;
  photo: string;
}
