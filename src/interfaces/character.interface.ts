import { UUID } from "../types/common.type";

export interface ICharacter{
    id:UUID;
    name: string;
    description: string;
    abilities: string[];
    domainExpansion?: string;
    image: string;
}
export interface ICurse extends ICharacter {
    type: 'curse';
}

export interface ISorcerer extends ICharacter {
    type: 'sorcerer';
}