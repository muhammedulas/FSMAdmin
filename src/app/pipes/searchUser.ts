import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';

@Pipe({
    name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

    transform(array: User[], searchString: string, role: any): User[] {
        if (!array || (!searchString && !role)) return array;
        else {
            let temp: User[] = [];
            temp = array.filter(user =>
                user.userName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
                user.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
                user.surName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
            )
            if (role == "Yönetici") {
                temp = temp.filter(user => user.isAdmin == 1)
            }
            else if (role == "Kullanıcı") {
                temp = temp.filter(user => user.isAdmin == 0)
            }
            return temp
        }
    }

}
