import { Account } from "../general-models/account";
import { Rol } from "../general-models/rol";
import { Report } from "../general-models/report";
import { Credential } from "../general-models/credential";


export class AccountFactory {
    static createEmptyAccount(): Account {
        return {
            id: 0,
            name: '',
            last_name: '',
            id_card: '',
            last_connection: new Date(),
            rol: {} as Rol,
            credential: {} as Credential,
            permissions: [],
            last_report: {} as Report
        };
    }
}
