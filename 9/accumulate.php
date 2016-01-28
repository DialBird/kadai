<?php
$skill_title = htmlspecialchars($_POST['skill_title'],ENT_QUOTES,'UTF-8');
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>accumulate.php</title>
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
        <h1 class="text_cen"><?= $skill_title?></h1>
        <div id="time_input_box">
            <form action="accumulate_end.php" method="post">
                <h2 class="text_cen"><span></span>時間貯める。</h2>
                <input type="range" name="hour" max="10" min="0.5" step="0.5" id="range" class="center mgn_btm">
                <h2 class="text_cen mgn_btm" id="msg">メーターを動かしてください</h2>
                <input type="hidden" name="skill_title" value="<?= $skill_title?>">
                <input type="hidden" name="date" value="" id="form_date">
                <input type="submit" id="submit" class="btn center mgn_btm">
            </form>
        </div>
        <button onclick="location.href='main.php'" class="center btn back_btn">Back</button>
    </div><!--wrapper-->
<script>
$(function(){
    //年月日取得し、input,hiddenのdateに詰める
    var date = new Date();
    var y = date.getFullYear();
    var m = ((date.getMonth()+1) < 10)?'0'+(date.getMonth()+1):date.getMonth()+1; //月を必ず2桁にする
    var d = (date.getDate() < 10)?'0'+date.getDate():date.getDate();
    $('#form_date').val(y+'/'+m+'/'+d);
    
    //レンジを動かしてないと送信不可にする
    $('form').on('submit',function() {
        if (!$('span').text()) {
            return false;
        } else {
            return true;
        }
    });
    
    //レンジが変わったときの処理
    $('#range').on('change',function(){
        $('span').text($(this).val());
        //レンジの値に対応してコメント発信
        if($(this).val() < 3){
            $('#msg').text('地道に行こう');
        }else if(3 <= $(this).val() && $(this).val() < 7){
            $('#msg').text('よくやった！');
        }else if(7 <= $(this).val() && $(this).val() < 9){
            $('#msg').text('おお？！');
        }else{
            $('#msg').text('すげええええええええええ！');
        }
    });
})
</script>
</body>
</html>