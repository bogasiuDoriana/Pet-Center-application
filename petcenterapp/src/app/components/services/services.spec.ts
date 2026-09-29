import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ServicesComponent } from './services.component';
import { ServicesService } from './services.service';

describe('ServicesComponent', () => {
  let component: ServicesComponent;
  let fixture: ComponentFixture<ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [
        { provide: ServicesService, useValue: { getServices: () => of([]) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
