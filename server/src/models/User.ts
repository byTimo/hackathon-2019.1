import { Gender } from "./Gender";
import { GeoPosition } from "./GeoPosition";
import { Omit } from "../../utils/Types";

export class User {
  public id: string;

  public name: string;

  /** Вес в кг */
  public weight: number;

  public height: number;

  public gender: Gender;

  public position: GeoPosition = { latitude: 0, longitude: 0 };

  public constructor({
    id,
    name,
    weight,
    height,
    gender
  }: Pick<User, "id" | "name" | "weight" | "height" | "gender">) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.gender = gender;
  }

  public setPosition(position: GeoPosition) {
    this.position = position;
    return this;
  }
}
