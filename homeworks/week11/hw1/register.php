<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">

    <title>留言板 - 註冊</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
    <link rel="stylesheet" href="./style.css">
  </head>

  <body>
    <header class="warning">
      <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>

    <div class="member">
      <a class="member__btn" href="./index.php">回留言板</a>
      <a class="member__btn" href="./login.php">登入</a>
    </div>
    <main class="board">
      <div class="board__top board__member">
        <h1>會員註冊</h1>
        <?php
          if (!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error';
            if ($code === '1') {
              $msg = '* 錯誤：會員註冊資料不齊全';
            } else if ($code === '2') {
              $msg = '* 錯誤：會員帳號已被註冊';
            }
            echo '<h2 class="info__warning">' . $msg . '</h2 >';
          }
        ?>
        <form method="POST" class="board__new-comment" action="./handle_register.php">
          <div class="member__info nickname">
            <div>暱&emsp;&emsp;&emsp;稱：<input name="nickname" /></div>
            <div>使用者帳號：<input name="username" /></div>
            <div>使用者密碼：<input type="password" name="password" /></div>
          </div>
          <input type="submit" value="註冊" />
        </form>
      </div>
    </main>
  </body>
</html>