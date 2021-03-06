import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaginaAjudaEscalaPage } from './pagina-ajuda-escala.page';
import { MatButtonModule, MatExpansionModule, MatPaginatorModule, MatListModule, MatCardModule } from '@angular/material';
import { ListaDuvidasEscalaBraden } from '../ajuda/escala-braden/escala-braden.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaAjudaEscalaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatButtonModule,
    MatPaginatorModule,
    MatListModule,
    MatCardModule
  ],
  declarations: [PaginaAjudaEscalaPage, ListaDuvidasEscalaBraden]
})
export class PaginaAjudaEscalaPageModule {}
