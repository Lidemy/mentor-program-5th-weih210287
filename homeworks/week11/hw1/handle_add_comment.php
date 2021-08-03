<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_SESSION['username'];
  $content = $_POST['comment'];
  if (!$username) {
    header('Location: ./index.php?errMsg=2');
    die('Username Error');
  } else if (!isset($content) || strlen(trim($content)) === 0) {
    header('Location: ./index.php?errMsg=1');
    die('Content Error');
  }

  $user = get_users_from_session($username);
  if (!has_permission($user, 'create', NULL)) {
    header('Location: ./index.php?errMsg=2');
    die('Permission Error');
  }

  $sql = 'INSERT INTO gz_comments(username, content) VALUES (?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $username, $content);

  $result = $stmt->execute();
  if (!$result) {
    die('Comment Add Failed :(' . $conn->error);
  }

  header('Location: ./index.php');
?>