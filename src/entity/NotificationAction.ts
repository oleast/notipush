import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Notification } from './Notification'

export interface ICreateAction {
  action: string;
  title: string;
  icon?: string;
}

@Entity()
export class NotificationAction {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  public action: string;

  @Column({
    type: 'character varying',
    nullable: false,
  })
  public title: string;

  @Column('text')
  public icon: string;

  @OneToMany((type) => Notification, (noti) => noti.actions)
  public notification: Notification;
}
