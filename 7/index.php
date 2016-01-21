<?php

session_start();

//カウンタを設定
if(!isset($_SESSION['count'])){
    $_SESSION['count'] = 0;
}
//メッセージを受け取る
if(isset($_GET['msg'])){
    if($_GET['msg'] === 'err1'){
        $msg = 'emailとpasswordを入力してください';
        $_SESSION['count']++;
    }else if($_GET['msg'] === 'err2'){
        $msg = 'emailまたはpasswordが間違っています';
        $_SESSION['count']++;
    }else if($_GET['msg'] === 'logout'){
        $_SESSION['count'] = 0;
    }else if($_GET['msg'] === 'appologize'){
        $_SESSION['count'] = 0;
    }
}
$list = null;

//セッションカウントダウン
switch($_SESSION['count']){
    case 3:
        $list = '<p class="text_cen">注意！三匹のヒヨコが貯まる前にログインしよう！</p>';
        break;
    case 4:
        $list = '<img src="img/bank_s.png" width="130" style="margin-right:30px">';
        break;
    case 5:
        $list = '<img src="img/bank_s.png" width="130" style="margin-right:30px"><img src="img/bank_s.png" width="130" style="margin-right:30px">';
        break;
    case 6:
        $list = '<img src="img/bank_s.png" width="130" style="margin-right:30px"><img src="img/bank_s.png" width="130" style="margin-right:30px"><img src="img/bank_s.png" width="130">';
        break;
    case 7:
        //ページ遷移
        header('Location: out.php');
        exit;
        break;
    default:
        $list = null;
        break;
}
?>



<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>index.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen">Accumile</h1>
        <form action="login.php" method="post">
            <input type="text" name="email" placeholder="Email" class="center mgn_btm">
            <input type="text" name="password" placeholder="Password" class="center mgn_btm">
            <?php if(isset($msg)){echo "<p class='err_msg'>".$msg."</p>";}?>
            <input type="submit" class="btn center" value="ENTER">
        </form>
        <button onclick="location.href='signin.php'" class="btn center" style="margin-top:50px;">SIGN IN</button>
        <div id="danger_box">
           <p class="text_cen">お知らせ</p>
            <?php echo $list ?>
        </div>
    </div><!--wrapper-->
</body>
</html>