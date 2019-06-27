import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-cadastro-pacientes',
  templateUrl: './pagina-cadastro-pacientes.page.html',
  styleUrls: ['./pagina-cadastro-pacientes.page.scss'],
})
export class PaginaCadastroPacientesPage implements OnInit {

  paginas : any[] = [
    {title: "Início", icon: "home", url: "/home"},
    {title: "Ver pacientes", icon: "filing", url: "/pagina-listar-pacientes"},
    {title: "Exibir fichas", icon: "document", url: "/pagina-listar-fichas"},
    {title: "Estatísticas", icon: "analytics", url: "/pagina-base-dados"}
  ];

  constructor() { }

  ngOnInit() {
  }
}
