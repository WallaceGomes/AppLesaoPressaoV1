import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaListarPacientesPage } from './pagina-listar-pacientes.page';

describe('PaginaListarPacientesPage', () => {
  let component: PaginaListarPacientesPage;
  let fixture: ComponentFixture<PaginaListarPacientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaListarPacientesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaListarPacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
