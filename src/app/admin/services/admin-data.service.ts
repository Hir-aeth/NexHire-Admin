import { Injectable } from '@angular/core';

export interface Entreprise {
  id: number;
  nom: string;
  secteur: string;
  recruteur: string;
  candidatures: number;
  statut: 'Actif' | 'Inactif';
}

export interface Recruteur {
  id: number;
  nom: string;
  email: string;
  entreprise: string;
  statut: 'Actif' | 'Inactif';
}

export interface Forum {
  nom: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  description: string;
  statut: string;
}

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  forum: Forum = {
    nom: 'Forum Emploi EST Kenitra 2025',
    dateDebut: '29/04/2026',
    dateFin: '30/04/2026',
    lieu: 'EST Kenitra',
    description: "Forum de l'emploi annuel organisé à l'École Supérieure de Technologie de Kénitra.",
    statut: 'Actif'
  };

  entreprises: Entreprise[] = [
    { id: 1, nom: 'TechMaroc', secteur: 'Technologie', recruteur: 'Ahmed Benali', candidatures: 18, statut: 'Actif' },
    { id: 2, nom: 'InnoSoft', secteur: 'Logiciel', recruteur: 'Sara El Idrissi', candidatures: 12, statut: 'Actif' },
    { id: 3, nom: 'DataFlow Systems', secteur: 'Data', recruteur: 'Karim Tazi', candidatures: 9, statut: 'Inactif' },
    { id: 4, nom: 'CloudNet', secteur: 'Cloud', recruteur: 'Fatima Zahra', candidatures: 15, statut: 'Actif' },
    { id: 5, nom: 'BioTech Maroc', secteur: 'Biotechnologie', recruteur: 'Omar Hassani', candidatures: 13, statut: 'Inactif' }
  ];

  recruteurs: Recruteur[] = [
    { id: 1, nom: 'Ahmed Benali', email: 'ahmed@techmaroc.ma', entreprise: 'TechMaroc', statut: 'Actif' },
    { id: 2, nom: 'Sara El Idrissi', email: 'sara@innosoft.ma', entreprise: 'InnoSoft', statut: 'Actif' },
    { id: 3, nom: 'Karim Tazi', email: 'karim@dataflow.ma', entreprise: 'DataFlow Systems', statut: 'Inactif' },
    { id: 4, nom: 'Fatima Zahra', email: 'fatima@cloudnet.ma', entreprise: 'CloudNet', statut: 'Actif' },
    { id: 5, nom: 'Omar Hassani', email: 'omar@biotech.ma', entreprise: 'BioTech Maroc', statut: 'Inactif' }
  ];

  getTotalCandidatures(): number {
    return this.entreprises.reduce((sum, e) => sum + e.candidatures, 0);
  }
}
