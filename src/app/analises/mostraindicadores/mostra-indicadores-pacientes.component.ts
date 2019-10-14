import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FichasService } from 'src/app/fichas/fichas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/pacientes/paciente.model';
import { Ficha } from 'src/app/fichas/ficha.model';


@Component({
    selector: 'app-mostra-indicadores-pacientes',
    templateUrl: './mostra-indicadores-pacientes.component.html',
    styleUrls: ['./mostra-indicadores-pacientes.component.css']
})
export class MostraIndicadoresPacientesComponent implements OnInit {

    constructor(public fichasService: FichasService, public route: ActivatedRoute) {}

    ngOnInit() {
    }
}
