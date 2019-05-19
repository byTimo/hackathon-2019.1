export enum Gender {
    Male,
    Female
}

export interface UserInfo {
    name: string;
    gender: Gender;
    weight: number,
    height: number
}