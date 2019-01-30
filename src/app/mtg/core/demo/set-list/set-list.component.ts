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
<<<<<<< HEAD
  setTypeFilter = 'all';
  isLoadingCardSet = false;
=======
  isLoadingSelectedSet = false;
>>>>>>> 99f4dc6aacea819e9316478aab12711212733d8c
  cardSet: Array<MtgCard> = [];
  // fields = Object.keys(new MtgSet());
  fields = [
    'block', 'block_code', 'card_count', 'code', 'digital',
    'foil_only', 'icon_svg_uri', 'id', 'mtgo_code', 'name',
    'object', 'released_at', 'scryfall_uri', 'search_uri',
    'set_type', 'tcgplayer_id', 'uri'
  ];

  coreFields = [
<<<<<<< HEAD
    {key: 'set_type', text: 'Set Type'},
=======
>>>>>>> 99f4dc6aacea819e9316478aab12711212733d8c
    {key: 'name', text: 'Name'},
    {key: 'card_count', text: 'Cards'},
    {key: 'released_at', text: 'Release Date'}
  ];
<<<<<<< HEAD

  setTypes = [
    'core', 'expansion', 'promo', 'box', 'token',
    'planechase', 'archenemy', 'masters', 'masterpiece',
    'commander', 'memorabilia', 'starter', 'duel_deck',
    'spellbook', 'draft_innovation', 'from_the_vault', 'funny'
  ];
=======
>>>>>>> 99f4dc6aacea819e9316478aab12711212733d8c

  constructor(private api: ScryfallService) { }

  ngOnInit() {
    this.api.getSets().subscribe(response => {
      console.log(response);
      this.sets = <Array<MtgSet>> response.body['data'];
    });
  }

  getSets() {
    const filtered = this.sets
<<<<<<< HEAD
      .filter(set => {
        if (this.setTypeFilter === 'all') {
          return true;
        } else {
          return set['set_type'] === this.setTypeFilter;
        }
      })
=======
      .filter(set => set['set_type'] === setType)
>>>>>>> 99f4dc6aacea819e9316478aab12711212733d8c
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
<<<<<<< HEAD
    this.isLoadingCardSet = true;
=======
    this.isLoadingSelectedSet = true;
>>>>>>> 99f4dc6aacea819e9316478aab12711212733d8c
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
<<<<<<< HEAD
        this.isLoadingCardSet = false;
=======
        this.isLoadingSelectedSet = false;
>>>>>>> 99f4dc6aacea819e9316478aab12711212733d8c
      }
    });
  }
}
