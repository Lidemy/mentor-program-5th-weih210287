<?php
  require_once('./conn.php');

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($nickname) || empty($username) || empty($password)) {
    header('Location: ./register.php?errCode=1');
    die('Error');
  }

  $sql = sprintf(
    'INSERT INTO gz_users(nickname, username, password) VALUES ("%s", "%s", "%s")',
    $nickname,
    $username,
    $password
  );

  $result = $conn->query($sql);
  if (!$result) {
    $code = $conn->errno;
    if ($code === 1062) {
      header('Location: ./register.php?errCode=2');
    }
    die('註冊失敗：' . $conn->error);
  }

  header('Location: ./login.php');
?>