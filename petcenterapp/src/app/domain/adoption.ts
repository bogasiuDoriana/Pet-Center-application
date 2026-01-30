export interface PetAdoption {
  idpet_adoption: number;
  aplication_date: string;  
  status: string;

  owner: {
    idowner: number;
    name: string;
    surname: string;
  };

  animal: {
    name: string;
    specie: string;
  };
}
