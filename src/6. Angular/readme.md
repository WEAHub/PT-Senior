# 🚀 Lazy Loading
- Esta técnica se utiliza para reducir los tiempos de carga permitiendo cargar la aplicación web en partes.

- Utilizando lazy loading lo que conseguimos es que al iniciar la aplicación solo carguen las partes(módulos) básicas y permita acceder al sitio rápidamente. Entonces, al navegar hacia una ruta con lazyloading cargaría el módulo de la ruta que estás navegando y así sucesivamente permitiendo una carga dinámica de módulos.

- En Angular 16 se puede utilizar lazy loading con las imágenes, aunque no todos los navegadores lo soportan.
Se puede crear una directiva para comprobar si el navegador soporta lazy loading de imágenes en todo caso.

- Las imágenes con lazy loading se utilizan añadiendo el atributo `loading` como en el siguiente ejemplo:
  ```html
  <img src="test.png" alt="Test" loading="lazy"> 
  ```

# 🖹 Ejemplo

- Aquí dejo un ejemplo básico tomado de un proyecto mío.

###  app-routing.module.ts
```ts
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@shared/guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'public',
  },
  {
    path: 'public',
    loadChildren: () =>
      import('@modules/public/public.module').then(
        (m) => m.PublicModule,
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@modules/admin/admin.module').then(
        (m) => m.AdminModule,
      ),
  },
  {
    path: '**',
    redirectTo: 'public',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

### admin-routing.module.ts
```ts
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'public',
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(
        (m) => m.ProfileModule,
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'images',
    loadChildren: () =>
      import('./pages/images/images.module').then(
        (m) => m.ImagesModule,
      ),
  },
  {
    path: 'files',
    loadChildren: () =>
      import('./pages/files/files.module').then((m) => m.FilesModule),
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
```
- En este ejemplo vemos que las rutas `/public` y `/admin` se importan de forma dinámica pasándole al `loadChildren` un `import(modulo)` dentro de un ***arrow function***.
La primera vez que se navegue a una de esas rutas importara el módulo.

# 📁 Estructura de carpetas
- Por preferencia yo suelo separar las rutas en un módulo aparte para no agrandar el archivo del módulo.
- Cada sección de la aplicación debe tener su archivo `seccion-routing.module.ts`
### Ejemplo de estructuras 
```
📁 src/
├─ 📁 app/
│  ├─ 📁 modules/
│  │  ├─ 📁 admin/
│  │  │  ├─ 🖹 admin.module.ts
│  │  │  ├─ 🖹 admin-routing.module.ts
│  │  │  ├─ 📁 pages/
│  │  │  │  ├─ 📁 users/
│  │  │  │  │  ├─ 🖹 users.module.ts
│  │  │  │  │  ├─ 🖹 users-routing.module.ts
│  │  │  │  │  ├─ 🖹 users.component.ts
│  │  ├─ 📁 public/
│  │  │  ├─ 🖹 public-routing.module.ts
│  │  │  ├─ 🖹 public.module.ts
│  │  │  ├─ 🖹 pages/
│  ├─ 🖹 app.module.ts
│  ├─ 🖹 app-routing.module.ts
│  ├─ 🖹 app.component.ts
├─ 📁 shared/
│  ├─ 📁 interfaces/
│  ├─ 📁 directives/
│  ├─ 📁 services/
│  ├─ 📁 pipes/
```