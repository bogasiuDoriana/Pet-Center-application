import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimalsService } from './animalService';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Animal } from '../../domain/animal';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-animal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animal.html',
  styleUrls: ['./animal.css'],
})
export class AnimalComponent implements OnInit {
  public animals: Animal[] = [];
  public loading: boolean = true;
  public error: string = '';
  public editAnimal: Animal | null = null;
  public deleteAnimal: Animal | null = null;

  constructor(private animalsService: AnimalsService) {}

  ngOnInit() {
    this.getAnimals();
  }
  
  public getAnimals(): void {
    this.loading = true;
    this.error = '';

    this.animalsService.getAnimals().subscribe({
      next: (response: Animal[]) => {
        this.animals = response;
        this.loading = false;
        console.log('Animals loaded:', response);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.error = error.message;
        console.error('Error loading animals:', error);

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

  public searchAnimals(key: string): void {

    const result: Animal[] = [];
    for (const animal of this.animals) {
      if (animal.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        result.push(animal);
      } 
    }
    this.animals = result;
    if (result.length === 0 || !key) {
      this.getAnimals();
    } 
  }

  public onOpenModal(animal: Animal | null, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    const modal = new Modal(document.getElementById('addAnimalModal')!);
    modal.show();
  } 
  else if (mode === 'edit') {
    this.editAnimal = animal ? {...animal} : null; // Create a copy
    const modal = new Modal(document.getElementById('updateAnimalModal')!);
    modal.show();
  } 
  else if (mode === 'delete') {
    this.deleteAnimal = animal ? {...animal} : null;
    const modal = new Modal(document.getElementById('deleteAnimalModal')!);
    modal.show();
  }
  container?.appendChild(button);
  button.click();
}


  public onAddAnimal(addForm: any): void {
    document.getElementById('add-animal-form')?.click();
      this.animalsService.addAnimal(addForm.value).subscribe(
        (response: Animal) => {
          console.log(response);
          this.getAnimals();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }

public onUpdateAnimal(): void {
  if (!this.editAnimal) return;

  this.animalsService.updateAnimal(this.editAnimal).subscribe({
    next: () => this.getAnimals(),
    error: err => alert(err.message)
  });
}


 public onDeleteAnimal(): void {
  console.log('Deleting animal:', this.deleteAnimal);
  if (!this.deleteAnimal?.idAnimal) return;

  this.animalsService.deleteAnimal(this.deleteAnimal.idAnimal).subscribe({
    next: () => {
      const modalEl = document.getElementById('deleteAnimalModal');
      if (modalEl) {
        const modal = Modal.getInstance(modalEl);
        if (modal) {
          modal.hide();
        }
      }
      
      this.getAnimals();
      this.deleteAnimal = null;
    },
    error: (err) => {
      alert(err.message);
      const modalEl = document.getElementById('deleteAnimalModal');
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