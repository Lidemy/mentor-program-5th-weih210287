<?php
  session_start();
  require_once('./conn.php');
  require_once('./utils.php');

  $page = 1;
  if (!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $limit_per_page = 10;
  $offset = ($page - 1) * $limit_per_page;

  $stmt = $conn->prepare(
    'SELECT C.id AS id, C.create_at AS create_at, C.content AS content, '.
    'U.username AS username, U.nickname AS nickname '.
    'FROM gz_comments AS C '.
    'LEFT JOIN gz_users AS U '.
    'ON C.username = U.username '.
    'WHERE C.is_deleted IS NULL '.
    'ORDER BY C.id DESC '.
    'LIMIT ? OFFSET ?'
  );
  $stmt->bind_param('ii', $limit_per_page, $offset);

  $result = $stmt->execute();
  if (!$result) {
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
    <meta charset="utf-8">

    <title>留言板</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="../normalize.css">
  </head>

  <body>
    <header class="warning">
      <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>

    <div class="member">
      <?php if (!$username) { ?>
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
            } else if ($code === '2') {
              $msg = '* 資料修改失敗';
            }
            echo '<h2 class="info__warning">' . $msg . '</h2>';
          }
        ?>
        <div class="nickname update_nickname">
          <?php if ($username) { ?>
            <h2 class="user_nickname"><?php echo escape($user['nickname']); ?>：</h2>
            <span class="user_nickname-update" alt="修改暱稱" title="修改暱稱">&#x1F589;</span>
            <form method="POST" class="hide board__update-nickname" action="./handle_update_nickname.php">
              <span>修改暱稱<input name="nickname" autocomplete="off"/></span>
              <input type="submit" value="修改" />
            </form>
          <?php } ?>
        </div>
        <form method="POST" class="board__new-comment" action="./handle_add_comment.php">
          <div class="content">
            <textarea name="comment" rows=5 placeholder="請輸入你的留言..."></textarea>
            <?php if ($username && !has_permission($user, 'create', NULL)) { ?>
              <div><h2>已被禁言</h2></div>
            <?php } else if (!$username) { ?>
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
              <span class="card__info-author"><?php echo escape($row['nickname']); ?>
                (@<?php echo escape($row['username']); ?>)
              </span>
              <span class="card__info-time"><?php echo escape($row['create_at']); ?></span>
              <?php if (has_permission($user, 'update', $row)) { ?>
                <span class="comment-update update-btn" href="" alt="編輯留言" title="編輯留言">
                  <svg class="update-btn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path  class="update-btn" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </span>
                <a class="comment-delete" href="./handle_delete_comment.php?id=<?php echo escape($row['id']); ?>" alt="刪除留言" title="刪除留言">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </a>
              <?php }?>
            </div>
            <p class="card__content"><?php echo escape($row['content']); ?></p>
            <form class="hide update-comment" method="POST" action="./handle_update_comment.php">
              <input type="hidden" name="id" value="<?php echo $row['id']; ?>" />
              <textarea name="update-comment" rows=5 placeholder="<?php echo escape($row['content']); ?>"></textarea>
              <input type="submit" value="完成" />
            </form>
          </div>
        </div>
        <?php } ?>
      </section>
      <div class="board__seperate"></div>
      <?php 
        $stmt = $conn->prepare(
          'SELECT count(id) AS count '.
          'FROM gz_comments '.
          'WHERE is_deleted IS NULL'
        );
        $result = $stmt->execute();
        if (!$result) {
          die('Page Count Error' . $conn->error);
        }

        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        $count = $row['count'];
        $total_page = ceil($count / $limit_per_page);
      ?>
      <div class="paginator">
        <?php if ($page != 1) { ?>
          <span><a href="./index.php?page=1">首頁</a></span>
          <span><a href="./index.php?page=<?php echo $page - 1; ?>"> 上一頁</a></span>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <span><a href="./index.php?page=<?php echo $page + 1; ?>">下一頁</a></span>
          <span><a href="./index.php?page=<?php echo $total_page;?>"> 末頁</a></span>
        <?php } ?>
      </div>
    </main>
    <div class="page-info">
      <h2>第 <?php echo $page . ' / ' . $total_page; ?> 頁</h2>
    </div>

    <script>
      var nicknameUpdateBtn = document.querySelector(".user_nickname-update");
      nicknameUpdateBtn.addEventListener("click", (e) => {
        var form = document.querySelector(".board__update-nickname");
        form.classList.toggle("hide");
      });

      var cards = document.querySelector(".cards");
      cards.addEventListener("click", (e) => {
        var commentUpdateBtn = e.target.classList.contains("update-btn");
        if (commentUpdateBtn) {
          var cardInfo = e.target.closest(".card__info");
          var commentUpdateForm = cardInfo.parentNode.querySelector(".update-comment");
          var comment = cardInfo.parentNode.querySelector(".card__content");
          commentUpdateForm.classList.toggle("hide");
          comment.classList.toggle("hide");
        }
      })
    </script>

  </body>
</html>