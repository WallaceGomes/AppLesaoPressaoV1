import { Component, OnInit } from '@angular/core';
import { FichasService } from '../fichas/fichas.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pagina-ver-graficos',
  templateUrl: './pagina-ver-graficos.page.html',
  styleUrls: ['./pagina-ver-graficos.page.scss'],
})
export class PaginaVerGraficosPage implements OnInit {

  chart = this.fichasService.chart;

  constructor(public fichasService: FichasService) { }

  ngOnInit() {
  }

  mostrarChart() {
    this.chart = this.fichasService.chart;
  }
}
