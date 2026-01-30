import { Component, OnInit } from "@angular/core";
import { PetAdoption } from "../../domain/adoption";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdoptionService } from "./adoption.service";
import { HttpErrorResponse } from "@angular/common/http";
import { AnimalsService } from "../animal/animalService";

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './adoption.html',
  styleUrls: ['./adoption.css'],
})
export class AdoptionComponent implements OnInit {
  public adoptions: PetAdoption[] = [];
  public loading: boolean = true;
  public error: string = '';
  public editAdoption: PetAdoption | null = null;
  public deleteAdoption: PetAdoption | null = null;
  public availableAnimals: any[] = [];
  public selectedAnimalId: number | null = null;


  constructor(private adoptionsService: AdoptionService, private animalService: AnimalsService) {}

    ngOnInit() {
        this.getAdoptions();
    }

    public getAdoptions(): void {
        this.loading = true;
        this.error = '';
        this.adoptionsService.getPending().subscribe({
            next: (response: PetAdoption[]) => {
                this.adoptions = response;
                this.loading = false;
                console.log('Adoptions loaded:', response);
            },
            error: (error: HttpErrorResponse) => {   
                this.loading = false;
                this.error = `Error: ${error.status} - ${error.statusText}`;
                console.error('Error loading adoptions:', error);

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

    public approve(id: number): void {
        this.adoptionsService.approve(id).subscribe({
            next: (response: boolean) => {
                console.log(`Adoption ${id} approved:`, response);
                this.getAdoptions();
            },
            error: (error: HttpErrorResponse) => {
                console.error(`Error approving adoption ${id}:`, error);
            }
        });
    }

    public reject(id: number): void {
        this.adoptionsService.reject(id).subscribe({
            next: (response: boolean) => {
                console.log(`Adoption ${id} rejected:`, response);
                this.getAdoptions();
            },
            error: (error: HttpErrorResponse) => {
                console.error(`Error rejecting adoption ${id}:`, error);
            }
        });
    }

}