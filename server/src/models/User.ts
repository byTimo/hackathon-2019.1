import {Gender} from "./Gender";

export class User {
    public id: string;

    public name: string;

    /** Вес в кг */
    public weight: number;

    public height: number;

    public gender: Gender;

    public constructor({
                           id,
                           name,
                           weight,
                           height,
                           gender,
                       }: User) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
    }
}
