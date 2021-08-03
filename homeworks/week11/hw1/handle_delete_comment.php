<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = $_SESSION['username'];
  $id = $_GET['id'];
  if (empty($username)) {
    header('Location: ./index.php?errMsg=2');
    die('Username Error');
  }

  $user = get_users_from_session($username);
  if (is_admin($user)) {
    $stmt = $conn->prepare(
      'UPDATE gz_comments SET is_deleted = 1 '.
      'WHERE id = ? AND is_deleted IS NULL'
    );
    $stmt->bind_param("i", $id);
  } else {
    $stmt = $conn->prepare(
      'UPDATE gz_comments SET is_deleted = 1 '.
      'WHERE id = ? AND username = ? AND is_deleted IS NULL'
    );
    $stmt->bind_param("is", $id, $username);
  }
  
  $result = $stmt->execute();
  if (!$result) {
    die('Delete Result Failed :(' . $conn->error);
  } else if ($stmt->affected_rows === 0) {
    header('Location: ./index.php?errMsg=2');
    die('Affected_rows Error');
  }

  header('Location: ./index.php');
?>