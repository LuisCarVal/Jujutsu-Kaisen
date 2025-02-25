import {ICharacter, ICurse, ISorcerer} from "../interfaces/character.interface";
interface IButtons{
     createButton:HTMLSpanElement,
     updateButton:HTMLSpanElement,
}
interface IInputs{
     id:HTMLInputElement,
     name:HTMLInputElement,
     description: HTMLInputElement,
     domainExpansion: HTMLInputElement,
     abilities: HTMLInputElement,
     sorcerer: HTMLInputElement,
     curse: HTMLInputElement,
}
export class FormView {
     #formContainer = document.querySelector("#form") as HTMLFormElement;
     #buttons:IButtons = {
          createButton:  document.querySelector('[data-operation="create"]') as HTMLSpanElement,
          updateButton: document.querySelector('[data-operation="update"]') as HTMLSpanElement,
     }
     #inputs: IInputs={
          id: this.#formContainer.querySelector("#id") as HTMLInputElement,
          name: this.#formContainer.querySelector("#name") as HTMLInputElement,
          description: this.#formContainer.querySelector("#description")as HTMLInputElement,
          domainExpansion: this.#formContainer.querySelector("#domainExpansion") as HTMLInputElement,
          abilities: this.#formContainer.querySelector("#abilities") as HTMLInputElement,
          sorcerer: this.#formContainer.querySelector("#sorcerer") as HTMLInputElement,
          curse: this.#formContainer.querySelector("#curse") as HTMLInputElement,
     }
     showCharacterData(character: ICurse| ISorcerer){
          this.#inputs.id.value = character.id;
          this.#inputs.name.value = character.name;
          this.#inputs.description.value = character.description;
          this.#inputs.domainExpansion.value = character.domainExpansion ?? "";
          this.#inputs.abilities.value = character.abilities.join(", ");
          this.#inputs.sorcerer.checked = character.type === "sorcerer";
          this.#inputs.curse.checked = character.type === "curse";
     }
     bindCreateButton(callbackCreate){
          this.#buttons.createButton.addEventListener("click", event=>{
               event.preventDefault();
               const character = {
                    name: this.#inputs.name.value,
                    description: this.#inputs.description.value,
                    domainExpansion: this.#inputs.domainExpansion.value,
                    abilities: this.#inputs.abilities.value.split(","),
                    image: "../images/gege.webp",
                    type: this.#inputs.sorcerer.checked ? "sorcerer" : "curse"
               }
               callbackCreate(character);
          });
     }
     bindUpdateButton(callbackUpdate){
          this.#buttons.updateButton.addEventListener("click", event=>{
               event.preventDefault();
               const character = {
                    id: this.#inputs.id.value,
                    name: this.#inputs.name.value,
                    description: this.#inputs.description.value,
                    domainExpansion: this.#inputs.domainExpansion.value,
                    abilities: this.#inputs.abilities.value.split(","),
                    image: "../images/gege.webp",
                    type: this.#inputs.sorcerer.checked ? "sorcerer" : "curse"
               }
               callbackUpdate(character);
          });
     }
}