<?php
try{
    $pdo = new PDO('mysql:dbname=Accumile;host=localhost;charset=utf8;','root','');
    $sql = "SELECT * FROM skill_titles";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $list=null;
    while($re = $stmt->fetch(PDO::FETCH_ASSOC)){
        $list .= "<input type='submit' name='skill_title' value='".$re['skill_title']."' class='btn center mgn_btm'>";
    }
}catch(PDOException $e){
    echo 'Connection failed: ' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>remove_tbl.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen">どのスキルを消しますか？</h1>
        <div id="table_box">
            <form action="remove_tbl_end.php" method="post">
                <ul><?= $list ?></ul>
            </form>
        </div>
        <button onclick="location.href='main.php'" class="center btn back_btn">Back</button>
    </div><!--wrapper-->
</body>
</html>