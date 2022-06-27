import { ApiProperty } from "@nestjs/swagger";
import { Song } from "src/songs/Song";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Playlist {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  image_url: string;

  @ApiProperty()
  @Column()
  snapshot_id: string;

  @ApiProperty()
  @Column()
  last_fetch: Date;

  @ApiProperty({ type: [Song] })
  @ManyToMany(() => Song, { cascade: true })
  @JoinTable()
  songs: Song[];
}
