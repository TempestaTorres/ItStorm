import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FilterService, FilterType} from '../../services/filter-service';
import {Subscription} from 'rxjs';
import {EaelAccordionService} from '../../services/eael-accordion-service';
import {ActivatedRoute, Router} from '@angular/router';
import {QueryParamTypes} from './queryparam-type';

@Component({
  selector: 'app-featured-filter',
  imports: [],
  templateUrl: './featured-filter.html',
  styleUrl: './featured-filter.css',
})
export class FeaturedFilter implements OnInit, OnDestroy {

  public activeFilters: FilterType[] = [
    {
      id: '',
      name: 'Удалить',
      url: 'remove'
    }
  ]

  public filterTypes: FilterType[] = [];
  public selectedFilters: boolean[] = [];
  public filterOpened: boolean = false;

  private filterSubscription: Subscription | undefined;
  private activeQueryParams: QueryParamTypes = {categories: []};

  @ViewChild('header') header!: ElementRef;

  constructor(private filterService: FilterService, private accordionService: EaelAccordionService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {

    this.filterSubscription = this.filterService.getFilterCategories().subscribe(filterCategories => {
      this.filterTypes = filterCategories;

      for (let i: number = 0; i < this.filterTypes.length; i++) {
        this.selectedFilters[i] = false;
      }

      this.activatedRoute.queryParams.subscribe(params => {

        let sort: string[] = [];

        if (params['categories'] && this.activeFilters.length === 1) {

          sort = params['categories'];

         if (Array.isArray(sort)) {

           for (let i: number = 0; i < this.filterTypes.length; i++) {
             let filterType = this.filterTypes[i].url;

             let found: boolean = sort.some(filter => {
               return filter === filterType;
             })

             if (found) {
               this.selectedFilters[i] = true;
               this.activeFilters.push(this.filterTypes[i]);
             }
           }

         }
         else {
           for (let i: number = 0; i < this.filterTypes.length; i++) {
             let filterType = this.filterTypes[i].url;
             if (filterType === sort) {
               this.selectedFilters[i] = true;
               this.activeFilters.push(this.filterTypes[i]);
             }
           }
         }
        }

      });
    });
  }

  ngOnDestroy() {
    if (this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
  }

  public activeFilterClicked(filterUrl: string): void {

    if (filterUrl !== 'remove') {
      this.activeFilters = this.activeFilters.filter(f => f.url !== filterUrl);

      for (let i: number = 0; i < this.filterTypes.length; i++) {
        if (this.filterTypes[i].url === filterUrl) {
          this.selectedFilters[i] = false;
        }
      }
    }
    else {
      this.activeFilters = this.activeFilters.filter(f => f.url === filterUrl);
      for (let i: number = 0; i < this.selectedFilters.length; i++) {
        if (this.selectedFilters[i]) {
          this.selectedFilters[i] = false;
        }
      }
    }

    if (this.filterOpened && this.activeFilters.length === 1) {
      this.header.nativeElement.click();
    }

    this.updateQueryParams();
  }

  // Accordion
  public onAccordionClick(item: HTMLElement,header: HTMLElement, content: HTMLElement): void {

    this.filterOpened = this.accordionService.onAccordionItemClick(item,header, content);
  }

  public filterClicked(i: number): void {
    this.selectedFilters[i] = !this.selectedFilters[i];

    this.resetFilter(i);
  }

  private resetFilter(i: number): void {

    if (this.selectedFilters[i]) {
      this.activeFilters.push(this.filterTypes[i])
    }
    else {
      this.activeFilterClicked(this.filterTypes[i].url);
    }

    this.updateQueryParams();
  }

  private updateQueryParams(): void {

    this.activeQueryParams.categories = [];

    if (this.activeFilters.length > 1) {

      for (let i: number = 1; i < this.activeFilters.length; i++) {
        this.activeQueryParams.categories[i - 1] = this.activeFilters[i].url;
      }

      this.router.navigate(['/blog'], {
        queryParams: this.activeQueryParams
      }).then(r => {});
    }
    else {
      this.activeQueryParams.categories[0] = 'default';
      this.activeQueryParams.page = 1;

      this.router.navigate(['/blog'], {
        queryParams: this.activeQueryParams
      }).then(r => {});
    }
  }
}
