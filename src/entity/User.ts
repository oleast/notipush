import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany((type) => Subscription, (sub) => sub.user)
  public subscriptions: Subscription[];

  @ManyToMany((type) => Notification, (noti) => noti.users)
  public notifications: Notification[];
}
