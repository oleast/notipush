import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column('text')
  public text: string;

  @ManyToMany((type) => Category, {
    cascade: true,
  })
  @JoinTable()
  public categories: Category[];
}
