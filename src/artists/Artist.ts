import { ApiProperty } from '@nestjs/swagger';
import { Song } from 'src/songs/Song';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Artist {
  @ApiProperty()
  @PrimaryColumn()
  id: string;

  @ApiProperty()
  @Column()
  name: string;
}
