<?php
//タグを表示
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
<title>selectdb.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen">どのスキルに時間を貯めますか？</h1>
        <div id="table_box">
            <form action="accumulate.php" method="post">
                <ul><?= $list?></ul>
            </form>
        </div>
        <button onclick="location.href='main.php'" class="center btn back_btn">Back</button>
    </div><!--wrapper-->
<script>
$(function(){
})
</script>
</body>
</html>