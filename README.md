# Prova Técnica Senior Developer

<div align="center">
  <a href="http://re7systems.com/" target="blank"><img src="https://www.re7systems.com/wp-content/uploads/2020/04/Recurso-4@5x.png" width="200" alt="Re7Systems" /></a>
</div>


La present prova té per objectiu avaluar les capacitats tècniques i competències del candidat per a la vacant de Senior Full Stack Developer. 

El test està compost per 10 preguntes curtes en diferents llenguatges.

### Com resoldre:
- Clonar el repositori.
- Crear una carpeta `src` que contingui una subcarpeta per cada pregunta.
- Acompanyar cada exercici resolt amb un arxiu `README.md` que amb l'explicació del desenvolupament.
- Fer un *commit* per cada pregunta resolta.
- Empaquetar el resultat en un arxiu `re7systems.bundle` amb la comanda `git bundle create re7systems.bundle --all`.

## Preguntes

### 1. Javascript - Algoritmia
Escriu un funció en *JavaScript* que rebi un número sencer com a paràmeter d'entrada i retorni `true` si el número és primer i `false` si no ho és.

### 2. TypeScript - Manipulació de Dades
Utilitzant TypeScript, crea una interfície que defineixi l'estructura d'un objecte **Producte** amb propietats com ara nom, preu i descripció. Després, crea una funció que prengui un array de productes i retorni el producte més car.

### 3. Modelatge de Base de Dades
Dissenyau un esquema de base de dades a MySQL per a una aplicació de botiga en línia que inclogui taules per a productes, categories i comandes. Especifica les relacions entre les taules.

### 4. JavaScript - Rendering Eficient amb Virtual DOM
Imagina que treballes en una aplicació web complexa que mostra una gran quantitat de dades dinàmiques. Com abordaries l'optimització del rendiment del rendering utilitzant la tècnica del Virtual DOM? Proporciona un exemple pràctic de com implementaries aquesta tècnica en JavaScript per minimitzar les actualitzacions innecessàries del DOM i millorar el rendiment general de la teva aplicació.

### 5. TypeScript - Ús de Tipus Genèrics
Escriu una funció a TypeScript que prengui un array d'elements i retorni l'últim element de l'array. Utilitza tipus genèrics perquè la funció sigui flexible i funcioni amb diferents tipus d'elements.

### 6. Angular
Explica com implementaries l'ús del "Lazy Loading" en una aplicació Angular per millorar el rendiment i l'experiència de l'usuari. Proporciona un exemple pràctic de com estructuraries els mòduls i les rutes per aconseguir el "Lazy Loading" en diferents parts de l'aplicació. Destaca els avantatges d'aquesta tècnica i com contribueix a l'eficiència del càrrega de la pàgina.

### 7. JavaScript - Algorisme de cerca
Implementa un algorisme de cerca binària en JavaScript per trobar un element en un array ordenat. La funció ha de retornar la posició de l'element si es troba o -1 si no està present.

### 8. NestJS
Imagina que estàs treballant en un projecte Nest.js que requereix una manipulació extensa de les dades entrants i sortints. Com implementaries interceptors i pipes de manera avançada per aconseguir un codi modular i mantenible?

Explica com podríem utilitzar interceptors per manipular les respostes HTTP i els pipes per validar i transformar les dades d'entrada. Proporciona exemples específics de com implementaries interceptors i pipes personalitzats per gestionar casos com l'autenticació, la validació de dades o la gestió d'errors. Aborda la manera com aquests elements poden ser reutilitzats en tota l'aplicació per millorar la consistència i la facilitat de manteniment del codi.

### 9. TypeORM i TypeScript - Gestió de Relacions

Considera un sistema de gestió de llibres amb les següents entitats: `Llibre`, `Autor` i `Editorial`. Utilitza TypeORM i TypeScript per gestionar les relacions entre aquestes entitats.

Defineix les Entitats:

`Llibre` amb les propietats: `id`, `titol`, `preu` i `autor`.
`Autor` amb les propietats: `id`, `nom` i `llibres` (relació amb molts llibres).
`Editorial` amb les propietats: `id`, `nom` i `llibres` (relació amb molts llibres).
Configura les Relacions:

Estableix una relació many-to-one entre Llibre i Autor.
Estableix una relació many-to-one entre Llibre i Editorial.
Crea una Consulta Avançada:

Implementa una consulta que recuperi tots els llibres d'un autor específic juntament amb la informació de l'autor i l'editorial associats.
Gestiona la Consulta Eficientment:

Utilitza precàrrega (eager loading) per minimitzar el nombre de consultes realitzades i optimitzar el rendiment.
Extra:

Proporciona el codi TypeScript que implementa aquesta configuració i consultes. Aborda detalls com l'ús de decoradors de TypeORM, les opcions de relació i qualsevol altra configuració rellevant.

### 10. PHP - Manipulació Avançada d'Arrays
Crea una funció en PHP que rebi com a paràmetre un array associatiu de tasques, on cada tasca té les següents propietats: `id`, `títol`, `descripció` i `estat` (pendent o completada).

1. Filtra les Tasques:
   Implementa una funció que, donat l'array de tasques, filtri només les tasques completades.
2. Ordena les Tasques:
   Implementa una altra funció que, donat l'array de tasques, les ordeni per data de creació de manera descendent.
3. Obté Estadístiques: 
   Crea una funció que, donat l'array de tasques, calculi i imprimeixi el nombre total de tasques, així com el nombre de tasques pendents i completades.

Proporciona el codi PHP que implementa aquesta manipulació avançada d'arrays amb les funcionalitats mencionades. Aborda detalls com la utilització d'iteradors, funcions de manipulació d'arrays i la gestió de les estadístiques.