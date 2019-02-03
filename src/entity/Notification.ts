import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Channel } from './Channel';
import { ICreateAction, NotificationAction } from './NotificationAction';
import { User } from './User';

export interface ICreateNotification {
  sendTime: string;
  title: string;
  body: string;
  tag?: string;
  image?: string;
  icon?: string;
  requireInteraction?: boolean;
  renotify?: boolean;
  silent?: boolean;
  timestamp?: string;
  actions: ICreateAction[];

  /** Send to either users or a channel */
  users?: string[];
  channel?: string;
}

@Entity()
export class Notification {
  public static badge = 'https://beta.online.ntnu.no/static/owf-badge-128.png';
  /** This is some defualt found on the internet, replace with custom Online version? */
  public static vibrate = [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500];
  /** For future use, have not found sound to use yet. */
  public static sound = '';

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'timestamp with time zone', nullable: false })
  public sendTime: string;

  @Column({ type: 'boolean', default: false })
  public sent: boolean;

  @Column({ type: 'text', nullable: false })
  public title: string;

  @Column({ type: 'text', nullable: false })
  public body: string;

  @Column('text')
  public tag: string;

  @Column('text')
  public image: string;

  @Column({
    type: 'text',
    default: 'https://beta.online.ntnu.no/static/pwa-icon-v0-192.png',
  })
  public icon: string;

  @Column({ type: 'boolean', default: false })
  public requireInteraction: boolean;

  @Column({ type: 'boolean', default: false })
  public renotify: boolean;

  @Column({ type: 'boolean', default: false })
  public silent: boolean;

  /** When the notificationwas triggered */
  @Column('timestamp with time zone')
  public timestamp: string;

  @ManyToMany((type) => User, (user) => user.notifications)
  @JoinTable()
  public users: User[];

  @ManyToOne((type) => Channel, (channel) => channel.notifications)
  public channel: Channel;

  @ManyToOne((type) => NotificationAction, (action) => action.notification)
  public actions: NotificationAction[];
}
