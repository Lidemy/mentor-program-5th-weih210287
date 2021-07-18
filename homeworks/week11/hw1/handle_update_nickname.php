<?php
  session_start();
  require_once('./conn.php');

  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];
  if (!isset($nickname) || strlen(trim($nickname)) === 0) {
    header('Location: ./index.php?errMsg=1');
    die('Error');
  }

  // 拿到 nickname，加入 comments DB 裡
  $sql = 'UPDATE gz_users SET nickname = ? WHERE username = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $nickname, $username);
  $result = $stmt->execute();
  if (!$result) {
    die('Nickname Result Failed :(' . $conn->error);
  }

  header('Location: ./index.php');
?>