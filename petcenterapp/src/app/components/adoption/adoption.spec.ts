import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AdoptionComponent } from './adoption.component';
import { AdoptionService } from './adoption.service';
import { AnimalsService } from '../animal/animalService';

describe('AdoptionComponent', () => {
  let component: AdoptionComponent;
  let fixture: ComponentFixture<AdoptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionComponent],
      providers: [
        { provide: AdoptionService, useValue: { getPending: () => of([]) } },
        { provide: AnimalsService, useValue: { getAnimals: () => of([]) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
