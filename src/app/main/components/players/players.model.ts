export class Player {
  Name: string;
  Team: string;
  Team_name: string;
  Team_city: string;
  Position: string;
  arrest_count: number;

  constructor(
    Name: string,
    Team: string,
    Team_name: string,
    Team_city: string,
    Position: string,
    arrest_count: number,
  ) {
    this.Name = Name;
    this.Team = Team;
    this.Team_name = Team_name;
    this.Team_city = Team_city;
    this.Position = Position;
    this.arrest_count = arrest_count;
  }
}
