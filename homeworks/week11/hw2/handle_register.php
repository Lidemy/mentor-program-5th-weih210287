<?php
  session_start();
  require_once('./conn.php');

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  if (empty(trim($nickname)) || empty(trim($username)) || empty(trim($_POST['password']))) {
    header('Location: ./register.php?errCode=1');
    die('Error');
  }

  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = 'INSERT INTO gz_blog_users(nickname, username, password) VALUES (?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $username, $password);
  $result = $stmt->execute();
  if (!$result) {
    if ($code === 1062) {
      $code = $conn->errno;
      header('Location: ./register.php?errCode=2');
    }
    die('註冊失敗：' . $conn->error);
  }

  $_SESSION['username'] = $username;
  header('Location: ./index.php');
?>