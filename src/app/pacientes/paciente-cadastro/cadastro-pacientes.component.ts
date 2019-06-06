import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../paciente.service';
import { Paciente } from '../paciente.model';


@Component({
    selector: 'app-cadastro-pacientes',
    templateUrl: './cadastro-pacientes.component.html',
    styleUrls: ['./cadastro-pacientes.component.css']
})

export class CadastroPaciente implements OnInit{

    nome = '';
    matricula = '';
    dataInternacao = '';
    private paciente: Paciente;
    form: FormGroup;
    private mode = 'create';
    private pacienteId: string;

    onCadastrarPaciente() {
        if (this.form.invalid) {
          return;
        }
        if (this.mode === 'create') {
          this.pacienteService.addPaciente(
            this.form.value.nome,
            this.form.value.matricula,
            this.form.value.dataInternacao);
        } else {
          this.pacienteService.updatePaciente(
            this.pacienteId,
            this.form.value.nome,
            this.form.value.matricula,
            this.form.value.dataInternacao,
          );
        }
        this.form.reset();
      }

    constructor(public pacienteService: PacienteService, private router: ActivatedRoute) {}

    ngOnInit() {
      this.form = new FormGroup({
        'nome': new FormControl('', [Validators.required]),
        'matricula': new FormControl('', [Validators.required]),
        'dataInternacao': new FormControl('', [Validators.required]),
      });
      this.router.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('pacienteId')) {
          this.mode = 'edit';
          this.pacienteId = paramMap.get('pacienteId');
          this.pacienteService.getPaciente(this.pacienteId).subscribe(dadosPaciente => {
            this.paciente = {
              id: dadosPaciente._id,
              nome: dadosPaciente.nome,
              matricula: dadosPaciente.matricula,
              dataInternacao: dadosPaciente.dataInternacao};
            this.form.setValue({
              'nomePaciente': this.paciente.nome,
              'matricula': this.paciente.matricula,
              'dataInternacao': this.paciente.dataInternacao
            });
          });
        } else {
          this.mode = 'create';
          this.pacienteId = null;
        }
      });
    }

}
