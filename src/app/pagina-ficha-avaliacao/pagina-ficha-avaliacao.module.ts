import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PaginaFichaAvaliacaoPage } from './pagina-ficha-avaliacao.page';
import { FichaCreateComponent } from './../fichas/ficha-create/ficha-create.component';
import { MatCardModule, MatInputModule, MatButtonModule, MatToolbarModule, MatDividerModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: PaginaFichaAvaliacaoPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
  ],
  declarations: [
    PaginaFichaAvaliacaoPage,
    FichaCreateComponent
  ]
})
export class PaginaFichaAvaliacaoPageModule {}
