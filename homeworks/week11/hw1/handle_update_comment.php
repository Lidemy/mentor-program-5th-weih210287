<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_SESSION['username'];
  $id = $_POST['id'];
  $content = $_POST['update-comment'];
  if (empty($username)) {
    header('Location: ./index.php?errMsg=2');
    die('Error');
  } else if (!isset($content) || strlen(trim($content)) === 0) {
    header('Location: ./index.php?errMsg=1');
    die('Error');
  }

  $user = get_users_from_session($username);
  if (is_admin($user)) {
    $stmt = $conn->prepare(
      'UPDATE gz_comments SET content = ?, create_at = CURRENT_TIMESTAMP '.
      'WHERE id = ? AND is_deleted IS NULL'
    );
    $stmt->bind_param("si", $content, $id);
  } else {
    $stmt = $conn->prepare(
      'UPDATE gz_comments SET content = ?, create_at = CURRENT_TIMESTAMP '.
      'WHERE id = ? AND username = ? AND is_deleted IS NULL'
    );
    $stmt->bind_param("sis", $content, $id, $username);
  }
  $result = $stmt->execute();
  if (!$result) {
    die('Comment Failed :(' . $conn->error);
  } else if ($stmt->affected_rows === 0) {
    header('Location: ./index.php?errMsg=2');
    die('Error');
  }

  header('Location: ./index.php');
?>