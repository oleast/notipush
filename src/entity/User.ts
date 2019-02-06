import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Channel } from './Channel';
import { Notification } from './Notification';
import { Subscription } from './Subscription';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({
    type: 'character varying',
    unique: true,
  })
  public userId: string;

  @ManyToMany((type) => Channel, (channel) => channel.subscribers)
  public channels: Channel[];

  @OneToMany((type) => Subscription, (sub) => sub.user)
  public subscriptions: Subscription[];

  @ManyToMany((type) => Notification, (noti) => noti.users)
  public notifications: Notification[];
}
