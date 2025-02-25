import { ICharacter, ICurse, ISorcerer } from "../interfaces/character.interface";
import { CurseCharacter } from "../models/curse-character.model";
import { SorcererCharacter } from "../models/sorcerer-character";
import { JujutsuKaisenService } from "../services/jujutsu-kaisen.service";
import { UUID } from "../types/common.type";
import { CharacterView } from "../views/character.view";
import { FormView } from "../views/form.view";
export class JujutsuKaisenController{
    #jujutsuKaisenService: JujutsuKaisenService;
    #characterView: CharacterView;
    #formView: FormView;
    constructor(jujutsuKaisenService: JujutsuKaisenService, characterView: CharacterView, formView: FormView){
        this.#jujutsuKaisenService= jujutsuKaisenService;
        this.#characterView = characterView;
        this.#formView = formView;
        this.load();
        this.#jujutsuKaisenService.loadCurses();
        this.#formView.bindCreateButton(this.#handleCreateCharacter);
        this.#formView.bindUpdateButton(this.#handleUpdateCharacter);
    }
    load(){
        this.#jujutsuKaisenService.loadSorcerers()
                .then((characters: Map<UUID,ISorcerer>)=> this.#characterView.show(Array.from(characters.values()), this.#handleRemove, this.#handleUpdate));
    }
    show(view: "sourcerers"| "curses"){
        const characters = view === "sourcerers" ? this.#jujutsuKaisenService.allSourcerers() : this.#jujutsuKaisenService.allCurses() ;
        this.#characterView.show(characters, this.#handleRemove, this.#handleUpdate);
    }
    #handleRemove= (uuid: UUID)=>{
        const confirm = this.#characterView.isConfirmDelete();
        if(!confirm){
            return;
        }
        try{
            this.#characterView.remove(uuid);
            this.#jujutsuKaisenService.remove(uuid);
        }catch(e){
            throw new Error(e.message);
        }
    }
    #handleUpdate = (uuid: UUID)=>{
        const character = this.#jujutsuKaisenService.find(uuid);
        this.#formView.showCharacterData(character);
    }
    #handleCreateCharacter = (character: ICurse | ISorcerer)=>{
        const characterToCreate = character.type === "sorcerer" ? new SorcererCharacter(character) : new CurseCharacter(character);
        this.#jujutsuKaisenService.add(characterToCreate);
        this.#characterView.create(characterToCreate, this.#handleRemove, this.#handleUpdate);
    }
    #handleUpdateCharacter = (character: ICurse | ISorcerer)=>{
        const characterToUpdate = character.type === "sorcerer" ? new SorcererCharacter(character) : new CurseCharacter(character);
        const oldCharacter= this.#jujutsuKaisenService.find(characterToUpdate.id);
        if(!oldCharacter){
            throw new Error("Character not found");
        }
        try {
            this.#jujutsuKaisenService.update(characterToUpdate);
            this.#characterView.update(character, this.#handleRemove, this.#handleUpdate);
        }catch(e){
            this.#characterView.update(oldCharacter, this.#handleRemove, this.#handleUpdate);
            throw new Error(e.message);
        }
    }
}