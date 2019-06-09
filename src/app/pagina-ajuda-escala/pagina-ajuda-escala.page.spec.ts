import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAjudaEscalaPage } from './pagina-ajuda-escala.page';

describe('PaginaAjudaEscalaPage', () => {
  let component: PaginaAjudaEscalaPage;
  let fixture: ComponentFixture<PaginaAjudaEscalaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaAjudaEscalaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAjudaEscalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
