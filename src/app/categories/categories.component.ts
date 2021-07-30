import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from './../services/api-service.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
categories:any;
searchInput:any;
searchResults:any;
showSearchResult:boolean=false;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {

  	this.apiService.getCategories().subscribe((data)=>{
  		console.log(data);
  		this.categories = data['categories'];
  	},
  	err=>{

  	});
  }
  doSearch(event){
  	console.log(this.searchInput);
  	if(this.searchInput){
	  		this.apiService.doSearch(this.searchInput).subscribe((data)=>{
	  		console.log(data);
	  		this.showSearchResult = true;
	  		this.searchResults = data['meals'];
	  	},
	  	err=>{

	  	});
  	}
  	else{
  		this.showSearchResult = false;
  	}
  	
  }

}
