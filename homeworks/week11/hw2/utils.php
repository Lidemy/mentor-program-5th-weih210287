<?php 
  function get_users_from_session($session) {
    global $conn;

    $username = $session;
    $stmt = $conn->prepare(
      'SELECT * FROM gz_blog_users WHERE username = ?'
    );
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
      die('Function Error' . $conn->error);
    }

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
  }

  function escape($str) {
    return htmlspecialchars($str,  ENT_QUOTES);
  }

  // action: create, update, delete, view
  function has_permission($user, $action, $comment) {
    if ($user) {
      if ($user['role'] === 'ADMIN') {
        return true;
      }
      if ($user['role'] === 'NORMAL') {
        return $user['username'] === $comment['username'];
      }
      if ($user['role'] === 'BANNED') {
        if ($action === 'view') return $user['username'] === $comment['username'];
        return false;
      }
    }
  }

  function is_admin($user) {
    return $user['role'] === 'ADMIN';
  }

  function is_banned($user) {
    return $user['role'] === 'BANNED';
  }
?>