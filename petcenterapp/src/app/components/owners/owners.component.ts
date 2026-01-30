import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwnersService } from './owners.service';
import { Owners } from '../../domain/owners';
import { AdoptionService} from '../adoption/adoption.service';
import { PetAdoption } from '../../domain/adoption';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-owners',
  imports: [CommonModule, FormsModule],
  templateUrl: './owners.html',
  styleUrls: ['./owners.css'],
})
export class OwnersComponent implements OnInit{

  public owners: Owners[] = [];
  public loading: boolean = true;
  public error: string = '';
  private OwnersService: OwnersService;
  pendingAdoptions: PetAdoption[] = [];
  ownerAdoptions: { [ownerId: number]: PetAdoption[] } = {};
  ownerPendingVisible: { [key: number]: boolean } = {};


  public editOwners: Owners | null = null;
  public deleteOwners: Owners | null = null;

  constructor(private ownersService: OwnersService, private adoptionService: AdoptionService) {
    this.OwnersService = ownersService;
  }

ngOnInit() {
      this.getOwners();
      this.loadPendingAdoptions();
}

loadPendingAdoptions(): void {
  this.adoptionService.getPending().subscribe(data => {
    this.pendingAdoptions = data;
    this.groupAdoptionsByOwner();
  });
}


  approve(adoption: PetAdoption): void {
  this.adoptionService.approve(adoption.idpet_adoption).subscribe(() => {
    alert(`${adoption.owner.name} adopted ${adoption.animal.name}!`);
    this.loadPendingAdoptions();
  });
}

reject(adoption: PetAdoption): void {
  this.adoptionService.reject(adoption.idpet_adoption).subscribe(() => {
    alert(`Adoption request rejected`);
    this.loadPendingAdoptions(); 
  });
}

togglePending(ownerId: number) {
  this.ownerPendingVisible[ownerId] = !this.ownerPendingVisible[ownerId];
}

private groupAdoptionsByOwner(): void {
  this.ownerAdoptions = {};
  this.ownerPendingVisible = {};

  for (const adoption of this.pendingAdoptions) {
    const ownerId = adoption.owner.idowner;

    if (!this.ownerAdoptions[ownerId]) {
      this.ownerAdoptions[ownerId] = [];
      this.ownerPendingVisible[ownerId] = false; 
    }

    this.ownerAdoptions[ownerId].push(adoption);
  }
}


public getOwners(): void {
    this.loading = true;
    this.error = '';

    this.OwnersService.getOwners().subscribe({
      next: (response: Owners[]) => {
        this.owners = response;
        this.loading = false;
        console.log('Owners loaded:', response);
        this.loadPendingAdoptions();
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.error = error.message;
        console.error('Error loading owners:', error);
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


    public searchOwners(key: string): void{
  
      const result: Owners [] = [];
      for( const owner of this.owners){
        if(owner.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
          result.push(owner);
        }
      }
      this.owners = result;
      if(result.length === 0 || !key){
        this.getOwners();
      }
    }

  public onOpenModal(owner: Owners | null, mode: string): void {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addOwnerModal');
      }
      if (mode === 'edit') {
        this.editOwners = owner;
        button.setAttribute('data-target', '#updateOwnerModal');
      }
      if (mode === 'delete') {
        this.deleteOwners = owner;
        button.setAttribute('data-target', '#deleteOwnerModal');
      }
  
      container?.appendChild(button);
      button.click();
    }
  
    public onAddOwner(addForm: any): void {
      document.getElementById('add-owner-form')?.click();
      this.ownersService.addOwners(addForm.value).subscribe(
        (response: Owners) => {
          console.log(response);
          this.getOwners();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    }
  
    public onUpdateOwner(owner: Owners): void {
      this.ownersService.updateOwners(owner).subscribe(
        (response: Owners) => {
          console.log(response);
          this.getOwners();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  
  public onDeleteOwner(idowner: number): void {
    this.ownersService.deleteOwners(idowner).subscribe(
      (response: void) => {
        console.log(response);
        this.getOwners();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
