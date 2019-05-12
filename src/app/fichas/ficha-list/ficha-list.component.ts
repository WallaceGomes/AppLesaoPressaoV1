import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-ficha-list',
    templateUrl: './ficha-list.component.html'
})
export class FichaListComponent {
    // fichas = [
    //      { nome: 'Nome paciente1', matricula: 'Matricula1' },
    //      { nome: 'Nome paciente2', matricula: 'Matricula2' },
    //      { nome: 'Nome paciente3', matricula: 'Matricula3' }
    // ];

    @Input() fichas = [];
}
