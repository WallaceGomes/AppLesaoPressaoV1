import { Component, OnInit} from '@angular/core';
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
export class IndicadoresPacientesComponent {

    daTa1: Date;
    daTa2: Date;
    data1: Date;
    data2: Date;

    carregando = false;
    mostrandoIndicadores = false

    constructor(private router: Router) {}

    onGerarInds() {
        this.mostrandoIndicadores = true;
        this.data1 = this.daTa1;
        this.data2 = this.daTa2;
        console.log(this.data1);
        console.log(this.data2);
    }

    // Inserir métodos de filtrar as fichas e pacientes

    onResetInds() {
        this.mostrandoIndicadores = false;
        this.carregando = true;
        this.router.navigate(["/pagina-indicadores"]);
        this.carregando = false;
    }

}
