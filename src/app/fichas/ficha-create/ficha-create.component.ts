import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FichasService } from '../fichas.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ficha } from './../ficha.model';
import { PacienteService } from './../../pacientes/paciente.service';
import { Paciente } from './../../pacientes/paciente.model';

// export interface Local {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-ficha-create',
  templateUrl: './ficha-create.component.html',
  styleUrls: ['./ficha-create.component.css']
})
export class FichaCreateComponent implements OnInit {
  
  nomePaciente = '';
  matriculaPaciente = '';
  leitoPaciente = '';
  dataFichaPaciente = '';
  dataInternacao = '';
  presencaLesao = '';
  localLesao = '';
  estagioLesao = '';
  private ficha: Ficha;
  form: FormGroup;
  private mode = 'create';
  private fichaId: string;
  private pacienteId: string;
  private paciente: Paciente;
  carregando = false;

  // locais: Local[] = [
  //   {value: 'sacra', viewValue: 'Sacra'},
  //   {value: 'escapula', viewValue: 'Escápula'},
  //   {value: 'ombros', viewValue: 'Ombros'},
  //   {value: 'cotovelo', viewValue: 'Cotovelo'},
  //   {value: 'isquio', viewValue: 'Ísquio'},
  //   {value: 'calcaneo', viewValue: 'Calcâneo'},
  //   {value: 'halux', viewValue: 'Hálux'},
  //   {value: 'trocanter', viewValue: 'Trocanter'},
  //   {value: 'joelho', viewValue: 'Joelho'},
  //   {value: 'maleolo', viewValue: 'Maléolo'},
  //   {value: '0', viewValue: 'Não possui'}
  // ];

  submitted = false;

  itemFichaPresencaLesao: any = {
    subHeader: 'Presença de lesão no paciente',
    message: 'O paciente possui alguma lesão por pressão?'
  };

  itemFichaLocalLesao: any = {
    subHeader: 'Local da lesão do paciente',
    message: 'Qual o local que houve desenvolvimento da lesão no paciente?'
  };

  itemFichaEstagioLesao: any = {
    subHeader: 'Estágio da lesão',
    message: 'Qual o estágio que a lesão se encontra?'
  };

  itemFichaPercepSens: any = {
    // header: 'Percepção Sensorial',
    subHeader: 'Percepção Sensorial',
    message: 'Qual o nível de percepção do paciente?'
  };

  itemFichaUmidade: any = {
    // header: 'Umidade da pele',
    subHeader: 'Umidade',
    message: 'Nível de umidade da pele'
  };

  itemFichaAtividade: any = {
    // header: 'Atividade',
    subHeader: 'Atividade',
    message: 'Nível de atividade do paciente'
  };

  itemFichaMobilidade: any = {
    // header: 'Mobilidade',
    subHeader: 'Mobilidade',
    message: 'Condição de mobilidade do paciente'
  };

  itemFichaNutricao: any = {
    // header: 'Nutricao',
    subHeader: 'Nutricao',
    message: 'Condição da alimentação do paciente'
  };

  itemFichaFricaoCisalh: any = {
    // header: 'Fricção e Cisalhamento',
    subHeader: 'Fricção e Cisalhamento',
    message: 'Condições de pele do paciente'
  };

  opcaoSelecionada: number;

  scorePercepSens: any = 0;
  scoreUmidade: any = 0;
  scoreAtividade: any = 0;
  scoreMobilidade: any = 0;
  scoreNutricao: any = 0;
  scoreFricCis: any = 0;

  score: any = 0;

  selectChangeHandlerPresencaLesao(event: any) {
    this.presencaLesao = (event.target.value);
  }

  selectChangeHandlerLocalLesao(event: any) {
    this.localLesao = (event.target.value);
  }

  selectChangeHandlerEstagioLesao(event: any) {
    this.estagioLesao = (event.target.value);
  }

  selectChangeHandlerPercpSens(event: any) {
    this.scorePercepSens = (event.target.value);
    this.calculoScore();
  }

  selectChangeHandlerUmidade(event: any) {
    this.scoreUmidade = (event.target.value);
    this.calculoScore();
  }

  selectChangeHandlerAtividade(event: any) {
    this.scoreAtividade = (event.target.value);
    this.calculoScore();
  }

  selectChangeHandlerMobilidade(event: any) {
    this.scoreMobilidade = (event.target.value);
    this.calculoScore();
  }

  selectChangeHandlerNutricao(event: any) {
    this.scoreNutricao = (event.target.value);
    this.calculoScore();
  }

  selectChangeHandlerFricCis(event: any) {
    this.scoreFricCis = (event.target.value);
    this.calculoScore();
  }

  calculoScore() {
    this.score =
      Number(this.scorePercepSens) +
      Number(this.scoreUmidade) +
      Number(this.scoreAtividade) +
      Number(this.scoreMobilidade) +
      Number(this.scoreNutricao) +
      Number(this.scoreFricCis);
  }

