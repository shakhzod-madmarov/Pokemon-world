import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/sevices/data.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const pokemonId = params['id'];
      this.dataService
        .getPokemonDetails(pokemonId)
        .subscribe((response: any) => {
          this.pokemon = response;
        });
    });
  }
  getStat(statName: string): number | undefined {
    const stat = this.pokemon.stats.find((s: any) => s.stat.name === statName);
    return stat ? stat.base_stat : undefined;
  }
}
