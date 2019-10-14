import { Component, OnInit} from '@angular/core';
import { FichasService } from 'src/app/fichas/fichas.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PacienteService } from 'src/app/pacientes/paciente.service';
import { Subscription } from 'rxjs';
import { Paciente } from 'src/app/pacientes/paciente.model';
import { Ficha } from 'src/app/fichas/ficha.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Indicadores } from './indicadores.model';


@Component({
    selector: 'app-indicadores-pacientes',
    templateUrl: './indicadores-pacientes.component.html',
    styleUrls: ['./indicadores-pacientes.component.css']
})
export class IndicadoresPacientesComponent implements OnInit {

    fichas: Ficha[] = [];
    pacientes: Paciente[] = [];
    indicadores: Indicadores[] = [];

    daTa1 = '';
    daTa2 = '';

    form: FormGroup;
    carregando = false;

    percSubAdm: any; // Percentual (%) de pacientes submetidos a avaliação de risco para UPP na admissão
    percRecPrev: any; // (esse não dá por enquanto) Percentual (%) de pacientes de risco recebendo cuidado preventivo apropriado para UPP
    percAvaDia: any; // Percentual (%) de pacientes recebendo avaliação diária para risco de UPP
    percIncUpp: any; // Incidência de UPP

    private pacientesSub: Subscription;
    private fichasSub: Subscription;

    constructor(public pacientesService: PacienteService, public fichasService: FichasService, public route: ActivatedRoute) {}

    ngOnInit() {

        this.pacientesService.getPacientes();
        this.pacientesSub = this.pacientesService.getPacientesUpdateListener()
        .subscribe((pacientes: Paciente[]) => {
            this.pacientes = pacientes.slice(0).reverse();
        });

        this.fichasService.getFichas();
        this.fichasSub = this.fichasService.getFichasUpdateListener()
        .subscribe((fichas: Ficha[]) => {
            this.fichas = fichas;
        });
    }
    calculaIndicPercSubAdm() {
// Percentual (%) de pacientes submetidos a avaliação
// de risco para UPP na admissão

    }
}
