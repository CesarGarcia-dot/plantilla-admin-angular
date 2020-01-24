import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { User } from './user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { catchError, finalize } from 'rxjs/operators';

export class UsersDataSource implements DataSource<User> {


    private usersSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);


    constructor(private usersService: UserService) { }

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }

    loadUsers() {
            this.loadingSubject.next(true);

            this.usersService.getUsers().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(users => this.usersSubject.next(users));
    }

}