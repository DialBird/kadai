<?php
$skill_title = $_POST['skill_title'];

try{
    $pdo = new PDO("mysql:dbname=Accumile;host=localhost;charset=utf8",'root','');
    $sql = "SELECT * FROM skill_data WHERE skill_title = :skill_title";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':skill_title',$skill_title);
    $stmt->execute();
    $list = null;
    while($re = $stmt->fetch(PDO::FETCH_ASSOC)){
        $list .= "<p>$re[date]　　$re[hours]時間</p>";
    }
}catch(PDOException $e){
    echo 'Connection failed: ' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>show_data.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
<style>
    #range{
        width:500px;
        height:50px;
    }
</style>
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen mgn_btm"><?= $skill_title?></h1>
        <div id="show_log" class="center mgn_btm">
            <?=$list?>
        </div>
        <button onclick="location.href='main.php'" class="center btn back_btn">Back</button>
    </div><!--wrapper-->
<script>
    $(function(){
       
    })
</script>
</body>
</html>