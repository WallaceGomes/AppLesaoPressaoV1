import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, from } from 'rxjs';

import { PageEvent } from '@angular/material';
import { Paciente } from '../../pacientes/paciente.model';
import { PacienteService } from '../../pacientes/paciente.service';
import { Ficha } from 'src/app/fichas/ficha.model';
import { Chart } from 'chart.js';
import { FichasService } from 'src/app/fichas/fichas.service';

@Component({
    selector: 'app-analise-pacientes',
    templateUrl: './analise-pacientes.component.html'
})
export class AnalisePacientesComponent implements OnInit, OnDestroy {

    chart = [];
    pacientes: Paciente[] = [];
    pesquisa: any = "";

    fichas: Ficha[] = [];

    percepSens: any;
    umidade: any;
    atividade: any;
    mobilidade: any;
    nutricao: any;
    fricscisal: any;
    score: any;


    private pacientesSub: Subscription;
    private fichasSub: Subscription;
    constructor(public pacientesService: PacienteService, public fichasService: FichasService) {}

    ngOnInit() {
        this.pacientesService.getPacientes();
        this.pacientesSub = this.pacientesService.getPacientesUpdateListener()
        .subscribe((pacientes: Paciente[]) => {
            this.pacientes = pacientes;
        });

        this.fichasService.getFichas();
        this.fichasSub = this.fichasService.getFichasUpdateListener()
        .subscribe((fichas: Ficha[]) => {
            this.fichas = fichas;
        });

        // this.chart = new Chart('canvas', {
        //     type: 'line',
        //     data: {
        //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //         datasets: [{
        //             label: 'My First dataset',
        //             backgroundColor: 'rgb(255, 99, 132)',
        //             borderColor: 'rgb(255, 99, 132)',
        //             data: [0, 10, 5, 2, 20, 30, 45]
        //         }]
        //     }
        // })
    }

    onChangePage(pageData: PageEvent) {
        console.log(pageData);
    }

    onDelete(pacienteId: string) {
        this.pacientesService.deletePaciente(pacienteId);
    }

    filtrarItens() {
        this.pacientes = this.pacientesService.filtrarItens(this.pesquisa);
        this.fichas = this.fichasService.filtrarItens(this.pesquisa);
        console.log(this.fichas);
    }

    ngOnDestroy() {
        this.pacientesSub.unsubscribe();
        this.fichasSub.unsubscribe();
    }

}
