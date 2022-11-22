import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      amount: getRandomInt(1, 10),
      type_: this._archetype.energyType,
    };
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return {
      type_: this._energy.type_,
      amount: this._energy.amount,
    };
  }

  receiveDamage(attackPoins: number): number {
    const damage = attackPoins - this._defense;
    const newLifePoints = damage > 0 
      ? this._lifePoints - damage : this._lifePoints - 1;
    const newLife = newLifePoints <= 0 
      ? this._lifePoints = -1 : this._lifePoints;
    return newLife;
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    const life = this._maxLifePoints + getRandomInt(1, 10);
    this._maxLifePoints = life > this.race.maxLifePoints 
      ? this.race.maxLifePoints : life; 
    this._defense += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._energy.amount = 10;
    this._lifePoints = this._maxLifePoints;
  }

  special(enemy: Fighter): void {
    const specialNumber = getRandomInt(1, 10);
    const damage = this._strength - enemy.defense;
    if (damage > specialNumber) {
      const specialDamage = specialNumber * 2;
      enemy.receiveDamage(specialDamage);
    }
  }
}