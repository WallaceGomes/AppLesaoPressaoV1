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
export class IndicadoresPacientesComponent implements OnInit{

    datasIndForm: FormGroup;
    data1: Date;
    data2: Date;

    onSubmit(datas) {
        console.log(datas);
    }

    ngOnInit() {
        this.datasIndForm = new FormGroup({
            data1: new FormControl({value: ''}),
            data2: new FormControl({value: ''})
        });
    }


}
