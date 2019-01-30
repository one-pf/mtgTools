import { Component, OnInit } from '@angular/core';
import { ScryfallService } from 'src/app/scryfall.service';
import { MtgSet } from 'src/app/mtg-set';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent implements OnInit {
  sets: Array<MtgSet> = [];
  // fields = Object.keys(new MtgSet());
  fields = [
    'block', 'block_code', 'card_count', 'code', 'digital',
    'foil_only', 'icon_svg_uri', 'id', 'mtgo_code', 'name',
    'object', 'released_at', 'scryfall_uri', 'search_uri',
    'set_type', 'tcgplayer_id', 'uri'
  ];

  coreFields = ['name', 'card_count', 'released_at'];

  constructor(private api: ScryfallService) { }

  ngOnInit() {
    this.api.getSets().subscribe(response => {
      console.log(response);
      this.sets = <Array<MtgSet>> response.body['data'];
    });
  }

  getSets(setType) {
    const filtered = this.sets
      .filter(set => set['set_type'] === 'core')
      .sort((a, b) => {
        if (a.released_at > b.released_at) { return 1; }
        if (a.released_at < b.released_at) { return -1; }
        return 0;
      });
    return filtered.reverse();
  }
}
