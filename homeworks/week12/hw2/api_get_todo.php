<?php 
  require_once('../conn.php');

  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['id'])) {
    $json = array(
      'ok' => false,
      'message' => 'id Empty'
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 讀取 DB
  $id = $_GET['id'];

  $stmt = $conn->prepare(
    'SELECT * FROM gz_api_todos WHERE id = ? '
  );
  $stmt->bind_param('i', $id);
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

  // 顯示 api 結果
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  $json = array(
    'ok' => true,
    'data' => array(
      'id' => $row['id'],
      'todo' => $row['todo']
    )
  );

  $response = json_encode($json);
  echo $response;
?>