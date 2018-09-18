import { Observable, Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from "rxjs";


const observable = Observable.create(o => {
    o.next(Math.random());
})

observable.subscribe(v => {
    console.log(`Subscriber A: ${v}`);
})

observable.subscribe(v => {
    console.log(`Subscriber B: ${v}`);
})

const subject = new Subject();

subject.subscribe(v => {
    console.log(`Subsciber As: ${v}`);
});

subject.subscribe(v => {
    console.log(`Subsciber Bs: ${v}`);
});

subject.next(Math.random());

subject.subscribe(v => {
    console.log(`Subsciber Cs: ${v}`);
});


const behSubject = new BehaviorSubject({});


behSubject.subscribe(v => {
    console.log(`Subsciber Abs: ${v}`);
});

behSubject.subscribe(v => {
    console.log(`Subsciber Bbs: ${v}`);
});

behSubject.next(Math.random());

behSubject.next(Math.random());
behSubject.next(Math.random());

behSubject.subscribe(v => {
    console.log(`Subsciber Cbs: ${v}`);
});

const replaySubject = new ReplaySubject(3);

replaySubject.subscribe(v => {
    console.log(`Subsciber Ars: ${v}`);
});

replaySubject.subscribe(v => {
    console.log(`Subsciber Brs: ${v}`);
});

replaySubject.next(Math.random());
replaySubject.next(Math.random());
replaySubject.next(Math.random());
replaySubject.next(Math.random());


replaySubject.subscribe(v => {
    console.log(`Subsciber Crs: ${v}`);
});

const asyncSubject = new AsyncSubject();

asyncSubject.subscribe(v => {
    console.log(`Subsciber A async s: ${v}`);
});


asyncSubject.subscribe(v => {
    console.log(`Subsciber B async s: ${v}`);
});

asyncSubject.next(Math.random());

asyncSubject.subscribe(v => {
    console.log(`Subsciber C async s: ${v}`);
});


asyncSubject.complete();

