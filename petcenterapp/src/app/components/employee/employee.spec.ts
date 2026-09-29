import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './employee.service';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeComponent],
      providers: [
        { provide: EmployeeService, useValue: { getEmployees: () => of([]) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
