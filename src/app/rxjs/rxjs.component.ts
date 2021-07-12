import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, from, fromEvent, interval, Observable, of, ReplaySubject, Subject} from 'rxjs';
import {filter, map, scan, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.less']
})
export class RxjsComponent implements OnInit {

  @ViewChild('divElement')
  divElement: ElementRef;

  constructor() { }

  ngOnInit(): void {
    const observable$: Observable<number> = new Observable((observer) => {
      observer.next(1)
      setTimeout(() => {observer.next(2)}, 3000)
      setTimeout(() => {observer.error('error')}, 4000)
      setTimeout(() => {observer.next(3)}, 6500)
      setTimeout(() => {observer.complete()}, 7000)
    });

    observable$.subscribe({
      next: (value: number) => { console.log(value) },
      error: (error: string) => { console.log(error) },
      complete: () => { this.divElement.nativeElement.innerText = 'Observer completed' }
    });

    const array = [
      { name: 'Egor', city: 'Moscow' },
      { name: 'Alexander', city: 'Moscow' },
      { name: 'Alexey', city: 'Los Angeles' },
      { name: 'Vladislav', city: 'Moscow' },
      { name: 'Irina', city: 'Krasnodar' },
    ]

    const subscription$ = interval(1000)
      .pipe(
        take(array.length),
        // takeUntil(observable$),
        filter((value: number) => array[value].city === 'Moscow'),
        map((value: number) => array[value].name),
        scan((acc: string[], item: string, index: number) => acc.concat(item), [])
      )
      .subscribe((value: string[]) => {
        console.log(value);
      })

    setTimeout(() => { subscription$.unsubscribe() }, 2000);

    const stream1$ = of(1, 2, 3, 4, 5);
    const stream2$ = from([1, 2, 3, 4, 5]);
    const stream3$ = fromEvent(document, 'click');

    stream3$.subscribe((value: Event) => console.log(value));

    const stream4$ = new Subject();
    stream4$.next('Subject Next called')
    stream4$.subscribe(value => console.log(value));

    const stream5$ = new BehaviorSubject('1');
    stream5$.next('BehaviorSubject1 Next called')
    stream5$.next('BehaviorSubject2 Next called')
    stream5$.subscribe(value => console.log(value));

    const stream6$ = new ReplaySubject(1);
    stream6$.next('ReplaySubject Next called')
    stream6$.next('ReplaySubject Next called')
    stream6$.next('ReplaySubject Next called')
    stream6$.subscribe(value => console.log(value));
  }

}
