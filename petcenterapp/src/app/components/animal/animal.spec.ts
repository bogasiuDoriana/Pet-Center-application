import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AnimalComponent } from './animal.component';
import { AnimalsService } from './animalService';

describe('AnimalComponent', () => {
  let component: AnimalComponent;
  let fixture: ComponentFixture<AnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalComponent],
      providers: [
        { provide: AnimalsService, useValue: { getAnimals: () => of([]) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
