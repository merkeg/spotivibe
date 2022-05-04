import { ApiProperty } from "@nestjs/swagger";
import { Artist } from "src/artists/Artist";
import { Playlist } from "src/playlists/Playlist";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Song {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  preview_url: string;

  @ApiProperty()
  @Column()
  image_url: string;

  @ApiProperty()
  @Column()
  uri: string;

  @ApiProperty()
  @Column()
  release_date: Date;

  @ApiProperty()
  @Column()
  explicit: boolean;

  @ApiProperty()
  @Column()
  duration_ms: number;

  @ApiProperty({ type: [Artist] })
  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable()
  artists: Artist[];
}
