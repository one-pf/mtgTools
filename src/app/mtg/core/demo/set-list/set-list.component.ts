import { Component, OnInit } from '@angular/core';
import { ScryfallService } from 'src/app/scryfall.service';
import { MtgSet } from 'src/app/mtg-set';
import { MtgCard } from 'src/app/mtg-card';

@Component({
  selector: 'app-set-list',
  templateUrl: './set-list.component.html',
  styleUrls: ['./set-list.component.scss']
})
export class SetListComponent implements OnInit {
  sets: Array<MtgSet> = [];
  selectedSet: MtgSet;
  selectedCard: MtgCard;
  rarityFilter = 'all';
  isLoadingSelectedSet = false;
  cardSet: Array<MtgCard> = [];
  // fields = Object.keys(new MtgSet());
  fields = [
    'block', 'block_code', 'card_count', 'code', 'digital',
    'foil_only', 'icon_svg_uri', 'id', 'mtgo_code', 'name',
    'object', 'released_at', 'scryfall_uri', 'search_uri',
    'set_type', 'tcgplayer_id', 'uri'
  ];

  coreFields = [
    {key: 'name', text: 'Name'},
    {key: 'card_count', text: 'Cards'},
    {key: 'released_at', text: 'Release Date'}
  ];

  constructor(private api: ScryfallService) { }

  ngOnInit() {
    this.api.getSets().subscribe(response => {
      console.log(response);
      this.sets = <Array<MtgSet>> response.body['data'];
    });
  }

  getSets(setType) {
    const filtered = this.sets
      .filter(set => set['set_type'] === setType)
      .sort((a, b) => {
        if (a.released_at > b.released_at) { return 1; }
        if (a.released_at < b.released_at) { return -1; }
        return 0;
      });
    return filtered.reverse();
  }

  getFilteredCardSet() {
    if (this.rarityFilter === 'all') {
      return this.cardSet;
    }
    return this.cardSet.filter(card => {
      return card['rarity'] === this.rarityFilter;
    });
  }

  selectSet(set) {
    this.selectedSet = set;
    console.log(this.selectedSet);
    this.cardSet = [];
    this.isLoadingSelectedSet = true;
    this.loadSelectedSet(set.search_uri);
  }

  selectCard(card) {
    this.selectedCard = card;
  }

  private loadSelectedSet(uri) {
    this.api.getSearchResult(uri).subscribe(response => {
      console.log(response);
      this.cardSet = this.cardSet.concat(<Array<MtgCard>> response['data']);
      if (response['has_more']) {
        console.log('has more');
        this.loadSelectedSet(response['next_page']);
      } else {
        this.cardSet.forEach(card => {
          if (!card['usd']) {
            card['usd'] = '0.00';
          }
        });
        this.cardSet.sort((a, b) => {
          if (+a['usd'] > +b['usd']) { return 1; }
          if (+a['usd'] < +b['usd']) { return -1; }
          return 0;
        }).reverse();
        this.isLoadingSelectedSet = false;
      }
    });
  }
}
