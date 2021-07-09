<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
    header('Location: ./login.php?errCode=1');
    die('Error');
  }

  $sql = sprintf(
    'SELECT * FROM gz_users WHERE username="%s" AND password="%s"',
    $username,
    $password
  );

  $result = $conn->query($sql);
  if ($result->num_rows) {
    $_SESSION['username'] = $username;
    header('Location: ./index.php');
  } else {
    header('Location: ./login.php?errCode=2');
  }

?>