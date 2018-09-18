import { Observable, from, Observer, fromEvent, Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';
import { map, filter, flatMap, retry, retryWhen, scan, debounce, delay, takeWhile, onErrorResumeNext } from 'rxjs/operators';


// let numbers = [1,5,10,12];
// let source = from(numbers).pipe(
//     map(x => x * 2),
//     filter(x => x > 10)
// );

// const btnMovies = fromEvent(document.getElementById('btnMovies'),'click');

// export class MySubscriber implements Observer<number> {
//     closed?: boolean;   
//     next(value: number): void{
//         console.log(value);
//     }    
//     error(err: any): void {
//         console.log(err);
//     };
//     complete(): void {
//         console.log("Complete");
//     };
// }

// source.subscribe(new MySubscriber());

// btnMovies.subscribe(e => {
//     console.log("Button clicked");
// })

// function load(url: string) {

//     return Observable.create(observer => {
//         const xhr = new XMLHttpRequest();
//         xhr.addEventListener('load', () => {
//             if (xhr.status === 200) {
//                 const resp = JSON.parse(xhr.responseText);
//                 observer.next(resp);
//                 observer.complete();
//             } else {
//                 observer.error(xhr.responseText);
//             }                        
//         });
//         xhr.open('GET',url);
//         xhr.send();
//     }).pipe(
//         retryWhen(retryStrategy())
//     );
// }

// function retryStrategy() {
//     return (errors: Observable<any>) => {    
//         return errors.pipe(
//             scan((acc, value) => { 
//                 return acc + 1
//             }, 0),
//             takeWhile(acc => acc < 4),            
//             delay(1000)            
//         );
//     };
// }

// load('movies.json').subscribe(o => {
//     console.log(o);
// });

// Observables are unicast
const newObs = Observable.create(o => {
    o.next(Math.random());
});

newObs.subscribe(v => {
    console.log(v);
});

newObs.subscribe(v => {
    console.log(v);
});

// Intro to Subjects
const newSubject = new Subject();

newSubject.subscribe(o=>{
    console.log(`Subscriber A: ${o}`);
});

newSubject.next(Math.random());
newSubject.next(Math.random());

newSubject.subscribe(o=>{
    console.log(`Subscriber B: ${o}`);
});

newSubject.next(Math.random());

// Intro to BehaviorSubject
const behSubject = new BehaviorSubject({});

// subscriber 1
behSubject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

behSubject.next(Math.random());
behSubject.next(Math.random());

// subscriber 2
behSubject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

behSubject.next(Math.random());

console.log(behSubject.value)

// Intro to Replay Subject

const replaySubject = new ReplaySubject(2);

// subscriber 1
replaySubject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

replaySubject.next(Math.random())
replaySubject.next(Math.random())
replaySubject.next(Math.random())

// subscriber 2
replaySubject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

replaySubject.next(Math.random());

// replay with timer

const replaySubjectWithTimer = new ReplaySubject(2, 100);

// subscriber 1
replaySubjectWithTimer.subscribe((data) => {
    console.log('Subscriber A:', data);
});

setInterval(() => replaySubjectWithTimer.next(Math.random()), 200);

// subscriber 2
setTimeout(() => {
    replaySubjectWithTimer.subscribe((data) => {
    console.log('Subscriber B:', data);
  });
}, 1000)

// Intro to AsyncSubject

const asyncSubject = new AsyncSubject();

// subscriber 1
asyncSubject.subscribe((data) => {
    console.log('Subscriber A:', data);
});

asyncSubject.next(Math.random())
asyncSubject.next(Math.random())
asyncSubject.next(Math.random())

// subscriber 2
asyncSubject.subscribe((data) => {
    console.log('Subscriber B:', data);
});

asyncSubject.next(Math.random());
asyncSubject.complete();
