<?php
  function get_nickname_from_sess($session) {
    global $conn;

    // 從 session 拿到 username
    $username = $_SESSION['username'];

    // 從 users 拿到 nickname
    $nickname_sql = sprintf(
      'SELECT nickname FROM gz_users WHERE username = "%s"',
      $username
    );
    $nickname = conn_query_get_row($nickname_sql, 'nickname');
    return $nickname;
  }

  function conn_query_get_row($sql, $str) {
    global $conn;
    $result = $conn->query($sql);
    if (!$result) {
      die('Error' . $conn->error);
    }
    $row = $result->fetch_assoc();
    return $row[$str];
  }
?>