<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  if (!$username) {
    header('Location: ./login.php');
  }
  
  $user = get_users_from_session($username);
  if (is_banned($user)) {
    header('Location: ./admin.php');
    die('User is Banned');
  }

  if (is_admin($user)) {
    $stmt = $conn->prepare(
      'DELETE FROM gz_blog_posts WHERE id = ?'
    );
    $stmt->bind_param('i', $id);
  } else {
    $stmt = $conn->prepare(
      'DELETE FROM gz_blog_posts WHERE id = ? AND username = ?'
    );
    $stmt->bind_param('is', $id, $username);
  }

  $result = $stmt->execute();
  if(!$result) {
    header('Location: ./admin.php?errMsg=1');
    die('Delete Result Error :(' . $conn->error);
  } else if ($stmt->affected_rows === 0) {
    header('Location: ./admin.php?errMsg=1');
    die('Delete Failed :(' . $conn->error);
  }

  header('Location: ./admin.php');
?>