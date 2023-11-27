# 4. JavaScript - Rendering Eficient amb Virtual DOM
- El concepto de virtual DOM se basa en representar una parte(nodo/s) del DOM en memoria y sincronizar el DOM real con el que se maneja en memoria.

- El mismo concepto varía mucho a nivel de código dependiendo de si estás usando un framework como ***Angular, React, Vue*** o sin framework con ***JavaScript Vanilla***.

## Planteamiento con Javascript Vanilla (SIMPLE)
- El ejemplo más sencillo que se me ocurre para dar a entender el virutal dom sería algo como un contador para reflejar como se actualiza el dom de forma dinámica.

### HTML
```html
<div>
  <h1>Virtual DOM - Contador</h1>
  <div id="counter"></div>
</div>
```
### JS
```js
const counterRef = document.getElementById("counter");
let counter = 0;

function updateCounter() {
  counter++
  counterRef.innerHTML = "<h2>" + counter + "</h2>"
}

setInterval(updateCounter, 1000);
```

- En este ejemplo se inicia un intervalo de 1 segundo que llama a al función `updateCounter` y dicha función actualiza el elemento con ID `counter` incrementando la variable `counter` y actualizando el html del elemento.

## Planteamiento con Javascript Vanilla (AVANZADO)

- En este ejemplo vamos a crear una tabla que tenga las filas dinámicas creadas en javascript.
- El contenido de la tabla tendrá relación con un array de objects y cuando se actualiza el object debe actualizarse únicamente la fila que contiene los valores de ese object.
- En este caso vamos a actualizar únicamente la celda para no re-renderizar la fila entera y el impacto del cambio sea mínimo.

### HTML
```html
<table id="personsTable" border="1">
  <thead>
    <th>ID</th>
    <th>PERSON NAME</th>
    <th>LAST UPDATE</th>
  </thead>
  <tbody>
  </tbody>
</table>
```

### JS
```js

const actualDate = new Date().getMilliseconds();

const persons = [
  {name: 'test', lastUpdate: actualDate, element: null},
  {name: 'test3', lastUpdate: actualDate, element: null},
  {name: 'test4', lastUpdate: actualDate, element: null},
  {name: 'test5', lastUpdate: actualDate, element: null},
  {name: 'test6', lastUpdate: actualDate, element: null},
  {name: 'test7', lastUpdate: actualDate, element: null},
]

const personsTable = document.getElementById('personsTable');
const personsTableBody = personsTable.getElementsByTagName('tbody')[0];

function fillTable() {
  persons.forEach((person, idx) => {
    person.element = personsTableBody.insertRow();

    const id = person.element.insertCell();
    const name = person.element.insertCell();
    const lastUpdate = person.element.insertCell();

    id.textContent = idx;
    name.textContent = person.name;
    lastUpdate.textContent = person.lastUpdate;

    personsTableBody.appendChild(person.element);
  })
}

function updateRandomPerson() {
  const randomIdx = Math.floor(Math.random() * persons.length);
  
  const randomPerson = persons[randomIdx]
  randomPerson.lastUpdate = new Date().getMilliseconds();
  
  const lastUpdateCell = randomPerson.element.getElementsByTagName('td')[2];
  lastUpdateCell.textContent = randomPerson.lastUpdate;
}

fillTable(); 
setInterval(updateRandomPerson, 1000)
```

- Este ejemplo funcionaria en los navegadores actuales, pero seguramente en IE 6 o alguno de estos puede fallar al usar las funciones `.insertCell` y `.insertRow`.
Para solucionar ese problema deberíamos usar las funciones de toda la vida `createElement` `createTextNode` de esta forma.

```js
// JS Para navegadores demasiado antiguos.

person.element = document.createElement('tr');

const idCell = document.createElement('td');
const idText = document.createTextNode(idx);
idCell.appendChild(idText);
person.element.appendChild(idCell);

const nameCell = document.createElement('td');
const nameText = document.createTextNode(person.name);
nameCell.appendChild(nameText);
person.element.appendChild(nameCell);

const lastUpdateCell = document.createElement('td');
const lastUpdateText = document.createTextNode(person.lastUpdate);
lastUpdateCell.appendChild(lastUpdateText);

person.element.appendChild(lastUpdateCell);
```

- En el archivo de html `JS Vanilla - Tabla.html` puedes descomentar y comentar el code para probarlo. 😀

## Planteamiento con Angular
- En angular ya existe una automatización para esto que permite a la plantilla refrescarse conforme las variables del componente se actualizan.

- En el caso de un `*ngFor` que hace una lista de cosas y estas se van actualizando, podríamos dejar el ngFor tal cual pero por cada cambio en el array se renderizarían de nuevo todos los elementos.
Para solucionar esto deberíamos usar la función `trackBy`
https://angular.io/api/core/TrackByFunction

### Pseudo Ejemplo
1.  Supongamos que tenemos una array en el componente:

```ts
  itemList: Item[] = [
      {id: '1', text: 'Test1'},
      {id: '2', text: 'Test2'},
      {id: '3', text: 'Test3'},
      {id: '4', text: 'Test4'},
  ]
  ```
2. Listamos los elementos de la forma `normal` causando re-rendering.

```html
<ul>
  <li *ngFor="let item of itemList">{{ item.text }}</li>
</ul>
```

3. Ahora creamos el método `trackByFn`
 ```ts
  trackByFn(index: number, item: Item) {
    return item.id;
  }
 ```

4. Añadimos el método `trackByFn` en el `ngFor` de la plantilla quedando así:
```html
<ul>
  <li *ngFor="let item of itemList; trackBy: trackByFn">{{ item.text }}</li>
</ul>
```

- De esta forma, si añadimos un elemento nuevo al array solo se añadirá ese elemento nuevo al DOM sin renderizar toda la lista de nuevo.
