<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $username = NULL;
  $user = NULL;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = get_users_from_session($_SESSION['username']);
  } else {
    header('Location: ./login.php');
  }

  if (is_banned($user)) {
    header('Location: ./admin.php');
    die('Error');
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>新增文章</title>
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
            <li>您好！<?php echo escape($user['nickname']); ?> <a class="login-logout-btn" href="./handle_logout.php">登出</a></li>
          </div>
        </ul>
      </div>
    </nav>
    <section class="banner">
      <h1 class="banner__title">發表文章之地</h1>
      <h3 class="banner__subtitle">Add a new post</h3>
    </section>
    <div class="wrapper">
      <section class="cards add_post">
        <div class="card add_post">
          <div class="card__top add_post">
            <h1 class="card__top-title add_post">發表文章</h1>
          </div>
          <?php
          if (!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error';
            if ($_GET['errCode'] === '1') {
              $msg = '文章資料不齊全';
            } else if ($_GET['errCode'] === '2') {
              $msg = '新增文章失敗';
            }
            echo '<h2 class="info__warning">* ' . $msg . '</h2>';
          }
        ?>
        <form method="POST" action="./handle_add_post.php">
          <div class="action__input-title add_post">
            TITLE<input name="title"/>
          </div>
          <div class="action__input-title add_post">
            CONTENT<textarea name="content" rows=10 placeholder="What's on your mind?"></textarea>
          </div>
          <div class="action__submit-btn add_post">
            <input class="add_post" type="submit" value="POST"/>
          </div>
        </form>
        </div>
      </section>
    </div>

    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>