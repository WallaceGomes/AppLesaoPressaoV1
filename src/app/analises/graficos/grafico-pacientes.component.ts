import { Component, OnInit} from '@angular/core';
import { FichasService } from 'src/app/fichas/fichas.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-grafico-pacientes',
    templateUrl: './grafico-pacientes.component.html'
})
export class GraficoPacientesComponent implements OnInit {

    teste = this.fichasService.chart;

    constructor(public fichasService: FichasService) {}

    ngOnInit() {
    }
}
