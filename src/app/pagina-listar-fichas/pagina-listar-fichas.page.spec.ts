import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaListarFichasPage } from './pagina-listar-fichas.page';

describe('PaginaListarFichasPage', () => {
  let component: PaginaListarFichasPage;
  let fixture: ComponentFixture<PaginaListarFichasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaListarFichasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaListarFichasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
