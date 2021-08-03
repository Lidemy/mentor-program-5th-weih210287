<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $id = $_POST['id'];
  $username = $_SESSION['username'];
  $title = $_POST['title'];
  $content = $_POST['content'];
  if (!$username) {
    header('Location: ./index.php');
    die('Error');
  } else if (empty(trim($title))) {
    header('Location: ./update_post.php?errCode=1');
    die('Error');
  }

  $user = get_users_from_session($username);
  if (is_banned($user)) {
    header('Location: ./admin.php');
    die('Error');
  }

  $user = get_users_from_session($username);
  if (is_admin($user)) {
    $stmt = $conn->prepare(
      'UPDATE gz_blog_posts SET title = ?, content = ?, create_at = CURRENT_TIMESTAMP '.
      'WHERE id = ?'
    );
    $stmt->bind_param('ssi', $title, $content, $id);
  } else {
    $stmt = $conn->prepare(
      'UPDATE gz_blog_posts SET title = ?, content = ?, create_at = CURRENT_TIMESTAMP '.
      'WHERE id = ? AND username = ?'
    );
    $stmt->bind_param('ssis', $title, $content, $id, $username);
  }
  
  $result = $stmt->execute();
  if (!$result) {
    header('Location: ./admin.php');
    die('Update result error :(' . $conn->error);
  } else if ($stmt->affected_rows === 0) {
    header('Location: ./admin.php');
    die('Update failed :(' . $conn->error);
  }
  header('Location: ./admin.php');
?>