import { ICharacter, ICurse, ISorcerer } from "../interfaces/character.interface";
import {CharacterView} from "./character.view"
import { CharacterCard } from "./templates/character-card.template";
export class CharacterListView extends CharacterView{
    #cardLayout = document.querySelector("#root") as HTMLDivElement;
    show(characters: ICharacter[] , callbackRemove, callbackUpdate): void{
        this.#cardLayout.innerHTML= "";
        for (const character of characters) {
            const card = new CharacterCard();
            this.#cardLayout.appendChild(card.render(character , callbackRemove, callbackUpdate))
        }
    }
    remove(id: string){
        this.#cardLayout.querySelector(`[data-id="${id}"]`).remove();
    }
    
    create(character: ICharacter, callbackRemove , callbackUpdate){
        const card = new CharacterCard();
        this.#cardLayout.appendChild(card.render(character, callbackRemove, callbackUpdate))
    }
    update(character: ICurse | ISorcerer, callbackRemove, callbackUpdate): void {
        this.remove(character.id);
        this.create(character, callbackRemove, callbackUpdate);
    }
}