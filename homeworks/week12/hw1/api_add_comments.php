<?php 
  require_once('../conn.php');

  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_POST['content']) || empty(trim($_POST['nickname'])) || empty($_POST['site_key'])) {
    $json = array(
      'ok' => false,
      'message' => 'Empty space is not allowed'
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // 加入 DB
  date_default_timezone_set('Asia/Taipei');
  $date = date('Y-m-d- h:i:s', time());
  $content = $_POST['content'];
  $nickname = $_POST['nickname'];
  $site_key = $_POST['site_key'];

  $stmt = $conn->prepare(
    'INSERT INTO gz_api_comments(content, nickname, site_key) '.
    'VALUES (?, ?, ?)'
  );
  $stmt->bind_param('sss', $content, $nickname, $site_key);
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

  $comments = array();
  array_push($comments, array(
    'content' => $content,
    'nickname' => $nickname,
    'site_key' => $site_key,
    'create_at' => $date
  ));

  $json = array(
    'ok' => true,
    'message' => 'Comment Added!',
    'comments' => $comments
  );

  $response = json_encode($json);
  echo $response;
?>