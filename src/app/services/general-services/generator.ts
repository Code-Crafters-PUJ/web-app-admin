import { Account } from "../../models/Users-models/account";
import { Modul } from "../../models/Users-models/Module";
import { Operation } from "../../models/Users-models/operation";
import { Permission } from "../../models/Users-models/permission";
import { Report } from "../../models/Users-models/report";
import { Rol } from "../../models/Users-models/rol";
import { Credential } from "../../models/Users-models/credential";

export class Generation {
    static modul1: Modul;
    static modul2: Modul;
    static operation1: Operation;
    static operation2: Operation;
    static rol1: Rol;
    static rol2: Rol;
    static rol3: Rol;
    static report1: Report;
    static report2: Report;
    static account1: Account;
    static account2: Account;
    static account3: Account;
    static account4: Account;
    static account5: Account;
    static account6: Account;
    static account7: Account;
    static account8: Account;
    static account9: Account;
    static account10: Account;
    static account11: Account;
    static account12: Account;
    static account13: Account;
    static account14: Account;
    static account15: Account;
    static permission1: Permission;
    static permission2: Permission;
    static permission3: Permission;
    static permission4: Permission;
    static permission5: Permission;
    static permission6: Permission;
    static permission7: Permission;
    static permission8: Permission;
    static permission9: Permission;
    static permission10: Permission;
    static permission11: Permission;
    static permission12: Permission;
    static permission13: Permission;
    static permission14: Permission;
    static permission15: Permission;
    static permission16: Permission;
    static permission17: Permission;
    static permission18: Permission;
    static permission19: Permission;
    static permission20: Permission;
    static credential1: Credential;
    static credential2: Credential;
    static credential3: Credential;
    static credential4: Credential;
    static credential5: Credential;
    static credential6: Credential;
    static credential7: Credential;
    static credential8: Credential;
    static credential9: Credential;
    static credential10: Credential;
    static credential11: Credential;
    static credential12: Credential;
    static credential13: Credential;
    static credential14: Credential;
    static credential15: Credential;

