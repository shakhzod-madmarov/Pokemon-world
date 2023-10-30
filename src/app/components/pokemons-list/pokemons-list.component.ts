import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-pokemons-list',
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css'],
})
export class PokemonsListComponent implements OnInit {
  pokemons: any = [];
  offset: number = 0;
  limit: number = 6;
  originalPokemons: any = [];
  searchQuery: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.dataService
      .getPokemons(this.limit, this.offset)
      .subscribe((response: any) => {
        response.results.forEach((result: { name: string }) => {
          this.dataService
            .getPokemonDetails(result.name)
            .subscribe((uniqueResponse: any) => {
              this.pokemons.push(uniqueResponse);
              this.originalPokemons.push(uniqueResponse);
            });
        });
      });
  }

  getMore() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  onSearch() {
    if (this.searchQuery === '') {
      this.pokemons = this.originalPokemons;
    } else {
      this.pokemons = this.originalPokemons.filter((pokemon: any) => {
        return pokemon.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    }
  }
}
