import { JujutsuKaisen } from "../models/jujutsu-kaisen.model";
import {HTTPService, RepositoryService} from "../commons/services"
import { UUID } from "../types/common.type";
import { ICharacter, ICurse, ISorcerer } from "../interfaces/character.interface";
import { SorcererCharacter } from "../models/sorcerer-character";
import { CurseCharacter } from "../models/curse-character.model";
import {BackendException, CharacterNotFoundException} from "../exceptions"
export class JujutsuKaisenService{
    #jujutsuKaisen: JujutsuKaisen;
    #httpService: HTTPService;
    /* #repositoryService: RepositoryService; */
    constructor(httpService: HTTPService/*,  repositoryService: RepositoryService */){
        this.#httpService = httpService;
        /* this.#repositoryService= repositoryService; */
        this.#jujutsuKaisen = new JujutsuKaisen();
    }
    async loadSorcerers(): Promise<Map<UUID,ISorcerer>> {
        const sorcerersData = await this.#httpService.get<ISorcerer[]>("http://localhost:3000/characters");
        for (const sorcerer of sorcerersData) {
            this.#jujutsuKaisen.add(new SorcererCharacter(sorcerer));
        }
        return this.#jujutsuKaisen.sorcerers
    }
    
    async loadCurses(): Promise<void> {
        const cursesData = await this.#httpService.get<ICurse[]>("http://localhost:3000/curses");
        for (const curse of cursesData) {
            this.#jujutsuKaisen.add(new CurseCharacter(curse));
        }
    }
    allSourcerers(): ISorcerer[]{
        return this.#jujutsuKaisen.findAllSorcerers();
    }
    allCurses(): ICurse[]{
        return this.#jujutsuKaisen.findAllCurses();
    }
    remove(uuid: UUID): void{
        const character = this.#jujutsuKaisen.findById(uuid);
        if(!character){
            throw new Error("Character not found");
        }
        try{
            this.#jujutsuKaisen.remove(uuid);
            this.#httpService.delete(`http://localhost:3000/characters/${uuid}`);
        }catch{
            this.#jujutsuKaisen.add(character);
            throw new Error("Error trying to delete the character");
        }
    }
    add(character: CurseCharacter | SorcererCharacter): void{
        try{
            this.#jujutsuKaisen.add(character);
            this.#httpService.post<ICharacter>(`http://localhost:3000/characters`, character.toJSON());
        }catch{
            this.#jujutsuKaisen.remove(character.id);
            throw new BackendException("Error trying to add the character");
        }
    }
    update(characterToUpdate: CurseCharacter | SorcererCharacter): void{
        const character = this.#jujutsuKaisen.findById(characterToUpdate.id);
        if(!character){
            throw new CharacterNotFoundException(characterToUpdate.id);
        }
        try{
            this.#jujutsuKaisen.update(characterToUpdate.id, characterToUpdate);
            this.#httpService.put<ICharacter>(`http://localhost:3000/characters/${characterToUpdate.id}`, characterToUpdate.toJSON());
        }catch{
            this.#jujutsuKaisen.add(character);
            throw new BackendException("Error trying to update the character");
        }
    }
    find(uuid: UUID): ICurse | ISorcerer{
        return this.#jujutsuKaisen.findById(uuid);
    }
}