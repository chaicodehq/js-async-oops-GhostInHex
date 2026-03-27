/**
 * 🏏 Cricket Academy Management - Inheritance: extends & super
 */
export class Player {
  constructor(name, age, team) {
    this.name = name;
    this.age = age;
    this.team = team;
    this.trainingHours = 0;
  }

  getProfile() {
    return {
      name: this.name,
      age: this.age,
      team: this.team,
      role: "player",
      trainingHours: this.trainingHours,
    };
  }

  train(hours) {
    if (hours <= 0) return -1;
    this.trainingHours += hours;
    return this.trainingHours;
  }

  getTrainingHours() {
    return this.trainingHours;
  }
}

export class Batsman extends Player {
  constructor(name, age, team, battingStyle) {
    super(name, age, team);
    this.battingStyle = battingStyle;
    this.innings = [];
  }

  playInnings(runs, balls) {
    if (runs < 0 || balls <= 0) return null;
    const strikeRate = (runs / balls) * 100;
    const inning = { runs, balls, strikeRate };
    this.innings.push(inning);
    return inning;
  }

  getStrikeRate() {
    if (this.innings.length === 0) return 0;
    const total = this.innings.reduce((sum, i) => sum + i.strikeRate, 0);
    return total / this.innings.length;
  }

  getProfile() {
    return {
      ...super.getProfile(),
      battingStyle: this.battingStyle,
      role: "batsman",
      totalRuns: this.innings.reduce((sum, i) => sum + i.runs, 0),
      inningsPlayed: this.innings.length,
    };
  }
}

export class Bowler extends Player {
  constructor(name, age, team, bowlingStyle) {
    super(name, age, team);
    this.bowlingStyle = bowlingStyle;
    this.spells = [];
  }

  bowlSpell(wickets, runsConceded, overs) {
    if (wickets < 0 || runsConceded < 0 || overs <= 0) return null;
    const economy = runsConceded / overs;
    const spell = { wickets, runsConceded, overs, economy };
    this.spells.push(spell);
    return spell;
  }

  getEconomy() {
    if (this.spells.length === 0) return 0;
    const total = this.spells.reduce((sum, s) => sum + s.economy, 0);
    return total / this.spells.length;
  }

  getProfile() {
    return {
      ...super.getProfile(),
      bowlingStyle: this.bowlingStyle,
      role: "bowler",
      totalWickets: this.spells.reduce((sum, s) => sum + s.wickets, 0),
      spellsBowled: this.spells.length,
    };
  }
}

export class AllRounder extends Player {
  constructor(name, age, team, battingStyle, bowlingStyle) {
    super(name, age, team);
    this.battingStyle = battingStyle;
    this.bowlingStyle = bowlingStyle;
    this.innings = [];
    this.spells = [];
  }

  playInnings(runs, balls) {
    if (runs < 0 || balls <= 0) return null;
    const strikeRate = (runs / balls) * 100;
    const inning = { runs, balls, strikeRate };
    this.innings.push(inning);
    return inning;
  }

  bowlSpell(wickets, runsConceded, overs) {
    if (wickets < 0 || runsConceded < 0 || overs <= 0) return null;
    const economy = runsConceded / overs;
    const spell = { wickets, runsConceded, overs, economy };
    this.spells.push(spell);
    return spell;
  }

  getStrikeRate() {
    if (this.innings.length === 0) return 0;
    const total = this.innings.reduce((sum, i) => sum + i.strikeRate, 0);
    return total / this.innings.length;
  }

  getEconomy() {
    if (this.spells.length === 0) return 0;
    const total = this.spells.reduce((sum, s) => sum + s.economy, 0);
    return total / this.spells.length;
  }

  getProfile() {
    return {
      ...super.getProfile(),
      battingStyle: this.battingStyle,
      bowlingStyle: this.bowlingStyle,
      role: "allrounder",
      totalRuns: this.innings.reduce((sum, i) => sum + i.runs, 0),
      totalWickets: this.spells.reduce((sum, s) => sum + s.wickets, 0),
      inningsPlayed: this.innings.length,
      spellsBowled: this.spells.length,
    };
  }
}
