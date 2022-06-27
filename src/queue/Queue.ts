import { Song } from "src/songs/Song";

export class Queue {
  songs: Song[];
  excluded: Song[];

  get(amount: number): Song[] {
    const items: Song[] = [];
    if (this.songs.length == 0) {
      return items;
    }

    while (items.length < amount) {
      const song = this.songs.pop();
      if (!this.excluded.includes(song)) {
        items.push(song);
      }
    }
    return items;
  }

  shuffle() {
    for (let i = this.songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]];
    }
  }
}
