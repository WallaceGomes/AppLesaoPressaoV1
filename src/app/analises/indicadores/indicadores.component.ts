import { OnInit, OnDestroy, Component } from '@angular/core';
import { PacienteService } from 'src/app/pacientes/paciente.service';
import { FichasService } from 'src/app/fichas/fichas.service';

@Component({
    selector: 'app-indicadores',
    templateUrl: './indicadores.component.html'
})

export class IndicadoresComponent implements OnInit {

    constructor(public pacientesService: PacienteService, public fichasService: FichasService) {}

    ngOnInit(): void {
        throw new Error("Method not implemented.");0
    }
    
}
