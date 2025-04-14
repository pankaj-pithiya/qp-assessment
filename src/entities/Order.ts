import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from "@mikro-orm/core";
import { User } from "./User";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  user!: User;

  @OneToMany(() => OrderItem, item => item.order)
  items = new Array<OrderItem>();

  @Property()
  createdAt: Date = new Date();
}
