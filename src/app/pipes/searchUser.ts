import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';

@Pipe({
    name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

    transform(array: User[], searchString: string, admin: number = 3): User[] {
        if (!array || !searchString) return array;
        else {
            let temp: User[] = [];
            temp = array.filter(user =>
                user.userName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
                user.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
                user.surName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
            )
            if (admin == 0) {
                temp = temp.filter(user => user.isAdmin == 0)
            }
            else if (admin == 1) {
                temp = temp.filter(user => user.isAdmin == 1)
            }
            return temp
        }
    }

}
