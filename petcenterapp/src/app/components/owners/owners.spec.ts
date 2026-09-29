import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OwnersComponent } from './owners.component';
import { OwnersService } from './owners.service';
import { AdoptionService } from '../adoption/adoption.service';

describe('OwnersComponent', () => {
  let component: OwnersComponent;
  let fixture: ComponentFixture<OwnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnersComponent],
      providers: [
        { provide: OwnersService, useValue: { getOwners: () => of([]) } },
        { provide: AdoptionService, useValue: { getPending: () => of([]) } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
