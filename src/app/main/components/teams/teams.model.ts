export class Team {
  Team: string;
  Team_preffered_name: string;
  Team_name: string;
  Team_city: string;
  Team_Conference: string;
  Team_Conference_Division: string;
  Team_logo_id: string;
  arrest_count: number;

  constructor(
    Team: string,
    Team_preffered_name: string,
    Team_name: string,
    Team_city: string,
    Team_Conference: string,
    Team_Conference_Division: string,
    Team_logo_id: string,
    arrest_count: number,
  ) {
    this.Team = Team;
    this.Team_preffered_name = Team_preffered_name;
    this.Team_name = Team_name;
    this.Team_city = Team_city;
    this.Team_Conference = Team_Conference;
    this.Team_Conference_Division = Team_Conference_Division;
    this.Team_logo_id = Team_logo_id;
    this.arrest_count = arrest_count;
  }
}
