<?php
session_start();
//DB接続、tableを引っ張ってくる
try{
    $pdo = new PDO("mysql:dbname=Accumile;host=localhost;charset=utf8;",'root','');
    $sql = "SELECT * FROM skill_titles";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $list=null;
    while($tag = $stmt->fetch(PDO::FETCH_ASSOC)){
        $sql = "SELECT SUM(hours) as hours FROM skill_data WHERE skill_title = :skill_title";
        $stmt2 = $pdo->prepare($sql);
        $stmt2->bindValue(':skill_title',$tag['skill_title']);
        $stmt2->execute();
        if($now_total = $stmt2->fetch(PDO::FETCH_ASSOC)){
            if(!$now_total['hours']) $now_total['hours'] = 0;
            $list .= "<div class='skillbox center btn' onclick='javascript:this.parentNode.submit()'><span class='msg'>ひよっ子</span><span class='skillboxname text_cen'>".$tag['skill_title']."</span><span class='skillboxtext text_cen'>Total ".$now_total['hours']."</span></div>";
        }
    }
}catch(PDOException $e){
    echo 'Connection failed: ' . $e->getMessage();
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>show.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen mgn_btm"><?php echo $_SESSION['name']?>さんの現在のスキル</h1>
        <div id="skillbox_zone" class="center">
            <form action="show_data.php" method="post">
                <input type="hidden" name="skill_title" value="" id="chosen_skill">
                <?=$list?>
            </form>
        </div>
        <button onclick="location.href='main.php'" class="center btn back_btn">Back</button>
    </div><!--wrapper-->
<script>
$(function(){
    //スキルのボタンを押せば、そのスキルのタイトルをformできるようにする。
    $('.skillbox').on('mouseover',function(){
        $('#chosen_skill').val($(this).children('.skillboxname').text()); //inputのvalue値を変更するにはattrよりもvalueがいいらしい。
    });
    
    $('.skillboxtext').each(function(){
        var x = $(this).text().substr(6);
        console.log(x);
        if(x >= 10000){
            $(this).parent().css('background','rgba(255,0,0,.5)');
        }else if(x >= 70){
            $(this).parent().css('background','rgba(255,0,0,.5)');
            $(this).siblings('.msg').text('上級者');
        }else if(x >= 50){
            $(this).parent().css('background','rgba(0,255,0,.5)');
            $(this).siblings('.msg').text('中級者');
        }else if(x >= 5){
            $(this).parent().css('background','rgba(0,0,255,.5)');
            $(this).siblings('.msg').text('入門者');
        }
    })
})
</script>
</body>
</html>