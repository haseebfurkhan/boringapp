import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filterQueryId } from '@angular/core/src/view/util';

export interface SearchFilter {
  type: string;
  participants: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface BoredObject {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  key: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'D o  i T';
  animation = 'fadeInUp';
  gradient = 'gradient--default';
  filter: SearchFilter = { type: 'Random', participants: '1' };
  activity = '';

  // Initilize Department Class
  categories: Category[] = [
    { id: 0, name: 'Random' },
    { id: 1, name: 'Education' },
    { id: 2, name: 'Recreation' },
    { id: 3, name: 'Social' },
    { id: 4, name: 'DIY' },
    { id: 5, name: 'Charity' },
    { id: 6, name: 'Cooking' },
    { id: 7, name: 'Relaxation' },
    { id: 8, name: 'Music' },
    { id: 9, name: 'Busywork' },
  ];

  @HostListener('window:keydown.space') spaceEvent() {
    this.animation = '';
    this.gradient = this.refreshGradient();
    this.animation = this.refreshAnimation();
    this.getActivity();
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    particlesJS.load('particles-js', '../assets/data/particles.json', null);
    this.getActivity();
  }

  getActivity() {
    this.httpClient.get(this.getURL()).subscribe((res: BoredObject) => {
      console.log(res);
      this.activity = res.activity;
    });
  }

  getURL() {
    let url = 'https://www.boredapi.com/api/activity/';

    if (this.filter.type === 'Random') {
      if (this.filter.participants && Number(this.filter.participants) > 1) {
        url = url + '?participants=' + this.filter.participants;
      }
    } else {
      if (this.filter.participants && Number(this.filter.participants) > 1) {
        url = url + '?type=' + this.filter.type + '&participants=' + this.filter.participants;
      } else {
        url = url + '?type=' + this.filter.type;
      }
    }

    console.log(url);
    return url;
  }

  refreshGradient() {
    const gradients: any = ['gradient--default', 'gradient--01', 'gradient--02', 'gradient--03', 'gradient--04',
      'gradient--05', 'gradient--06', 'gradient--07', 'gradient--08', 'gradient--09', 'gradient--10'];
    return gradients[this.randomValue(0, 10)];
  }

  refreshAnimation() {
    const animations: any = ['',
      'bounce',
      'flash',
      'pulse',
      'rubberBand',
      'shake',
      'headShake',
      'swing',
      'tada',
      'wobble',
      'jello',
      'bounceIn',
      'bounceInDown',
      'bounceInLeft',
      'bounceInRight',
      'bounceInUp',
      'fadeIn',
      'fadeInDown',
      'fadeInDownBig',
      'fadeInLeft',
      'fadeInLeftBig',
      'fadeInRight',
      'fadeInRightBig',
      'fadeInUp',
      'fadeInUpBig',
      'flipInX',
      'flipInY',
      'lightSpeedIn',
      'rotateIn',
      'rotateInDownLeft',
      'rotateInDownRight',
      'rotateInUpLeft',
      'rotateInUpRight',
      'jackInTheBox',
      'rollIn',
      'zoomIn',
      'zoomInDown',
      'zoomInLeft',
      'zoomInRight',
      'zoomInUp',
      'slideInDown',
      'slideInLeft',
      'slideInRight',
      'slideInUp',
      'heartBeat',
    ];
    return animations[this.randomValue(1, 44)];
  }

  randomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
