<?php 
  require_once('../conn.php');

  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['site_key'])) {
    $json = array(
      'ok' => false,
      'message' => 'Site Key Empty'
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 讀取 DB
  $site_key = $_GET['site_key'];

  $stmt = $conn->prepare(
    'SELECT content, nickname, create_at '.
    'FROM api_comments '.
    'WHERE site_key = ? '.
    'ORDER BY create_at DESC'
  );
  $stmt->bind_param('s', $site_key);
  $result = $stmt->execute();
  if (!$result ) {
    $json = array(
      'ok' => false,
      'message' => $conn->error
      // 不要用 $conn->error 比較好，以防印出敏感訊息
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 顯示 api 結果
  $result = $stmt->get_result();
  $comments = array();
  while ($row = $result->fetch_assoc()) {
    array_push($comments, array(
      'content' => $row['content'],
      'nickname' => $row['nickname'],
      'create_at' => $row['create_at']
    ));
  }

  $json = array(
    'ok' => true,
    'comments' => $comments
  );

  $response = json_encode($json);
  echo $response;
?>