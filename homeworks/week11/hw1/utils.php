<?php
  function get_users_from_session($session) {
    global $conn;

    // 從 session 拿到 username
    $username = $session;

    // 從 users 拿到 *
    $sql = 'SELECT * FROM gz_users WHERE username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
      die('Error' . $conn->error);
    }

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($content) {
    return htmlspecialchars($content, ENT_QUOTES);
  }

  // action: update, delete, create
  function has_permission($user, $action, $comment) {
    if ($user) {
      if ($user['role'] === 'ADMIN') {
        return true;
      } else if ($user['role'] === 'NORMAL') {
        if ($action === 'create') return true;
        return $user['username'] === $comment['username'];
      } else if ($user['role'] === 'BANNED') {
        if ($action === 'create') return false;
        return $user['username'] === $comment['username'];
      }
    }
  }

  function is_admin($user) {
    return $user['role'] === 'ADMIN';
  }
?>