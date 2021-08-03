<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>部落格 - 註冊</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
    <link rel="stylesheet" href="../normalize.css">
    <link rel="stylesheet" href="./style.css">
  </head>

  <body>
    <div class="wrapper action">
      <a class="member__btn top" href="./index.php">回留言板</a>
      <div class="card action">
        <h1>Register</h1>
        <?php
          if (!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'Error';
            if ($_GET['errCode'] === '1') {
              $msg = '註冊資料不齊全';
            } else if ($_GET['errCode'] === '2') {
              $msg = '帳號已被註冊';
            }
            echo '<h2 class="info__warning">* ' . $msg . '</h2>';
          }
        ?>
        <form method="POST" action="./handle_register.php">
          <div class="action__input-title">NICKNAME
            <input name="nickname"/>
          </div>
          <div class="action__input-title">USERNAME
            <input name="username"/>
          </div>
          <div class="action__input-title">PASSWORD
            <input type="password" name="password"/>
          </div>
          <div class="action__submit-btn"><input type="submit" value="SIGN UP"/></div>
        </form>
        <div class="member__btn bottom">
          已經有帳號了嗎？<a class="register-btn" href="./login.php">登入</a>
        </div>
      </div>
    </div>

    <footer class="action">
      Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </body>
</html>