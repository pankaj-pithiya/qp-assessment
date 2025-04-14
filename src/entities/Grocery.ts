import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Grocery {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  price!: number;

  @Property()
  inventory!: number;
}
