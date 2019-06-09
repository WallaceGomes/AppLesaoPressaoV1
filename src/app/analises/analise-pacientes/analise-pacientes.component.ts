import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, from } from 'rxjs';

import { PageEvent } from '@angular/material';
import { Paciente } from '../../pacientes/paciente.model';
import { PacienteService } from '../../pacientes/paciente.service';
import { Ficha } from 'src/app/fichas/ficha.model';
import { Chart } from 'chart.js';
import { FichasService } from 'src/app/fichas/fichas.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-analise-pacientes',
    templateUrl: './analise-pacientes.component.html'
})
export class AnalisePacientesComponent implements OnInit, OnDestroy {

    chart = [];
    teste = this.fichasService.chart;
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
    datas: any;


    private pacientesSub: Subscription;
    private fichasSub: Subscription;
    constructor(public pacientesService: PacienteService, public fichasService: FichasService, private router: Router) {}

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
    }

    onChangePage(pageData: PageEvent) {
        console.log(pageData);
    }

    onDelete(pacienteId: string) {
        this.pacientesService.deletePaciente(pacienteId);
    }

    filtrarItens() {
        this.pacientes = this.pacientesService.filtrarItens(this.pesquisa);
        // this.fichas = this.fichasService.filtrarItens(this.pesquisa);

        // this.percepSens = this.fichas.map((dadosFicha) => {
        //     return dadosFicha.percepSens;
        // });
        // this.umidade = this.fichas.map((dadosFicha) => {
        //     return dadosFicha.umidade;
        // });
        // this.atividade = this.fichas.map((dadosFicha) => {
        //     return dadosFicha.atividade;
        // });
        // this.mobilidade = this.fichas.map((dadosFicha) => {
        //     return dadosFicha.mobilidade;
        // });
        // this.nutricao = this.fichas.map((dadosFicha) => {
        //     return dadosFicha.nutricao;
        // });
        // this.fricscisal = this.fichas.map((dadosFicha) => {
        //     return dadosFicha.fricscisal;
        // });
        // this.score = this.fichas.map((dadosFicha) => {
        //     return dadosFicha.score;
        // });
        // this.datas = this.fichas.map((dadosFicha) => {
        //     return dadosFicha.data;
        // });
        // console.log(this.fichas);

        // this.chart = new Chart('canvas', {
        //     type: 'line',
        //     data: {
        //         labels: this.datas,
        //         datasets: [{
        //             label: 'Score',
        //             fill: false,
        //             backgroundColor: 'rgb(255, 99, 132)',
        //              borderColor: 'rgb(255, 99, 132)',
        //             data: this.score
        //          },
        //          {
        //             label: 'PercepSens',
        //             fill: false,
        //             backgroundColor: 'rgb(36, 26, 16)',
        //              borderColor: 'rgb(36, 26, 16)',
        //             data: this.percepSens
        //          },
        //          {
        //             label: 'Umidade',
        //             fill: false,
        //             backgroundColor: 'rgb(161, 141, 16)',
        //              borderColor: 'rgb(161, 141, 16)',
        //             data: this.umidade
        //          },
        //          {
        //             label: 'Atividade',
        //             fill: false,
        //             backgroundColor: 'rgb(27, 184, 57)',
        //              borderColor: 'rgb(27, 184, 57)',
        //             data: this.atividade
        //          },
        //          {
        //             label: 'Mobilidade',
        //             fill: false,
        //             backgroundColor: 'rgb(27, 184, 192)',
        //              borderColor: 'rgb(27, 184, 192)',
        //             data: this.mobilidade
        //          },
        //          {
        //             label: 'Nutrição',
        //             fill: false,
        //             backgroundColor: 'rgb(202, 15, 192)',
        //              borderColor: 'rgb(202, 15, 192)',
        //             data: this.nutricao
        //          },
        //          {
        //             label: 'Fricção',
        //             fill: false,
        //             backgroundColor: 'rgb(82, 78, 183)',
        //              borderColor: 'rgb(82, 78, 183)',
        //             data: this.fricscisal
        //          }]
        //      }
        //  })
    }

    verStats(matricula) {
        this.fichas = this.fichasService.filtrarItens(matricula);

        this.percepSens = this.fichas.map((dadosFicha) => {
            return dadosFicha.percepSens;
        });
        this.umidade = this.fichas.map((dadosFicha) => {
            return dadosFicha.umidade;
        });
        this.atividade = this.fichas.map((dadosFicha) => {
            return dadosFicha.atividade;
        });
        this.mobilidade = this.fichas.map((dadosFicha) => {
            return dadosFicha.mobilidade;
        });
        this.nutricao = this.fichas.map((dadosFicha) => {
            return dadosFicha.nutricao;
        });
        this.fricscisal = this.fichas.map((dadosFicha) => {
            return dadosFicha.fricscisal;
        });
        this.score = this.fichas.map((dadosFicha) => {
            return dadosFicha.score;
        });
        this.datas = this.fichas.map((dadosFicha) => {
            return dadosFicha.data;
        });
        console.log(this.fichas);

        this.chart = new Chart('canvas', {
            type: 'line',
            data: {
                labels: this.datas,
                datasets: [{
                    label: 'Score',
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                     borderColor: 'rgb(255, 99, 132)',
                    data: this.score
                 },
                 {
                    label: 'PercepSens',
                    fill: false,
                    backgroundColor: 'rgb(36, 26, 16)',
                     borderColor: 'rgb(36, 26, 16)',
                    data: this.percepSens,
                    hidden: true
                 },
                 {
                    label: 'Umidade',
                    fill: false,
                    backgroundColor: 'rgb(161, 141, 16)',
                     borderColor: 'rgb(161, 141, 16)',
                    data: this.umidade,
                    hidden: true
                 },
                 {
                    label: 'Atividade',
                    fill: false,
                    backgroundColor: 'rgb(27, 184, 57)',
                     borderColor: 'rgb(27, 184, 57)',
                    data: this.atividade,
                    hidden: true
                 },
                 {
                    label: 'Mobilidade',
                    fill: false,
                    backgroundColor: 'rgb(27, 184, 192)',
                     borderColor: 'rgb(27, 184, 192)',
                    data: this.mobilidade,
                    hidden: true
                 },
                 {
                    label: 'Nutrição',
                    fill: false,
                    backgroundColor: 'rgb(202, 15, 192)',
                     borderColor: 'rgb(202, 15, 192)',
                    data: this.nutricao,
                    hidden: true
                 },
                 {
                    label: 'Fricção',
                    fill: false,
                    backgroundColor: 'rgb(82, 78, 183)',
                     borderColor: 'rgb(82, 78, 183)',
                    data: this.fricscisal,
                    hidden: true
                 }]
             }
         })
        //this.fichasService.setChart(this.chart);
        this.fichasService.chart = this.chart;
        //this.teste = this.fichasService.chart;
        this.router.navigate(['pagina-ver-graficos']);
        // this.teste = this.fichasService.getChart();

    }

    ngOnDestroy() {
        this.pacientesSub.unsubscribe();
        this.fichasSub.unsubscribe();
    }

}
