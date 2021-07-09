<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $sql = 'SELECT * FROM gz_comments ORDER BY id DESC';
  $result = $conn->query($sql);
  if (!$result) {
    die('Error' . $conn->error);
  }

  $nickname = NULL;
  if (!empty($_SESSION['username'])) {
    $nickname = get_nickname_from_sess($_SESSION['username']);
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <title>留言板</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
    <link rel="stylesheet" href="./style.css">
  </head>

  <body>
    <header class="warning">
      <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>

    <div class="member">
      <?php if (!$nickname) { ?>
        <a class="member__btn" href="./register.php">註冊</a>
        <a class="member__btn" href="./login.php">登入</a>
      <?php } else { ?>
        <a class="member__btn" href="./logout.php">登出</a>
      <?php } ?>
    </div>
    <main class="board">
      <div class="board__top">
        <h1>Comment</h1>
        <?php
          if (!empty($_GET['errMsg'])) {
            $code = $_GET['errMsg'];
            $msg = 'Error';
            if ($code === '1') {
              $msg = '* 資料不齊全';
            }
            echo '<h2 class="info__warning">' . $msg . '</h2>';
          }
        ?>
        <form method="POST" class="board__new-comment" action="./handle_add_comment.php">
          <div class="nickname">
            <?php if ($nickname) { ?>
              <h2 class="user_nickname"><?php echo $nickname; ?>：</h2>
            <?php } ?>
          </div>
          <div class="content">
            <textarea name="comment" rows=5 placeholder="請輸入你的留言..."></textarea>
            <?php if (!$nickname) { ?>
              <div><h2>登入發布留言</h2></div>
            <?php } else { ?>
              <input type="submit" value="送出" />
            <?php } ?>
          </div>
        </form>
      </div>
      <div class="board__seperate"></div>
      <section class="cards">
        <?php
          while ($row = $result->fetch_assoc()) {
        ?>
        <div class="card">
          <div class="card__avatar"></div>
          <div class="card__body">
            <div class="card__info">
              <span class="card__info-author"><?php echo $row['nickname']; ?></span>
              <span class="card__info-time"><?php echo $row['current_at']; ?></span>
            </div>
            <p class="card__content"><?php echo $row['content']; ?></p>
          </div>
        </div>
        <?php } ?>        
      </section>
    </main>

  </body>
</html>