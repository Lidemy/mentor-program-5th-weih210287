<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $stmt = $conn->prepare(
    'SELECT P.id AS id, P.title AS title, P.content AS content, P.create_at AS create_at, '.
    'U.nickname AS nickname, U.username AS username, U.role AS role '.
    'FROM gz_blog_posts AS P LEFT JOIN gz_blog_users AS U '.
    'ON U.username = P.username '.
    'ORDER BY P.id DESC'
  );

  $result = $stmt->execute();
  if(!$result) {
    die('Error' . $conn->error);
  }

  $result = $stmt->get_result();

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = get_users_from_session($_SESSION['username']);
  } else {
    header('Location: ./login.php');
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>管理後台</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
    <link rel="stylesheet" href="../normalize.css">
    <link rel="stylesheet" href="./style.css">
  </head>

  <body>
    <nav>
      <div class="wrapper">
        <div><a class="navbar__site-name" href="./index.php">Who's Blog</a></div>
        <ul class="navbar__list">
          <div class="navbar__blog-left">
            <li><a href="./post_list.php">文章列表</a></li>
            <li><a href="#">分類專區</a></li>
            <li><a href="#">關於我</a></li>
          </div>
          <div class="nav__user-right">
            <li><a href="./index.php">首頁</a></li>
            <li><a href="./admin.php">管理後台</a></li>
            <li><a href="./add_post.php">發表文章</a></li>
            <li>您好！<?php echo escape($user['nickname']); ?> <a class="login-logout-btn" href="./handle_logout.php">登出</a></li>
          </div>
        </ul>
      </div>
    </nav>
    <section class="banner">
      <h1 class="banner__title">管理文章之地</h1>
      <h3 class="banner__subtitle">Manage my blog</h3>
    </section>
    <div class="wrapper">
      <section class="cards admin">
        <?php
          if (!empty($_GET['errMsg'])) {
            $code = $_GET['errMsg'];
            $msg = 'Error';
            if ($code === '1') {
              $msg = '* 資料修改失敗';
            }
            echo '<h1 class="err">' . $msg . '</h1>';
          }
        ?>
        <?php if ($username && is_banned($user)) { ?>
          <h1 class="banned">帳號已被停權！</h1>
        <?php } ?>
        <?php while($row = $result->fetch_assoc()) { ?>
          <?php if (has_permission($user, 'update', $row)) { ?>
            <span class="cards__edit-post-btn">
              <span><a class="card__top-edit-btn" href="./update_post.php?id=<?php echo $row['id']; ?>">編輯</a></span>
              <span><a class="card__top-edit-btn" href="./handle_delete_post.php?id=<?php echo $row['id']; ?>">刪除</a></span>
            </span>
          <?php } ?>
          <?php if (has_permission($user, 'view', $row)) { ?>
            <span class="cards__edit-post-btn">
              <span><a class="card__top-edit-btn" href="./post.php?id=<?php echo $row['id']; ?>">查看</a></span>
            </span>
            <div class="card admin">
              <div class="card__info admin">
                <div><?php echo escape($row['create_at']); ?></div>
                <div><?php echo ' By (@' . escape($row['username']) . ')'; ?></div>
              </div>
              <div class="card__top">
                <h1 class="card__top-title"><a href="./post.php?id=<?php echo $row['id']; ?>"><?php echo escape($row['title']); ?></a></h1>
              </div>
            </div>
          <?php } ?>
        <?php } ?>
      </section>
    </div>

    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>