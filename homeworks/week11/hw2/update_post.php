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

  $id = $_GET['id'];
  if (is_admin($user)) {
    $stmt = $conn->prepare(
      'SELECT * FROM gz_blog_posts WHERE id = ?'
    );
    $stmt->bind_param('i', $id);
  } else {
    $stmt = $conn->prepare(
      'SELECT * FROM gz_blog_posts WHERE id = ? AND username = ?'
    );
    $stmt->bind_param('is', $id, $username);
  }
  
  $result = $stmt->execute();
  if (!$result) {
    die('Get post failed :(' . $conn->error);
  }

  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>編輯文章</title>
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
      <h1 class="banner__title">編輯文章之地</h1>
      <h3 class="banner__subtitle">Edit my post</h3>
    </section>
    <div class="wrapper">
      <section class="cards add_post">
        <div class="card add_post">
          <?php if ($result->num_rows === 0) { ?>
            <h1>權限不符</h1>
          <?php } ?>
          <?php while ($row = $result->fetch_assoc()) { ?>
            <div class="card__top add_post">
              <h1 class="card__top-title add_post">編輯文章</h1>
            </div>
            <form method="POST" action="./handle_update_post.php">
              <div class="action__input-title add_post">
                TITLE<input name="title" value="<?php echo $row['title']; ?>"/>
              </div>
              <div class="action__input-title add_post">
                CONTENT<textarea name="content" rows=10 placeholder="What's on your mind?"><?php echo $row['content'];?></textarea>
              </div>
              <input type="hidden" name="id" value="<?php echo $row['id']?>"/> 
              <div class="action__submit-btn add_post">
                <input class="add_post" type="submit" value="POST"/>
              </div>
            </form>
          <?php } ?>
        </div>
      </section>
    </div>

    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>