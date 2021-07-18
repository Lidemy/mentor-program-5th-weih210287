<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_SESSION['username'];
  $title = $_POST['title'];
  $content = $_POST['content'];
  if (!$username) {
    header('Location: ./index.php');
    die('Error');
  } else if (empty(trim($title))) {
    header('Location: ./add_post.php?errCode=1');
    die('Error');
  }

  $user = get_users_from_session($username);
  if (is_banned($user)) {
    header('Location: ./admin.php');
    die('Error');
  }

  $stmt = $conn->prepare(
    'INSERT INTO gz_blog_posts(username, title, content) '.
    'VALUES (?, ?, ?)'
  );
  $stmt->bind_param('sss', $username, $title, $content);
  $result = $stmt->execute();
  if (!$result) {
    header('Location: ./add_post.php?errCode=2');
    die('Add Post Failed :(' . $conn->error);
  }

  header('Location: ./admin.php');
?>