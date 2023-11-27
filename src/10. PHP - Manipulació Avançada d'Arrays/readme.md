# 10. PHP - Manipulació Avançada d'Arrays
- Para este ejercicio he utilizado la versión de PHP 8.0.26
- He limitado el número máximo de tareas a 100 para las estadísticas.

## Planteamiento

- 1. Creo un object a modo de `ENUM` ya que en esta versión de PHP no tengo `ENUM` y definido el número máximo de tareas a generar. Con los nombres de las keys de este object jugaré para crear las funciones de filtrar el array y de paso nos ahorramos escribir strings literales por cada vez que necesitemos usar el estado de la tarea.

```php
  $status = (object)array(
    "pending" => "Pendent",
    "completed" => "Completada"
  );
  
  $maxTasks = 100;
```

- 2. Genero la función para generar las tareas.
  He utilizado un `for` simple y la función `array_push` para generar el array de tareas.
  Cada tarea es un object con las keys `id, titol, descripcio, estat, dateAdded`
  La fecha de cada tarea se genera de forma aleatoria entre el rango de fechas `1993-01-01` y `2024-01-01`.

```php
  function generateDate() {
    $rangeStart = strtotime("1993-01-01");
    $rangeEnd = strtotime("2024-01-01");
    $format = 'Y-m-d';
    return date($format, mt_rand($rangeStart, $rangeEnd));
  }
  
  function generateTasks() {
    global $status, $maxTasks;
    
    $tasks = array();
    
    for($i = 1; $i <= $maxTasks; $i++) {  
      $newTask = (object)array(
        "id" => $i,
        "titol" => "titulas", 
        "descripcio" => "megadescripció", 
        "estat" => rand(0, 1) == 0 ? $status->pending : $status->completed,
        "dateAdded" => generateDate()
      );
      
      array_push($tasks, $newTask);
    }
    
    return $tasks;
  }
```

- 3. Genero las funciones para filtrar las tareas con estado `Completada y Pendent` aprovechando el object de estado de la tarea a modo de enum, así genero los nombres de las funciones de forma "dinamica".
  La función `filterTasks` se le pasa el array de tareas y el estado. 
  Esta ya genera el nombre de la función del filtro y lo usa en la función `array_filter`.
```php
  function filterCompletada($task) {
    global $status;
    return $task->estat == $status->completed;
  }

  function filterPendent($task) {
    global $status;
    return $task->estat == $status->pending;
  }

  function filterTasks($tasks, $status) {
    $filter = "filter" . $status;
    return $filteredTasks = array_filter($tasks, $filter);
  }
```

- 4. Genero la función para ordenar el array de tareas por orden de fecha descendiente.
```php
  function sortTasksByDate($a, $b) {
    $t1 = strtotime($a->dateAdded);
    $t2 = strtotime($b->dateAdded);
    return $t2 - $t1;
  }
```

- 5. Ya tenemos lo necesario para testear las funciones e imprimir las estadísticas.
```php

  // Generamos las tareas.
  $tasks = generateTasks();
  
  // Filtramos por tareas completadas.
  $tasksCompleted = filterTasks($tasks, $status->completed);

  // Filtramos por tareas pendientes.
  $tasksPending = filterTasks($tasks, $status->pending);
  
  // Ordenamos las tareas sin filtrar por orden de fecha descendiente.
  usort($tasks, 'sortTasksByDate');
  
  // Obtenemos los counts de las tareas y tareas segun estado.
  $totalTasks = count($tasks);
  $totalTasksCompleted = count($tasksCompleted);
  $totalTasksPending = count($tasksPending);
  
  // Imprimimos los conteos.
  echo "Numero total de tareas: $totalTasks<br/>";
  echo "Numero de tareas completadas: $totalTasksCompleted<br/>";
  echo "Numero de tareas pendientes: $totalTasksPending<br/>";

  // Imprimimos las tareas por orden de fecha descendiente.
  var_dump($tasks)

```






