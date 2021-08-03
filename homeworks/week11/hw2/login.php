<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>部落格 - 登入</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
    <link rel="stylesheet" href="../normalize.css">
    <link rel="stylesheet" href="./style.css">
  </head>

  <body>
    <div class="wrapper action">
      <a class="member__btn top" href="./index.php">回留言板</a>
      <div class="card action">
        <h1>Log In</h1>
        <?php
          if (!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error';
            if ($_GET['errCode'] === '1') {
              $msg = '登入資料不齊全';
            } else if ($_GET['errCode'] === '2') {
              $msg = '登入帳密錯誤';
            }
            echo '<h2 class="info__warning">* ' . $msg . '</h2>';
          }
        ?>
        <form method="POST" action="./handle_login.php">
          <div class="action__input-title">USERNAME
            <input name="username"/>
          </div>
          <div class="action__input-title">PASSWORD
            <input type="password" name="password"/>
          </div>
          <div class="action__submit-btn"><input type="submit" value="SIGN IN"/></div>
        </form>
          <div class="member__btn bottom">
            還沒註冊過帳號嗎？<a class="register-btn" href="./register.php">註冊</a>
          </div>
      </div>
    </div>

    <footer class="action">
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>