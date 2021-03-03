import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService, Heroe } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private heroesSearched: Heroe[] = [];
  private termino = '';
  constructor(private activatedRoute: ActivatedRoute, private heroesService: HeroesService) {

   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
    this.termino = params.termino;
    this.heroesSearched = this.heroesService.buscarHeroes(params.termino);

    });
  }
  getHeroesSearched(): Heroe[]{
    return this.heroesSearched;
  }
  getTermino(): string{
    return this.termino;
  }

}
