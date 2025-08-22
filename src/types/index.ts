export interface Pet {
  id: string;
  name: string;
  species: string;
  breed?: string;
  age: number;
}

export interface Appointment {
  id: string;
  date: string; // ISO format
  vet: string;
  notes?: string;
  petId: string;
  pet?: Pet; // Optional when returned in nested query
}
