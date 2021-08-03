<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $limit_per_page = 5;
  $offset = ($page - 1) * $limit_per_page;

  $stmt = $conn->prepare(
    'SELECT * FROM gz_blog_posts '.
    'ORDER BY create_at DESC '.
    'LIMIT ? OFFSET ?'
  );
  $stmt->bind_param('ii', $limit_per_page, $offset);
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
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>部落格</title>
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
            <?php if (!$username) { ?>
              <li><a href="./login.php">管理後台</a></li>
              <li><a class="login-logout-btn" href="./login.php">登入</a></li>
            <?php } else { ?>
              <li><a href="./admin.php">管理後台</a></li>
              <li><a href="./add_post.php">發表文章</a></li>
              <li>您好！<?php echo escape($user['nickname']); ?> <a class="login-logout-btn" href="./handle_logout.php">登出</a></li>
            <?php } ?>
          </div>
        </ul>
      </div>
    </nav>
    <section class="banner">
      <h1 class="banner__title">存放技術之地</h1>
      <h3 class="banner__subtitle">Welcome to my blog</h3>
    </section>
    <div class="wrapper">
      <section class="cards">
        <?php while($row = $result->fetch_assoc()) { ?>
          <div class="card">
            <div class="card__top">
              <h1 class="card__top-title"><a href="./post.php?id=<?php echo $row['id']; ?>"><?php echo escape($row['title']); ?></a></h1>
            </div>
            <div class="card__info">
              <div><?php echo escape($row['create_at']); ?></div>
              <div><?php echo ' By (@' . escape($row['username']) . ')'; ?></div>
            </div>
            <div class="card__content">
              <p><?php echo escape($row['content']); ?></p>
            </div>
            <a href="./post.php?id=<?php echo $row['id']; ?>">
              <div class="card__readmore-btn" >READ MORE</div>
            </a>
          </div>
        <?php } ?>
        <?php 
          $stmt = $conn->prepare('SELECT count(id) AS count FROM gz_blog_posts');
          $result = $stmt->execute();
          if (!$result) {
            die('Page Count Error' . $conn->error);
          }

          $result = $stmt->get_result();
          $row = $result->fetch_assoc();

          $count = $row['count'];
          $total_page = ceil($count / $limit_per_page);
        ?>
        <div class="paginator cards__edit-post-btn page-btn">
          <?php if ($page != 1) { ?>
            <span><a class="card__top-edit-btn" href="./index.php?page=1.php">首頁</a></span>
            <span><a class="card__top-edit-btn" href="./index.php?page=<?php echo $page - 1; ?>.php">上一頁</a></span>
          <?php } else if ($page != $total_page) { ?>
            <span><a class="card__top-edit-btn" href="./index.php?page=<?php echo $page + 1; ?>.php">下一頁</a></span>
            <span><a class="card__top-edit-btn" href="./index.php?page=<?php echo $total_page; ?>.php">末頁</a></span>
          <?php } ?>
        </div>
        <span class="paginator__count-page">第 <?php echo $page . ' / ' . $total_page; ?> 頁</span>
      </section>
    </div>

    <footer>
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>