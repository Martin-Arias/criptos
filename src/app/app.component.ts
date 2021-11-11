import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Coin } from './coin';
import { ApiService } from './api.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{

	coins: Coin[] = []
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	/* Columnas de la tsabla */
	public displayedColumns = ['image','name', 'symbol', 'current_price', 'price_change_percentage_24h','total_volume'];

	/* Datos de la tabla */
	public dataSource = new MatTableDataSource<Coin>();

	constructor(private coinApiService: ApiService){
	}
	ngAfterViewInit() {
		this.dataSource.sort = this.sort
		this.dataSource.paginator = this.paginator;
	}
	ngOnInit() {
		//call this method on component load
		this.getCoinsInformation();
	}
	getCoinsInformation() {
		this.coinApiService.getCoinsInformation()
			.subscribe((res) => {
				console.log(res);
				this.dataSource.data = res;
			})
	}
	announceSortChange() {
	}
}
