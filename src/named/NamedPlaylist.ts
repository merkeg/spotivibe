import { ApiProperty } from "@nestjs/swagger";
import { Playlist } from "src/playlists/Playlist";
import { User } from "src/user/User";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "named_playlist" })
export class NamedPlaylist {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  color: string;

  @ApiProperty()
  @OneToOne(() => Playlist)
  @JoinColumn()
  playlist: Playlist;

  @ManyToOne(() => User, (user) => user.namedPlaylists)
  owner: User;
}
