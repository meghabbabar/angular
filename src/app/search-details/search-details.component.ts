import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { SearchResult } from '../shared/search-result';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {

  query = this.actRoute.snapshot.params['query'];
  searchResult : SearchResult;
  config: any;

  constructor(public restApi: RestApiService, public actRoute: ActivatedRoute,
    public router: Router) { 
      
    }

  ngOnInit() {
    // this.restApi.getSearchResult(this.query).subscribe((data: SearchResult) => {
      // this.searchResult = data;
    // }
    // )
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  performSearch(query) {
    console.log("at perform search");
      this.restApi.getSearchResult(query).subscribe(data => {
        this.searchResult = data;
        console.log(data);
        var sample = JSON.stringify(data);
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.searchResult.hits.length
        };
        this.router.navigate(['/search-details'])
      })
  }
  

}
