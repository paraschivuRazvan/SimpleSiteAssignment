export class Crime {
  Category: string;
  arrest_count: number;

  constructor(
    Category: string,
    arrest_count: number
  ) {
    this.Category = Category;
    this.arrest_count = arrest_count;
  }
}
