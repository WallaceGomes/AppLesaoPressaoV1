import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FichasService } from '../fichas.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Ficha } from './../ficha.model';

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
  private ficha: Ficha;
  form: FormGroup;
  private mode = 'create';
  private fichaId: string;

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
    if (this.mode === 'create') {
      this.fichasService.addFicha(
        this.form.value.nomePaciente,
        this.form.value.matriculaPaciente,
        this.form.value.leitoPaciente,
        this.form.value.dataFichaPaciente,
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
        this.form.value.nomePaciente,
        this.form.value.matriculaPaciente,
        this.form.value.leitoPaciente,
        this.form.value.dataFichaPaciente,
        this.scorePercepSens,
        this.scoreUmidade,
        this.scoreAtividade,
        this.scoreMobilidade,
        this.scoreNutricao,
        this.scoreFricCis,
        this.score
      );
    }
    this.form.reset();
  }

  constructor(public fichasService: FichasService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      'nomePaciente': new FormControl(null, {validators: [Validators.required]}),
      'matriculaPaciente': new FormControl(null, {validators: [Validators.required]}),
      'leitoPaciente': new FormControl(null, {validators: [Validators.required]}),
      'dataFichaPaciente': new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('fichaId')) {
        this.mode = 'edit';
        this.fichaId = paramMap.get('fichaId');
        this.fichasService.getFicha(this.fichaId).subscribe(dadosFicha => {
          this.ficha = {
            id: dadosFicha._id,
            nome: dadosFicha.nome,
            matricula: dadosFicha.matricula,
            leito: dadosFicha.leito,
            data: dadosFicha.data,
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
            'leitoPaciente': this.ficha.leito,
            'dataFichaPaciente': this.ficha.data
          });
        });
      } else {
        this.mode = 'create';
        this.fichaId = null;
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
