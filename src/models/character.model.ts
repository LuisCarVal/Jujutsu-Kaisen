import { ICharacter, ICurse, ISorcerer } from "../interfaces/character.interface";
import { UUID } from "../types/common.type";
import {v4 as uuid} from "uuid";
export abstract class Character implements ICharacter {
  #id: string;
  #name: string;
  #description: string;
  #abilities: string[];
  #domainExpansion?: string;
  #image: string;

  constructor(character: ICharacter) {
    this.id = character.id || uuid();
    this.name = character.name;
    this.description = character.description;
    this.abilities = character.abilities;
    this.domainExpansion = character.domainExpansion;
    this.image = character.image;
  }

  // Getters
  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  get abilities(): string[] {
    return this.#abilities;
  }

  get domainExpansion(): string | undefined {
    return this.#domainExpansion;
  }

  get image(): string {
    return this.#image;
  }
  get id():string{
    return this.#id;
  }

  // Setters
  set id(id:UUID){
    this.#id= id;
  }
  set name(name: string) {
    this.#name = name;
  }

  set description(description: string) {
    this.#description = description;
  }

  set abilities(abilities: string[]) {
    this.#abilities = abilities;
  }

  set domainExpansion(domainExpansion: string | undefined) {
    this.#domainExpansion = domainExpansion;
  }

  set image(image: string) {
    this.#image = image;
  }

  // Method to serialize the object to JSON
  toJSON(): ICharacter {
    return {
      id: this.#id,
      name: this.#name,
      description: this.#description,
      abilities: this.#abilities,
      domainExpansion: this.#domainExpansion,
      image: this.#image,
    };
  }
}
