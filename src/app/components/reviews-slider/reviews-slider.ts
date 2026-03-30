import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {SlickService} from '../../services/slick-service';

@Component({
  selector: 'app-reviews-slider',
  imports: [],
  templateUrl: './reviews-slider.html',
  styleUrl: './reviews-slider.css',
})
export class ReviewsSlider implements AfterViewInit, OnDestroy {

  public reviews = [
    {
      name: 'Аделина',
      dec: 'Mad Jun Модель',
      image: '/assets/images/reviews/Review-1.jpg',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Яника',
      dec: 'Mad Jun Модель',
      image: '/assets/images/reviews/Review-2.jpg',
      text: "Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть."
    },
    {
      name: 'Марина',
      dec: 'Mad Jun Модель',
      image: '/assets/images/reviews/Review-3.jpg',
      text: "Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!"
    },
    {
      name: 'Вика',
      dec: 'Mad Jun Модель',
      image: '/assets/images/reviews/Vika.jpg',
      text: "Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!"
    },
    {
      name: 'Ирина',
      dec: 'Mad Jun Модель',
      image: '/assets/images/reviews/Review-4.png',
      text: "Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!"
    },
    {
      name: 'Анастасия',
      dec: 'Mad Jun Модель',
      image: '/assets/images/reviews/Review-6.png',
      text: "Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!"
    },
  ]

  private slick: any;

  constructor(private slickService: SlickService) {
  }

  ngAfterViewInit(): void {
    this.slick = this.slickService.slickTestimonialsMount('testimonial-slider');
  }

  ngOnDestroy(): void {
    if (this.slick) {
      this.slickService.unslick(this.slick);
    }
  }
}
