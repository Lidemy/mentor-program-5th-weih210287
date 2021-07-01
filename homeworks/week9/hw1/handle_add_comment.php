<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $content = $_POST['comment'];
  if (empty($content)) {
    header('Location: ./index.php?errMsg=1');
    die('Error');
  }

  // 拿到 nickname，加入 comments DB 裡
  $nickname = get_nickname_from_sess($_SESSION['username']);
  $sql = sprintf(
    'INSERT INTO gz_comments(nickname, content) VALUES ("%s", "%s")',
    $nickname,
    $content
  );

  $result = $conn->query($sql);
  if (!$result) {
    die('Comment Failed :(' . $conn->error);
  }

  header('Location: ./index.php');
?>