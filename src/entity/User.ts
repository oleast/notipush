import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}
