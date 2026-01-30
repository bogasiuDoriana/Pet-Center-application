import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from './services.service';
import { Services } from '../../domain/services';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements OnInit{

  public services: Services[] = [];
  public loading: boolean = true;
  public error: string = '';
  public editServices: Services | null = null;
  public deleteServices: Services | null = null;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.getServices();
  }


  public getServices(): void {
    this.loading = true;
    this.error = '';
    this.servicesService.getServices().subscribe({
      next: (response: Services[]) => {
        this.services = response;
        this.loading = false;
        console.log('Services loaded:', response);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.error = error.message;
        console.error('Error loading services:', error);

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

    searchServices(key: string): void {
      const result: Services[] = [];
      for (const service of this.services) {
        if (service.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          result.push(service);
        }
      }
    }
    onOpenModal(services: Services | null, mode: string): void {
      const container = document.getElementById('main-container');
          const button = document.createElement('button');
          button.type = 'button';
          button.style.display = 'none';
          button.setAttribute('data-toggle', 'modal');
          if (mode === 'add') {
            const modal = new Modal(document.getElementById('addServiceModal')!);
            modal.show();
          } 
          else if (mode === 'edit') {
            this.editServices = services ? {...services} : null; // Create a copy
            const modal = new Modal(document.getElementById('updateServiceModal')!);
            modal.show();
          } 
          else if (mode === 'delete') {
            this.deleteServices = services ? {...services} : null;
            const modal = new Modal(document.getElementById('deleteServiceModal')!);
            modal.show();
          }
          container?.appendChild(button);
          button.click();
    }



    public onAddServices(addForm: any): void {
        document.getElementById('add-service-form')?.click();
              this.servicesService.addServices(addForm.value).subscribe(
                (response: Services) => {
                  console.log(response);
                  this.getServices();
                  addForm.reset();
                },
                (error: HttpErrorResponse) => {
                  alert(error.message);
                  addForm.reset();
                }
              );
      }
    
      public onUpdateServices(): void {
        if (!this.editServices)  return;

        this.servicesService.updateServices(this.editServices).subscribe({
          next: () => this.getServices(),
          error: err => alert(err.message)
        });
      }
    
      public onDeleteServices(): void{
      if (!this.deleteServices?.idservices) return;

      this.servicesService.deleteServices(this.deleteServices.idservices).subscribe({
        next: () => {
          const modalEl = document.getElementById('deleteServiceModal');
          if (modalEl) {
            const modal = Modal.getInstance(modalEl);
            if (modal) {
              modal.hide();
            }
          }

          this.getServices();
          this.deleteServices = null;
        },
        error: (err) => {
          alert(err.message);
          const modalEl = document.getElementById('deleteServiceModal');
          if (modalEl) {
            const modal = Modal.getInstance(modalEl);
            if (modal) {
              modal.hide();
            }
          }
        }
      });
    
    }
}
