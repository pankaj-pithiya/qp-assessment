import { Entity, PrimaryKey, Property, Enum, OneToMany } from "@mikro-orm/core";
import { Order } from "./Order";

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Enum(() => Role)
  role: Role = Role.USER;

  @OneToMany(() => Order, order => order.user)
  orders: Order[] = [];
}
