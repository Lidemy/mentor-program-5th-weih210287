<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = get_users_from_session($_SESSION['username']);
  }

  $id = $_GET['id'];
  $stmt = $conn->prepare('SELECT * FROM gz_blog_posts WHERE id=?');
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if(!$result) {
    die('Error' . $conn->error);
  }

  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>查看文章</title>
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
            <?php if (!$username) { ?>
              <li><a class="login-logout-btn" href="./login.php">登入</a></li>
            <?php } else { ?>
              <li><a href="./add_post.php">發表文章</a></li>
              <li>您好！<?php echo escape($user['nickname']); ?> <a class="login-logout-btn" href="./handle_logout.php">登出</a></li>
            <?php } ?>
          </div>
        </ul>
      </div>
    </nav>
    <section class="banner">
      <h1 class="banner__title">查看文章之地</h1>
      <h3 class="banner__subtitle">View my post</h3>
    </section>
    <div class="wrapper">
      <section class="cards admin">
        <?php while($row = $result->fetch_assoc()) { ?>
          <div class="card post">
            <div class="card__top">
              <h1 class="card__top-title"><?php echo escape($row['title']); ?></h1>
            </div>
            <div class="card__info">
              <div><?php echo escape($row['create_at']); ?></div>
              <div><?php echo ' By (@' . escape($row['username']) . ')'; ?></div>
            </div>
            <div class="card__content post">
              <p><?php echo escape($row['content']); ?></p>
            </div>
          </div>
        <?php } ?>
      </section>
    </div>

    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>