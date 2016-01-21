<?php
$skill_title = htmlspecialchars($_POST['skill_title'],ENT_QUOTES,'UTF-8');
$msg = null;

try{
    $pdo = new PDO('mysql:dbname=Accumile;host=localhost;charset=utf8;','root','');
    //skill_titleからの消去
    $sql = "DELETE FROM skill_titles WHERE skill_title = :skill_title";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':skill_title',$skill_title);
    $stmt->execute();
    //skill_dataからの消去
    $sql = "DELETE FROM skill_data WHERE skill_title = :skill_title";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':skill_title',$skill_title);
    $stmt->execute();
    $msg = '成功しました';
}catch(PDOException $e) {
    $msg = htmlspecialchars($e->getMessage(),ENT_QUOTES,'UTF-8');
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>remove_tbl_end.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen"><?= $msg?></h1>
        <button onclick="location.href='main.php'" class="center btn back_btn">Back</button>
    </div><!--wrapper-->
</body>
</html>