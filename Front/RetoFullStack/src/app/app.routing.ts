
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components


const routes: Routes = [
  { path: 'usuario', loadChildren: () => import('app/modules/usuario/usuario.module').then(m => m.UsuarioModule) },
  { path: 'roles', loadChildren: () => import('app/modules/roles/roles.module').then(m => m.RolesModule) },
  // { path: 'home', loadChildren: () => import('app/modules/inicio/inicio.module').then(m => m.InicioModule), canActivate: [AuthGuard] },
  // {
  // 	path: 'error/403',
  // 	component: ErrorPageComponent,
  // 	data: {
  // 		type: 'error-v6',
  // 		code: 403,
  // 		title: 'Prohibido pasar',
  // 		desc: 'Tranquilo ratón, aún no desarrollamos esto.<br> Please, contact Almircar.',
  // 	},
  // },
  { path: '', redirectTo: '/usuario', pathMatch: 'full' },
  { path: '**', redirectTo: '/error/403', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
