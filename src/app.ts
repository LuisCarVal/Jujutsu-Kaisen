import { HTTPService } from "./commons/services";
import {JujutsuKaisenController} from "./controllers/jujutsu-kaisen.controller"
import { JujutsuKaisenService } from "./services/jujutsu-kaisen.service";
import {CharacterListView} from "./views/character-list.view";
import {FormView} from "./views/form.view";
const selectView = document.querySelector("#selectView") as HTMLSelectElement;

const httpService = new HTTPService()
const jujutsuKaisenService = new JujutsuKaisenService(httpService);
const characterListView = new CharacterListView();
const formView = new FormView();

const jujutsuKaisenController = new JujutsuKaisenController(jujutsuKaisenService,characterListView,formView);

selectView.addEventListener("click", (event)=> {
    event.preventDefault();
    const type = selectView.value === "1" ? "sourcerers": "curses";
    jujutsuKaisenController.show(type);
})
