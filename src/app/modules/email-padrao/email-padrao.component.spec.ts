import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPadraoComponent } from './email-padrao.component';

describe('EmailPadraoComponent', () => {
  let component: EmailPadraoComponent;
  let fixture: ComponentFixture<EmailPadraoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailPadraoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailPadraoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
