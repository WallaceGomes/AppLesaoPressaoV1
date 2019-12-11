import { Component, OnInit, OnDestroy} from '@angular/core';
import { FichasService } from 'src/app/fichas/fichas.service';
import { Router, ActivatedRoute, ParamMap, Data } from '@angular/router';
import { PacienteService } from 'src/app/pacientes/paciente.service';
import { Subscription } from 'rxjs';
import { Paciente } from 'src/app/pacientes/paciente.model';
import { Ficha } from 'src/app/fichas/ficha.model';
import { FormGroup, Validators, FormControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Indicadores } from './indicadores.model';


@Component({
    selector: 'app-indicadores-pacientes',
    templateUrl: './indicadores-pacientes.component.html',
    styleUrls: ['./indicadores-pacientes.component.css']
})
export class IndicadoresPacientesComponent implements OnInit, OnDestroy{

    daTa1: Date;
    daTa2: Date;
    percPacRiscAdm: any;
    percPacAvalDiaria: number;
    incidLesao: number;

    carregando = false;
    mostrandoIndicadores = false;

    pacientes: Paciente[] = [];
    fichas: Ficha[] = [];

    pacientesInternados: Paciente[] = [];

    private pacientesSub: Subscription;
    private fichasSub: Subscription;

    constructor(public pacientesService: PacienteService, public fichasService: FichasService, private router: Router) {}

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

    onGerarInds() { // Insere na tela os graficos a partir dos calculos das funcoes dos indicadores

        this.mostrandoIndicadores = true;
        console.log(this.daTa1);
        console.log(this.daTa2);
        this.percPacRiscAdm = this.calculaPercPacRiscAdm();
        // this.calculaPercPacAvalDiaria();
        // this.calculaIncidLesao();
    }

    calculaPercPacRiscAdm() {
        // Percentual de pacientes submetidos a avaliacao de risco para UPP na admissao
        // (data de internacao). Fichas com data de internacao igual a data da ficha
        // comparar quantidade de fichas x qtde de pacientes internados nas datas*
        // this.carregarFichasePacientes();
        this.fichas = this.fichasService.filtrarItensPorData(this.daTa1, this.daTa2);
        this.pacientesInternados = this.pacientesService.filtrarItensPorData(this.daTa1, this.daTa2);
        console.log(this.fichas);
        console.log(this.pacientesInternados);
        const fichasLength = this.fichas.length;
        const internadosLength = this.pacientesInternados.length;

        let qtdeFichas = 0;
        for (let i = 0; i < fichasLength; i++) {
            // qtde de Fichas com data de internacao igual a data da ficha
            if (this.fichas[i].dataInternacao === this.fichas[i].data) {
                qtdeFichas ++;
            }
        }

        if (internadosLength > 0 && qtdeFichas > 0) {
            let x = (qtdeFichas * 100) / internadosLength;
            x = parseFloat(x.toFixed(2)); // Limita a quantidade de casas decimais para no máximo 2
            return x;
        } else {
            return 'Quantidade de fichas ou pacientes insuficientes para análise';
        }
    }

    calculaIncidLesao() { // Incidencia de UPP (Total de pacientes que apresentaram lesao ao menos uma vez)
        // qtde de pacientes com lesao em pelo menos uma ficha - break
        // excluidos os pacientes com lesao na primeira ficha de avaliacao
        // this.carregarFichasePacientes();
        this.fichas = this.fichasService.filtrarItensPorData(this.daTa1, this.daTa2);


    }

    calculaPercPacAvalDiaria() {
        // Percentual de pacoentes de risco recebendo cuidado preventido apropriado para UPP
        // pacientes tem que ter todas as fichas
        // qtde de fichas = qtde de dias internado
        // this.carregarFichasePacientes();
        this.fichas = this.fichasService.filtrarItensPorData(this.daTa1, this.daTa2);
        this.pacientesInternados = this.pacientesService.filtrarItensPorData(this.daTa1, this.daTa2);
        const fichasLength = this.fichas.length;
        const internadosLength = this.pacientesInternados.length;

        let qtdeFichas = 0;

    }

    // carregarFichasePacientes() { // Faz o carregamento das fichas e dos pacientes

    //     this.pacientesService.getPacientes();
    //     this.pacientesSub = this.pacientesService.getPacientesUpdateListener()
    //     .subscribe((pacientes: Paciente[]) => {
    //         this.pacientes = pacientes.slice(0).reverse();
    //     });
    //     this.fichasService.getFichas();
    //     this.fichasSub = this.fichasService.getFichasUpdateListener()
    //     .subscribe((fichas: Ficha[]) => {
    //         this.fichas = fichas;
    //     });
    // }

    // Inserir métodos de filtrar as fichas e pacientes

    onResetInds() { // Recarrega a pagina para inserir nova janela/periodo de avaliacao
        this.mostrandoIndicadores = false;
        this.carregando = true;
        this.router.navigate(["/pagina-indicadores"]);
        this.carregando = false;
    }

    ngOnDestroy() {
        this.pacientesSub.unsubscribe();
        this.fichasSub.unsubscribe();
    }

}
