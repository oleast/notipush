import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

import { Notification } from './Notification';
import { User } from './User';

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

  @ManyToMany((type) => User, (user) => user.channels)
  @JoinTable()
  public subscribers: User[];

  @OneToMany((type) => Notification, (noti) => noti.channel)
  public notifications: Notification[];
}
