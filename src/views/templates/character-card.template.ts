import {ICharacter} from "../../interfaces/character.interface"
import { UUID } from "../../types/common.type";
export class CharacterCard{
    #card: HTMLElement;
    constructor(){}
    render= (character: ICharacter  , callbackRemove, callbackUpdate) =>{
        this.#card = document.createElement('form');
        this.#card.dataset.id = character.id;
        this.#card.innerHTML = `
        <div class="flex gap-6 bg-black text-white p-4 rounded-lg shadow-lg w-[100%]  ">
            <div class="justify-center items-center border-2 border-yellow-400 rounded-sm  w-60 h-60">
                <img src="assets/img/${character.image}" alt="Image of ${character.name}" class="w-full h-full object-cover ">
            </div>
            <div class="flex flex-col justify-evenly flex-1">
                <h2 class="text-xl font-bold">${character.name}</h2>
                <p class="text-sm text-gray-300 mt-1"><strong>Description:</strong> ${character.description}</p>
                <p class="text-sm text-gray-300 mt-1"><strong>Domain Expansion:</strong> ${character.domainExpansion}</p>
                <p class="text-sm text-gray-300 mt-1"><strong>Abilities:</strong> ${character.abilities.join(", ")}</p>

                <div class="flex gap-4 mt-4">
                    <button class="btn-update bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2" data-operation="update">
                        <i class="fa-solid fa-pencil"></i> Update
                    </button>
                    <button class="btn-delete bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2" data-operation="remove">
                        <i class="fa-solid fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
        `;
        this.#bindButtons(character.id, callbackRemove, callbackUpdate);
        return this.#card;
    }
    #bindButtons(id: UUID, callbackRemove, callbackUpdate) {
        const update = this.#card.querySelector('[data-operation="update"]');
        const remove = this.#card.querySelector('[data-operation="remove"]');

        update.addEventListener('click', (e) => {
            e.preventDefault();
            callbackUpdate(id);
        });
        remove.addEventListener('click', (e) => {
            e.preventDefault();
            callbackRemove(id);
        });
    }
}