<?php
  $status = (object)array(
    "pending" => "Pendent",
    "completed" => "Completada"
  );
  
  $maxTasks = 100;
  
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
  
  function sortTasksByDate($a, $b) {
    $t1 = strtotime($a->dateAdded);
    $t2 = strtotime($b->dateAdded);
    return $t2 - $t1;
  }

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

?>