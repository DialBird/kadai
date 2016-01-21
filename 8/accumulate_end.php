<?php
//前ページからのPOST
//$skill = $_POST['skill'];
$skill_title = htmlspecialchars($_POST['skill_title'],ENT_QUOTES,'UTF-8');
//$date = $_POST['date'];
$date = htmlspecialchars($_POST['date'],ENT_QUOTES,'UTF-8');
//$hour = $_POST['hour'];
$hour = htmlspecialchars($_POST['hour'],ENT_QUOTES,'UTF-8');
$msg = null;

//新バージョン
$pdo = new PDO('mysql:dbname=Accumile;host=localhost;charset=utf8;','root','');
$sql = "SELECT * FROM skill_data WHERE date = :a1 AND skill_title = :a2 ";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':a1',$date);
$stmt->bindValue(':a2',$skill_title);
$stmt->execute();
if(!$re = $stmt->fetch(PDO::FETCH_ASSOC)){//fetchでtrue,falseを返す唯一の方法！
    $msg = '本日初勉強！';
    $sql = "INSERT INTO skill_data(id,date,skill_title,hours) VALUES(NULL, :a1, :a2, :a3)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':a1',$date);
    $stmt->bindValue(':a2',$skill_title);
    $stmt->bindValue(':a3',$hour);
    $stmt->execute();
}else{                          //この時点で$reが自由に使える！if文でもwhileのような使い方ができる！
    $msg = '更新完了！';
    $total = $hour + $re['hours']; //新しく打ち込んだ値と今日既に入れてあった値を合計。
    $sql = "UPDATE skill_data SET hours = :hours WHERE date = :date AND skill_title = :skill_title";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':hours',$total);
    $stmt->bindValue(':date',$date);
    $stmt->bindValue(':skill_title',$skill_title);
    $stmt->execute();
    $msg = '今日の記録を更新しました';
}

?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>accumulate_end.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen"><?= $msg?></h1>
        <button onclick="location.href='main.php'" class="center btn">Back</button>
    </div><!--wrapper-->
</body>
</html>