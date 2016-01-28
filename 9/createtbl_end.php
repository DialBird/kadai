<?php
//テーブル名受け取り
$skill_title = htmlspecialchars($_POST['skill_title'],ENT_QUOTES,'UTF-8');
$result = null;

//タグ作り
try{
    $pdo = new PDO('mysql:dbname=Accumile;host=localhost;charset=utf8;','root','');
    $sql = "INSERT INTO skill_titles(id,skill_title) VALUES(NULL, :a1)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':a1',$skill_title);
    $stmt->execute();
    $result = htmlspecialchars('新しい目標を設定しました！',ENT_QUOTES,'UTF-8');
}catch (PDOException $e) {
    $result = htmlspecialchars($e->getMessage(),ENT_QUOTES,'UTF-8');
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>createtbl_end.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen mgn_btm"><?=$result?></h1>
        <button onclick="location.href='main.php'" class="center btn">Back</button>
    </div><!--wrapper-->
<script>
$(function(){
    
})
</script>
</body>
</html>