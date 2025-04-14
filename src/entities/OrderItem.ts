import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Grocery } from "./Grocery";
import { Order } from "./Order";

@Entity()
export class OrderItem {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Order)
  order!: Order;

  @ManyToOne(() => Grocery)
  grocery!: Grocery;

  @Property()
  quantity!: number;

  @Property()
  price!: number;
}
