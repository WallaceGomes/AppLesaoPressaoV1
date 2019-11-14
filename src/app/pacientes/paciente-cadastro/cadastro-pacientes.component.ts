import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
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
    dataNascimento = '';
    patologia = '';
    comorbidades = '';

    carregando = false;

    private paciente: Paciente;
    options: FormGroup;
    form: FormGroup;
    private mode = 'create';
    private pacienteId: string;

    onCadastrarPaciente() {
        if (this.form.invalid) {
          return;
        }
        this.carregando = true;
        if (this.mode === 'create') {
          this.pacienteService.addPaciente(
            this.form.value.nome,
            this.form.value.matricula,
            this.form.value.dataInternacao,
            this.form.value.dataNascimento,
            this.form.value.patologia,
            this.form.value.comorbidades);
        } else {
          this.pacienteService.updatePaciente(
            this.pacienteId,
            this.form.value.nome,
            this.form.value.matricula,
            this.form.value.dataInternacao,
            this.form.value.dataNascimento,
            this.form.value.patologia,
            this.form.value.comorbidades
          );
        }
        this.form.reset();
      }
    get nomepaciente() {
      return this.form.get('nome');
    }
    get matriculapaciente() {
      return this.form.get('matricula');
    }
    get datainternacao() {
      return this.form.get('dataInternacao');
    }
    get datanascimento() {
      return this.form.get('dataNascimento');
    }
    get patologiia() {
      return this.form.get('patologia');
    }
    get comorbidadees() {
      return this.form.get('comorbidades');
    }
    constructor(public pacienteService: PacienteService, private router: ActivatedRoute,
      fb: FormBuilder) {
      this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
        });
      }

    ngOnInit() {
      this.form = new FormGroup({
        'nome': new FormControl('', [Validators.required]),
        'matricula': new FormControl('', [Validators.required]),
        'dataInternacao': new FormControl('', [Validators.required]),
        'dataNascimento': new FormControl('', [Validators.required]),
        'patologia': new FormControl('', [Validators.required]),
        'comorbidades': new FormControl('', [Validators.required])
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
              dataInternacao: dadosPaciente.dataInternacao,
              dataNascimento: dadosPaciente.dataNascimento,
              patologia: dadosPaciente.patologia,
              comorbidades: dadosPaciente.comorbidades};
            this.form.setValue({
              'nomePaciente': this.paciente.nome,
              'matricula': this.paciente.matricula,
              'dataInternacao': this.paciente.dataInternacao,
              'dataNascimento': this.paciente.dataNascimento,
              'patologia': this.paciente.patologia,
              'comorbidades': this.paciente.comorbidades
            });
          });
        } else {
          this.mode = 'create';
          this.pacienteId = null;
        }
      });
    }

}