  onSalvarFicha() {
    if (this.form.invalid) {
      return;
    }
    this.carregando = true;
    if (this.presencaLesao === 'NÃO') {
      this.localLesao = '0';
      this.estagioLesao = '0';
    }
    if (this.mode === 'create') {
      this.fichasService.addFicha(
        this.form.getRawValue().nomePaciente,
        this.form.getRawValue().matriculaPaciente,
        this.form.getRawValue().dataInternacao,
        this.form.getRawValue().leitoPaciente,
        this.form.getRawValue().dataFichaPaciente,
        this.presencaLesao,
        this.localLesao,
        this.estagioLesao,
        this.scorePercepSens,
        this.scoreUmidade,
        this.scoreAtividade,
        this.scoreMobilidade,
        this.scoreNutricao,
        this.scoreFricCis,
        this.score);
    } else {
      this.fichasService.updateFicha(
        this.fichaId,
        this.form.getRawValue().nomePaciente,
        this.form.getRawValue().matriculaPaciente,
        this.form.getRawValue().dataInternacao,
        this.form.getRawValue().leitoPaciente,
        this.form.getRawValue().dataFichaPaciente,
        this.presencaLesao,
        this.localLesao,
        this.estagioLesao,
        this.scorePercepSens,
        this.scoreUmidade,
        this.scoreAtividade,
        this.scoreMobilidade,
        this.scoreNutricao,
        this.scoreFricCis,
        this.score
      );
    }
    // this.form.reset();
    // console.log(this.form);
    this.submitted = true;
  }

  get nomepaciente() {
    return this.form.get('nomePaciente');
  }
  get matriculapaciente() {
    return this.form.get('matriculaPaciente');
  }
  get datainternacao() {
    return this.form.get('dataInternacao');
  }
  get leitopaciente() {
    return this.form.get('leitoPaciente');
  }
  get dataFichapaciente() {
    return this.form.get('dataFichaPaciente');
  }
  get presencalesao() {
    return this.form.get('presencaLesao');
  }

  constructor(public fichasService: FichasService, public route: ActivatedRoute, public pacientesService: PacienteService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'nomePaciente': new FormControl({value: '', disabled: true}, [Validators.required]),
      'matriculaPaciente': new FormControl({value: '', disabled: true}, [Validators.required]),
      'dataInternacao': new FormControl({value: '', disabled: true}, [Validators.required]),
      'leitoPaciente': new FormControl('', [Validators.required]),
      'dataFichaPaciente': new FormControl('', [Validators.required])
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('fichaId')) {
        this.mode = 'edit';
        this.fichaId = paramMap.get('fichaId');
        this.carregando = true;
        this.fichasService.getFicha(this.fichaId).subscribe(dadosFicha => {
          this.carregando = false;
          this.ficha = {
            id: dadosFicha._id,
            nome: dadosFicha.nome,
            matricula: dadosFicha.matricula,
            dataInternacao: dadosFicha.dataInternacao,
            leito: dadosFicha.leito,
            data: dadosFicha.data,
            presencaLesao: dadosFicha.presencaLesao,
            localLesao: dadosFicha.localLesao,
            estagioLesao: dadosFicha.estagioLesao,
            percepSens: dadosFicha.percepSens,
            umidade: dadosFicha.umidade,
            atividade: dadosFicha.atividade,
            mobilidade: dadosFicha.mobilidade,
            nutricao: dadosFicha.nutricao,
            fricscisal: dadosFicha.fricscisal,
            score: dadosFicha.score};
          this.form.setValue({
            'nomePaciente': this.ficha.nome,
            'matriculaPaciente': this.ficha.matricula,
            'dataInternacao': this.ficha.dataInternacao,
            'leitoPaciente': this.ficha.leito,
            'dataFichaPaciente': this.ficha.data
          });
        });
      } else {
        this.mode = 'create';
        this.fichaId = null;
        this.pacienteId = paramMap.get('pacienteId');
        this.pacientesService.getPaciente(this.pacienteId).subscribe(dadosPaciente => {
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
            'matriculaPaciente': this.paciente.matricula,
            'dataInternacao': this.paciente.dataInternacao,
            'leitoPaciente': this.leitoPaciente,
            'dataFichaPaciente': this.dataFichaPaciente
            });
        });
      }
    });
  }

  // ngOnInit() {
  //   this.form = new FormGroup({
  //     'nomePaciente': new FormControl(null, {validators: [Validators.required]}),
  //     'matriculaPaciente': new FormControl(null, {validators: [Validators.required]}),
  //     'leitoPaciente': new FormControl(null, {validators: [Validators.required]}),
  //     'dataFichaPaciente': new FormControl(null, {validators: [Validators.required]})
  //   });
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     if (paramMap.has('fichaId')) {
  //       this.mode = 'edit';
  //       this.fichaId = paramMap.get('fichaId');
  //       this.fichasService.getFicha(this.fichaId).subscribe(fichaDados => {
  //         this.ficha = {
  //           id: fichaDados._id,
  //           nome: fichaDados.nome,
  //           matricula: fichaDados.matricula,
  //           leito: fichaDados.leito,
  //           data: fichaDados.data,
  //           percepSens: fichaDados.percepSens,
  //           umidade: fichaDados.umidade,
  //           atividade: fichaDados.atividade,
  //           mobilidade: fichaDados.mobilidade,
  //           nutricao: fichaDados.nutricao,
  //           fricscisal: fichaDados.fricscisal,
  //           score: fichaDados.score
  //         };
  //         this.form.setValue({
  //             'nomePaciente': this.ficha.nome,
  //             'matriculaPaciente': this.ficha.matricula,
  //             'leitoPaciente': this.ficha.leito,
  //             'dataFichaPaciente': this.ficha.data
  //           });
  //       });
  //     } else {
  //       this.mode = 'create';
  //       this.fichaId = null;
  //     }
  //   });
  // }
}

