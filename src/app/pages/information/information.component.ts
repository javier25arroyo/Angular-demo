import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

interface Album {
  title: string;
  year: number;
  tracks?: string[];
  coverUrl?: string;
}

@Component({
  selector: 'app-information',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent {
  bandName: string = 'Foster the People';
  origin: string = 'Los Ángeles, California, EE. UU.';
  genres: string[] = ['Indie pop', 'Rock alternativo', 'Pop psicodélico', 'Dance-pop'];
  yearsActive: string = '2009–presente';
  
  currentMembers: { name: string, role: string }[] = [
    { name: 'Mark Foster', role: 'Voz principal, guitarras, teclados, sintetizadores' },
    { name: 'Isom Innis', role: 'Teclados, piano, guitarras, bajo, batería, percusión, coros' }
  ];
  
  pastMembers: { name: string, role: string }[] = [
    { name: 'Mark Pontius', role: 'Batería, percusión, coros (2009–2021)' },
    { name: 'Cubbie Fink', role: 'Bajo, coros (2009–2015)' },
    { name: 'Sean Cimino', role: 'Guitarras, teclados, sintetizadores, coros (miembro de gira/sesión 2010–2017; oficial 2017–2020)' }
  ];

  description: string = `Foster the People es una banda estadounidense de indie pop formada en Los Ángeles, California, en 2009. 
  El grupo está compuesto por el vocalista Mark Foster y el multiinstrumentista Isom Innis. El ex baterista Mark Pontius dejó la banda en 2021.
  Alcanzaron la fama con su exitoso sencillo "Pumped Up Kicks", que se convirtió en un éxito viral en 2010 y les ayudó a conseguir un contrato con Startime International, una filial de Columbia Records. 
  Su álbum debut, Torches, lanzado en 2011, incluyó éxitos como "Helena Beat" y "Don't Stop (Color on the Walls)". 
  La banda ha explorado diversos sonidos a lo largo de su carrera, incorporando elementos de rock psicodélico, funk y electrónica en sus álbumes posteriores.`;

  studioAlbums: Album[] = [
    { 
      title: 'Torches', 
      year: 2011, 
      tracks: ['Helena Beat', 'Pumped Up Kicks', 'Call It What You Want', 'Don\'t Stop (Color on the Walls)', 'Waste', 'I Would Do Anything for You', 'Houdini', 'Life on the Nickel', 'Missed You', 'Warrant'],
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5c/FosterThePeopleTorches.jpg'
    },
    { 
      title: 'Supermodel', 
      year: 2014, 
      tracks: ['Are You What You Want to Be?', 'Ask Yourself', 'Coming of Age', 'Nevermind', 'Pseudologia Fantastica', 'Best Friend', 'A Beginner\'s Guide to Destroying the Moon', 'Goats in Trees', 'The Truth', 'Fire Escape'],
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ab/Foster_the_People_-_Supermodel.png'
    },
    { 
      title: 'Sacred Hearts Club', 
      year: 2017, 
      tracks: ['Pay the Man', 'Doing It for the Money', 'Sit Next to Me', 'SHC', 'I Love My Friends', 'Static Space Lover', 'Lotus Eater', 'Loyal Like Sid & Nancy'],
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/7/79/Sacred_Hearts_Club_Cover.jpg'
    },
    {
      title: 'Paradise State of Mind',
      year: 2024,
      tracks: ['Lost in Space', 'Take Me Back', 'Let Go', 'Chariot', 'Under the Moon'], // Ejemplo, verificar tracklist oficial
      coverUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Foster_the_People_-_Paradise_State_of_Mind.png/220px-Foster_the_People_-_Paradise_State_of_Mind.png' // URL de ejemplo
    }
  ];
  
  bandImageUrl: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Foster_the_People_performing_at_Lollapalooza_Chile_2019.jpg/1024px-Foster_the_People_performing_at_Lollapalooza_Chile_2019.jpg';

  constructor() { }
}