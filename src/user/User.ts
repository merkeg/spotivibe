import { NamedPlaylist } from "src/named/NamedPlaylist";
import { Playlist } from "src/playlists/Playlist";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  photo: string;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @Column()
  product: string;

  @ManyToMany(() => Playlist, { cascade: true })
  @JoinTable()
  playlists: Playlist[];

  @OneToMany(() => NamedPlaylist, (playlist) => playlist.owner, { cascade: true })
  namedPlaylists: NamedPlaylist[];
}
