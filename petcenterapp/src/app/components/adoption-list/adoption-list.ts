import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AnimalsService } from '../animal/animalService';
import { AdoptionService } from '../adoption/adoption.service'; // import your service
import { AuthStateService } from '../../auth/auth.stateservice';

@Component({
  selector: 'app-adoption-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './adoption-list.html',
  styleUrls: ['./adoption-list.css'],
})
export class AdoptionListComponent implements OnInit {

  animals: any[] = [];
  idowner: number = 1;
  constructor(private animalsService: AnimalsService, 
    private adoptionService: AdoptionService,
    private authStateService: AuthStateService) {}

  ngOnInit() {
    const user = this.authStateService.getUser();
    this.loadAnimals();
    //this.idowner = user ? user.id : null;

  }

  loadAnimals() {
    this.animalsService.getAnimals().subscribe((data: any[]) => {
      this.animals = data;
    });
  }

  apply(animalId: number) {
    console.log('Applying for adoption:', { animalId, idowner: this.idowner });
    if (!this.idowner) {
      alert('Owner not set!');
      return;
    }

    this.adoptionService.apply(this.idowner, animalId).subscribe({
      next: (res) => {
        alert('Adoption request sent!');
        console.log('Adoption saved:', res);
      },
      error: (err) => {
        console.error('Error applying for adoption:', err);
        alert('Error sending adoption request');
      }
    });
  }
}
