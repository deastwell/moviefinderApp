import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { ApiResult } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: ApiResult['results'] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;


  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.loadMovies();
    
  }

  async loadMovies(event?: InfiniteScrollCustomEvent){

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...', 
      spinner: 'bubbles', 
      translucent: true, 
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) =>{
      loading.dismiss();
      //this.movies = [...this.movies, ...res.results];
      this.movies.push(...res.results);
      console.log(this.movies); 
      console.log(res);

      event?.target.complete();
    });
  }

  loadMore(event: InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadMovies(event);
  }

}
