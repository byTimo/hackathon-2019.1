export class User {
  public id: string;

  public name: string;

  /** Вес в кг */
  public weight: number;

  public gender: Gender;

  public birthDate: Date;

  public geoPosition: GeoPosition;

  public constructor({
    id,
    name,
    weight,
    gender,
    birthDate,
    geoPosition
  }: User) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.gender = gender;
    this.birthDate = birthDate;
    this.geoPosition = geoPosition;
  }
}
