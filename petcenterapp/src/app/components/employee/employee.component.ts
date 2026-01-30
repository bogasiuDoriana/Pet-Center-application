import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Owners } from '../../domain/employee';


@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css'],
})
export class EmployeeComponent implements OnInit {
public employees: Owners[] = [];  
  public loading: boolean = true;
  public error: string = '';
  public editEmployee: Owners | null = null;
  public deleteEmployee: Owners | null = null;


  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.loading = true;
    this.error = '';
    
    this.employeeService.getEmployees().subscribe({
      next: (response: Owners[]) => {
        this.employees = response;
        this.loading = false;
        console.log('Employees loaded:', response);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.error = error.message;
        console.error('Error loading employees:', error);
        
        if (error.status === 404) {
          this.error = 'API endpoint not found. Please check if the backend server is running.';
        } else if (error.status === 0) {
          this.error = 'Cannot connect to server. Make sure your backend is running on localhost:8080';
        } else {
          this.error = `Error: ${error.message}`;
        }
      }
    });
  }

  public searchEmployees(key: string): void{

    const result: Owners [] = [];
    for( const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        result.push(employee);
      }
    }
    this.employees = result;
    if(result.length === 0 || !key){
      this.getEmployees();
    }
  }
  
  public onOpenModal(employee: Owners | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: any): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Owners) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee: Owners): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Owners) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

public onDeleteEmployee(idemployee: number): void {
  this.employeeService.deleteEmployee(idemployee).subscribe(
    (response: void) => {
      console.log(response);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
}
