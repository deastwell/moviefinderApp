import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { ApiResult } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: ApiResult['results'] = [];
  currentPage = 1;


  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {

    this.loadMovies();
    
  }

  async loadMovies(){

    const loading = await this.loadingCtrl.create({
      message: 'Cargando...', 
      spinner: 'bubbles', 
      translucent: true, 
    });
    await loading.present();

    this.movieService.getTopRatedMovies(this.currentPage).subscribe((res) =>{
      loading.dismiss();
      this.movies = [...this.movies, ...res.results];
      console.log(this.movies); // Log the movies array here
      console.log(res);
    });
  }

}
