<?php 
  require_once('../conn.php');

  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_POST['todo'])) {
    $json = array(
      'ok' => false,
      'message' => 'Empty is not allowed'
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 加入 DB
  $todo = $_POST['todo'];

  $stmt = $conn->prepare(
    'INSERT INTO gz_api_todos(todo) VALUES (?)'
  );
  $stmt->bind_param('s', $todo);
  $result = $stmt->execute();
  if (!$result ) {
    $json = array(
      'ok' => false,
      'message' => $conn->error
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    'ok' => true,
    'message' => 'Comment Added!',
    'id' => $conn->insert_id
  );

  $response = json_encode($json);
  echo $response;
?>