import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCadastroPage } from './pagina-cadastro.page';

describe('PaginaCadastroPage', () => {
  let component: PaginaCadastroPage;
  let fixture: ComponentFixture<PaginaCadastroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCadastroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
