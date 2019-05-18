import { Bar } from "./Bar";

export class Trip {
  public id: string;
  public bars: Bar[];

  public constructor(id: string, bars: Bar[] = []) {
    this.id = id;
    this.bars = bars;
  }

  public addBar(bar: Bar) {
    this.bars.push(bar);
    return this;
  }

  public removeBar(id: string) {
    const idx = this.bars.findIndex(x => x.id === id);
    this.bars.splice(idx, 1);
    return this;
  }

  public toJSON() {
    return {
      id: this.id,
      bars: this.bars
    };
  }
}
