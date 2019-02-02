import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
}
