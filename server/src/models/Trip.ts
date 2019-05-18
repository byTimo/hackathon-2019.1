import { Bar } from "./Bar";

export class Trip {
  public id: string;
  public bars: Map<string, Bar> = new Map();

  public constructor(id: string) {
    this.id = id;
  }

  public addBar(bar: Bar) {
    this.bars.set(bar.id, bar);
    return this;
  }

  public removeBar(id: string) {
    this.removeBar(id);
    return this;
  }
}
