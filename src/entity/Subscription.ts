import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Channel } from './Channel'
import { User } from './User';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'text',
    unique: true,
  })
  public endpoint: string;

  @ManyToOne((type) => User, (user) => user.subscriptions)
  public user: User;

  @ManyToMany((type) => Channel, (channel) => channel.subscribers)
  public channels: Channel[];
}