    static generateData(): void {
        const Date1 = new Date()
        Date1.setFullYear(Date1.getFullYear() - 2);
        const Date2 = new Date()
        const mesActual = Date1.getMonth();
        Date2.setMonth(mesActual - 2);
        if (Date2.getMonth() === 11 && mesActual === 0) {
            Date2.setFullYear(Date2.getFullYear() - 1);
        }
        this.rol1 =
        {
            id: 1,
            description: "Ventas",
            accounts: []
        }
        this.rol2 =
        {
            id: 1,
            description: "marketing-page",
            accounts: []
        }
        this.rol3 =
        {
            id: 1,
            description: "Admin",
            accounts: []
        }
        this.modul1 =
        {
            id: 1,
            description: "Ventas",
            permissions: []
        }
        this.modul2 =
        {
            id: 2,
            description: "marketing-page",
            permissions: []
        }
        this.report1 =
        {
            id: 1,
            activity: "Creación nuevo correo",
            account: []
        }
        this.report1 =
        {
            id: 1,
            activity: "Creación nuevo correo",
            account: []
        }
        this.report2 =
        {
            id: 2,
            activity: "Crear nuevo correo",
            account: []
        }
        this.operation1 =
        {
            id: 1,
            descripcion: "Visualizar",
            permissions: []
        }
        this.operation1 =
        {
            id: 1,
            descripcion: "Modificar",
            permissions: []
        }
        this.credential1 = {
            id: 1,
            email: "email1@example.com",
            hash: "hash1"
        };
        this.credential2 = {
            id: 2,
            email: "email2@example.com",
            hash: "hash2"
        };
        this.credential3 = {
            id: 3,
            email: "email3@example.com",
            hash: "hash3"
        };
        this.credential4 = {
            id: 4,
            email: "email4@example.com",
            hash: "hash4"
        };
        this.credential5 = {
            id: 5,
            email: "email5@example.com",
            hash: "hash5"
        };
        this.credential6 = {
            id: 6,
            email: "email6@example.com",
            hash: "hash6"
        };
        this.credential7 = {
            id: 7,
            email: "email7@example.com",
            hash: "hash7"
        };
        this.credential8 = {
            id: 8,
            email: "email8@example.com",
            hash: "hash8"
        };
        this.credential9 = {
            id: 9,
            email: "email9@example.com",
            hash: "hash9"
        };
        this.credential10 = {
            id: 10,
            email: "email10@example.com",
            hash: "hash10"
        };

        this.credential11 = {
            id: 11,
            email: "email11@example.com",
            hash: "hash11"
        };

        this.credential12 = {
            id: 12,
            email: "email12@example.com",
            hash: "hash12"
        };

        this.credential13 = {
            id: 13,
            email: "email13@example.com",
            hash: "hash13"
        };

        this.credential14 = {
            id: 14,
            email: "email14@example.com",
            hash: "hash14"
        };

        this.credential15 = {
            id: 15,
            email: "email15@example.com",
            hash: "hash15"
        };
        this.account1 = {
            id: 1,
            name: "Nombre1",
            last_name: "Apellido1",
            id_card: "ID1",
            last_connection: new Date(),
            rol: this.rol1,
            credential: this.credential1,
            permissions: [],
            last_report: this.report1,
        };

        this.account2 = {
            id: 2,
            name: "Nombre2",
            last_name: "Apellido2",
            id_card: "ID2",
            last_connection: new Date(),
            rol: this.rol2,
            credential: this.credential2,
            permissions: [],
            last_report: this.report1,
        };

        this.account3 = {
            id: 3,
            name: "Nombre3",
            last_name: "Apellido3",
            id_card: "ID3",
            last_connection: new Date(),
            rol: this.rol1,
            credential: this.credential3,
            permissions: [],
            last_report: this.report1,
        };

        this.account4 = {
            id: 4,
            name: "Nombre4",
            last_name: "Apellido4",
            id_card: "ID4",
            last_connection: new Date(),
            rol: this.rol2,
            credential: this.credential4,
            permissions: [],
            last_report: this.report1,
        };

        this.account5 = {
            id: 5,
            name: "Nombre5",
            last_name: "Apellido5",
            id_card: "ID5",
            last_connection: new Date(),
            rol: this.rol3,
            credential: this.credential5,
            permissions: [],
            last_report: this.report1,
        };

        this.account6 = {
            id: 6,
            name: "Nombre6",
            last_name: "Apellido6",
            id_card: "ID6",
            last_connection: Date1,
            rol: this.rol1,
            credential: this.credential6,
            permissions: [],
            last_report: this.report1,
        };

        this.account7 = {
            id: 7,
            name: "Nombre7",
            last_name: "Apellido7",
            id_card: "ID7",
            last_connection: Date1,
            rol: this.rol2,
            credential: this.credential7,
            permissions: [],
            last_report: this.report1,
        };

        this.account8 = {
            id: 8,
            name: "Nombre8",
            last_name: "Apellido8",
            id_card: "ID8",
            last_connection: Date1,
            rol: this.rol3,
            credential: this.credential8,
            permissions: [],
            last_report: this.report1,
        };

        this.account9 = {
            id: 9,
            name: "Nombre9",
            last_name: "Apellido9",
            id_card: "ID9",
            last_connection: Date1,
            rol: this.rol1,
            credential: this.credential9,
            permissions: [],
            last_report: this.report1,
        };

        this.account10 = {
            id: 10,
            name: "Nombre10",
            last_name: "Apellido10",
            id_card: "ID10",
            last_connection: Date1,
            rol: this.rol2,
            credential: this.credential10,
            permissions: [],
            last_report: this.report1,

        };

        this.account11 = {
            id: 11,
            name: "Nombre11",
            last_name: "Apellido11",
            id_card: "ID11",
            last_connection: Date2,
            rol: this.rol3,
            credential: this.credential11,
            permissions: [],
            last_report: this.report2,

        };

        this.account12 = {
            id: 12,
            name: "Nombre12",
            last_name: "Apellido12",
            id_card: "ID12",
            last_connection: Date2,
            rol: this.rol1,
            credential: this.credential12,
            permissions: [],
            last_report: this.report2,

        };

        this.account13 = {
            id: 13,
            name: "Nombre13",
            last_name: "Apellido13",
            id_card: "ID13",
            last_connection: Date2,
            rol: this.rol2,
            credential: this.credential13,
            permissions: [],
            last_report: this.report2,

        };

        this.account14 = {
            id: 14,
            name: "Nombre14",
            last_name: "Apellido14",
            id_card: "ID14",
            last_connection:Date2,
            rol: this.rol3,
            credential: this.credential14,
            permissions: [],
            last_report: this.report2,
        };

        this.account15 = {
            id: 15,
            name: "Nombre15",
            last_name: "Apellido15",
            id_card: "ID15",
            last_connection:Date2,
            rol: this.rol1,
            credential: this.credential15,
            permissions: [],
            last_report: this.report2,

        };
        this.permission1 = {
            id: 1,
            modul: this.modul1,
            Operation: this.operation1,
            account: this.account1
        };

        this.permission2 = {
            id: 2,
            modul: this.modul1,
            Operation: this.operation2,
            account: this.account2
        };

        this.permission3 = {
            id: 3,
            modul: this.modul2,
            Operation: this.operation1,
            account: this.account3
        };

        this.permission4 = {
            id: 4,
            modul: this.modul2,
            Operation: this.operation2,
            account: this.account4
        };

        this.permission5 = {
            id: 5,
            modul: this.modul1,
            Operation: this.operation1,
            account: this.account5
        };

        this.permission6 = {
            id: 6,
            modul: this.modul1,
            Operation: this.operation2,
            account: this.account6
        };

        this.permission7 = {
            id: 7,
            modul: this.modul2,
            Operation: this.operation1,
            account: this.account7
        };

        this.permission8 = {
            id: 8,
            modul: this.modul2,
            Operation: this.operation2,
            account: this.account8
        };

        this.permission9 = {
            id: 9,
            modul: this.modul1,
            Operation: this.operation1,
            account: this.account9
        };

        this.permission10 = {
            id: 10,
            modul: this.modul1,
            Operation: this.operation2,
            account: this.account10
        };

        this.permission11 = {
            id: 11,
            modul: this.modul2,
            Operation: this.operation1,
            account: this.account11
        };

        this.permission12 = {
            id: 12,
            modul: this.modul2,
            Operation: this.operation2,
            account: this.account12
        };

        this.permission13 = {
            id: 13,
            modul: this.modul1,
            Operation: this.operation1,
            account: this.account13
        };

        this.permission14 = {
            id: 14,
            modul: this.modul1,
            Operation: this.operation2,
            account: this.account14
        };

        this.permission15 = {
            id: 15,
            modul: this.modul2,
            Operation: this.operation1,
            account: this.account15
        };

        this.permission16 = {
            id: 16,
            modul: this.modul2,
            Operation: this.operation2,
            account: this.account1
        };

        this.permission17 = {
            id: 17,
            modul: this.modul1,
            Operation: this.operation1,
            account: this.account2
        };

        this.permission18 = {
            id: 18,
            modul: this.modul1,
            Operation: this.operation2,
            account: this.account3
        };

        this.permission19 = {
            id: 19,
            modul: this.modul2,
            Operation: this.operation1,
            account: this.account4
        };

        this.permission20 = {
            id: 20,
            modul: this.modul2,
            Operation: this.operation2,
            account: this.account5
        };
        this.account1.permissions.push(this.permission1, this.permission16);
        this.account2.permissions.push(this.permission2, this.permission17);
        this.account3.permissions.push(this.permission3, this.permission18);
        this.account4.permissions.push(this.permission4, this.permission19);
        this.account5.permissions.push(this.permission5, this.permission20);
        this.account6.permissions.push(this.permission6);
        this.account7.permissions.push(this.permission7);
        this.account8.permissions.push(this.permission8);
        this.account9.permissions.push(this.permission9);
        this.account10.permissions.push(this.permission10);
        this.account11.permissions.push(this.permission11);
        this.account12.permissions.push(this.permission12);
        this.account13.permissions.push(this.permission13);
        this.account14.permissions.push(this.permission14);
        this.account15.permissions.push(this.permission15);
        this.report1.account.push(this.account1);
        this.report2.account.push(this.account2);
        this.report1.account.push(this.account3);
        this.report1.account.push(this.account4);
        this.report1.account.push(this.account5);
        this.report1.account.push(this.account6);
        this.report1.account.push(this.account7);
        this.report1.account.push(this.account8);
        this.report1.account.push(this.account9);
        this.report1.account.push(this.account10);
        this.report2.account.push(this.account11);
        this.report2.account.push(this.account12);
        this.report2.account.push(this.account13);
        this.report2.account.push(this.account14);
        this.report2.account.push(this.account15);
        this.rol1.accounts.push(this.account1, this.account3, this.account6, this.account9, this.account12, this.account15);
        this.rol2.accounts.push(this.account2, this.account4, this.account7, this.account10, this.account13);
        this.rol3.accounts.push(this.account5, this.account8, this.account11, this.account14);
        this.modul1.permissions.push(
            this.permission1,
            this.permission2,
            this.permission5,
            this.permission6,
            this.permission9,
            this.permission10,
            this.permission13,
            this.permission14
        );
        this.modul2.permissions.push(
            this.permission3,
            this.permission4,
            this.permission7,
            this.permission8,
            this.permission11,
            this.permission12,
            this.permission15,
            this.permission16
        );
    }
}
Generation.generateData();
export default Generation;
