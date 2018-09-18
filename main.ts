import { Observable, from, Observer, fromEvent } from 'rxjs';
import { map, filter, flatMap, retry, retryWhen, scan, debounce, delay, takeWhile } from 'rxjs/operators';


let numbers = [1,5,10,12];
let source = from(numbers).pipe(
    map(n => n*2),
    filter(n => n>10)
);
let newSource = Observable.create();

const button = document.getElementById('btnMovies');
const output = document.getElementById('output');

class MySubscriber implements Observer<number> {
    closed?: boolean;   
    next(value: number): void{
        console.log(value);
    }    
    error(err: any): void {
        console.log(err);
    };
    complete(): void {
        console.log("Complete");
    };
}

source.subscribe(new MySubscriber());


function load(url: string) {
    return Observable.create(observer => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load',() => {
            if(xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.responseText);
            }
        })
        xhr.open('GET', url);
        xhr.send();
    }).pipe(
        retryWhen(retryStrategy())
    );
}

function retryStrategy() {
    return (errors: Observable<any>): Observable<any> => {
        return errors.pipe(
            scan((acc, value) => {
                return acc+1;
            }, 0),
            takeWhile(acc => acc < 4),
            delay(1000)
        )
    }
}

function renderMovies(movies: any) {
    movies.forEach(m => {
        const div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    });
}
const buttonSource = fromEvent(button, 'click');

// buttonSource.subscribe(o => {
//     console.log('Button Clicked');
//     load('movies.json').subscribe(renderMovies);
// },e => console.error(e), () => console.log('Complete'));


buttonSource.pipe(
    flatMap(e => load('moviesdfg.json'))
).subscribe(renderMovies);

// (o => {
//     console.log('Button Clicked');
//     load('movies.json').subscribe(renderMovies);
// },e => console.error(e), () => console.log('Complete'));