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
    data1: Date;
    data2: Date;

    carregando = false;
    mostrandoIndicadores = false;

    pacientes: Paciente[] = [];
    fichas: Ficha[] = [];

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
        this.data1 = this.daTa1;
        this.data2 = this.daTa2;
        console.log(this.data1);
        console.log(this.data2);
        this.percPacRiscAdm();
    }

    percPacRiscAdm() { // Percentual de pacientes submetidos a avaliacao de risco para UPP na admissao (data de internacao)
        // fichas com data de internacao igual a data da ficha
        // comparar quantidade de fichas x qtde de pacientes internados nas datas
        // this.carregarFichasePacientes();
        this.fichas = this.fichasService.filtrarItensPorData(this.data1, this.data2);
        console.log(this.fichas);
    }

    percPacAvalDiaria(data1, data2) { // Percentual de pacoentes de risco recebendo cuidado preventido apropriado para UPP
        // pacientes tem que ter todas as fichas
        // qtde de fichas = qtde de dias internado
        // this.carregarFichasePacientes();

    }

    incidLesao(data1, data2) { // Incidencia de UPP (Total de pacientes que apresentaram lesao ao menos uma vez)
        // qtde de pacientes com lesao em pelo menos uma ficha - break
        // ecluidos os pacientes com lesao na primeira ficha de avaliacao
        // this.carregarFichasePacientes();

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
