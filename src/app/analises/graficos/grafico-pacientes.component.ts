import { Component, OnInit} from '@angular/core';
import { FichasService } from 'src/app/fichas/fichas.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Ficha } from 'src/app/fichas/ficha.model';
import { Chart } from 'chart.js';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
    selector: 'app-grafico-pacientes',
    templateUrl: './grafico-pacientes.component.html'
})
export class GraficoPacientesComponent implements OnInit {

    teste = this.fichasService.chart;
    private matricula: string;

    chart = [];

    fichas: Ficha[] = [];

    percepSens: any;
    umidade: any;
    atividade: any;
    mobilidade: any;
    nutricao: any;
    fricscisal: any;
    score: any;
    datas: any;
    nome: any;
    dataInternacao: any;
    matriculaGraf: any;

    constructor(public fichasService: FichasService, public route: ActivatedRoute) {}

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('matricula')) {
                this.matricula = paramMap.get('matricula');

                // console.log(this.matricula);

                this.fichas = this.fichasService.filtrarItens(this.matricula);

                this.matriculaGraf = this.fichas.map((dadosFicha) => {
                    return dadosFicha.matricula;
                });
                this.nome = this.fichas.map((dadosFicha) => {
                    return dadosFicha.nome;
                });
                this.dataInternacao = this.fichas.map((dadosFicha) => {
                    return dadosFicha.dataInternacao;
                });
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

                // this.orientacao.lock("landscape");

                // console.log(this.fichas);

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
                 });
                //this.fichasService.setChart(this.chart);
                // this.fichasService.chart = this.chart;
                //this.teste = this.fichasService.chart;
                // this.router.navigate(['pagina-ver-graficos']);
                // this.teste = this.fichasService.getChart();
            }
        });
    }
}
