import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';

@Pipe({
    name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

    transform(array: User[], searchString: string): User[] {
        if (!array || !searchString) return array;
        else {
            return array.filter(usr => {
                usr.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
                usr.surName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
                usr.userName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
            })
        }
    }

}
