import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth-guard';
import { PercepSensDuvidaComponent } from './ajuda/percepsens/percepsens-duvida.component';
import { UmidadeDuvidaComponent } from './ajuda/umidade/umidade-duvida.component';
import { AtividadeDuvidaComponent } from './ajuda/atividade/atividade-duvida.component';
import { MobilidadeDuvidaComponent } from './ajuda/mobilidade/mobilidade-duvida.component';
import { NutricaoDuvidaComponent } from './ajuda/nutricao/nutricao-duvida.component';
import { FricsisDuvidaComponent } from './ajuda/fricsis/fricsis-duvida.component';
import { GraficoPacientesComponent } from './analises/graficos/grafico-pacientes.component';
import { ManejoUmidadeDuvidaComponent } from './ajuda/manejoumidade/umidade-manejo-duvida.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'pagina-ficha-avaliacao', loadChildren: './pagina-ficha-avaliacao/pagina-ficha-avaliacao.module#PaginaFichaAvaliacaoPageModule',
  canActivate: [AuthGuard] },
  { path: 'editar/:fichaId', loadChildren: './pagina-ficha-avaliacao/pagina-ficha-avaliacao.module#PaginaFichaAvaliacaoPageModule',
  canActivate: [AuthGuard]  },
  { path: 'gerarficha/:pacienteId', loadChildren: './pagina-ficha-avaliacao/pagina-ficha-avaliacao.module#PaginaFichaAvaliacaoPageModule',
  canActivate: [AuthGuard]  },
  { path: 'pagina-base-dados', loadChildren: './pagina-base-dados/pagina-base-dados.module#PaginaBaseDadosPageModule',
  canActivate: [AuthGuard]  },
  { path: 'pagina-login', loadChildren: './pagina-login/pagina-login.module#PaginaLoginPageModule' },
  { path: 'pagina-cadastro', loadChildren: './pagina-cadastro/pagina-cadastro.module#PaginaCadastroPageModule' },
  { path: 'pagina-listar-fichas', loadChildren: './pagina-listar-fichas/pagina-listar-fichas.module#PaginaListarFichasPageModule' },
  { path: 'pagina-cadastro-pacientes',
  loadChildren: './pagina-cadastro-pacientes/pagina-cadastro-pacientes.module#PaginaCadastroPacientesPageModule' },
  { path: 'pagina-listar-pacientes',
  loadChildren: './pagina-listar-pacientes/pagina-listar-pacientes.module#PaginaListarPacientesPageModule' },
  { path: 'pagina-ver-graficos', loadChildren: './pagina-ver-graficos/pagina-ver-graficos.module#PaginaVerGraficosPageModule' },
  { path: 'pagina-ajuda-escala', loadChildren: './pagina-ajuda-escala/pagina-ajuda-escala.module#PaginaAjudaEscalaPageModule' },
  { path: 'percepsens', component: PercepSensDuvidaComponent},
  { path: 'umidade', component: UmidadeDuvidaComponent},
  { path: 'atividade', component: AtividadeDuvidaComponent},
  { path: 'mobilidade', component: MobilidadeDuvidaComponent},
  { path: 'nutricao', component: NutricaoDuvidaComponent},
  { path: 'fricsis', component: FricsisDuvidaComponent},
  { path: 'manejoumidade', component: ManejoUmidadeDuvidaComponent},
  { path: 'gerargrafico/:matricula', component: GraficoPacientesComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
