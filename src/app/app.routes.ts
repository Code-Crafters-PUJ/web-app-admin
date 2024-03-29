import { Routes } from '@angular/router';
import { FacturacionComponent} from "./Facturacion/facturacion.component"

export const routes: Routes = [
    { path: '', redirectTo: 'Facturacion', pathMatch: 'full' },
    { path: 'Facturacion', component: FacturacionComponent }
];
