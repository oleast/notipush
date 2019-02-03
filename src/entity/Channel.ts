import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

import { Notification } from './Notification';
import { Subscription } from './Subscription';

export interface ICreateChannel {
  name: string;
  description: string;
}

@Entity()
export class Channel {
  @PrimaryColumn('character varying')
  public name: string;

  @Column({ type: 'text', unique: true })
  public description: string;

  @ManyToMany((type) => Subscription, (sub) => sub.channels)
  @JoinTable()
  public subscribers: Subscription[];

  @OneToMany((type) => Notification, (noti) => noti.channel)
  public notifications: Notification[];
}
