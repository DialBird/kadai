<?php
session_start();


//以下を1/23に追加


if( !isset($_SESSION["name"])){
    echo "LOGIN ERROR";
    exit();
}

//現在のセッションIDを取得
$old_sessionid = session_id();

//新しいセッションIDを発行（前のSESSION IDは無効）
session_regenerate_id();

//新しいセッションIDを取得
$new_sessionid = session_id();

//旧セッションIDと新セッションIDを表示
echo "古いセッション: $old_sessionid<br />";
echo "新しいセッション: $new_sessionid<br />";


//以上を1/23に追加

?>
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>フォーム画面</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
</head>
<body>
    <div id="wrapper">
        <header>
            <h1 class="text_cen fadeInUp" style="margin-bottom:50px;">Welcome <?php echo $_SESSION['name'];?>！</h1>
        </header>
        <div id="mode_box" class="center">
            <button class="mode_btn upleft" onclick="location.href='createtbl.php'" id="new">New</button>
            <button class="mode_btn upright" onclick="location.href='select_tbl.php'" id="accumulate">Accumulate</button>
            <button class="mode_btn downleft" onclick="location.href='show.php'" id="show">Show</button>
            <button class="mode_btn downright" onclick="location.href='remove_tbl.php'" id="remove">Remove</button>
        </div>
        <button onclick="location.href='logout.php'" class="center btn back_btn" id="logout_btn">Logout</button>
    </div><!--wrapper-->
<script>
$(function(){
    $('.mode_btn').on('mouseover',function(){
        var id = $(this).attr('id');
        switch(id){
            case 'new':
                $(this).text('新しく始める');
                break;
            case 'accumulate':
                $(this).text('時間を貯める');
                break;
            case 'show':
                $(this).text('データを見る');
                break;
            case 'remove':
                $(this).text('目標を消す');
                break;
        }
    }).on('mouseleave',function(){
        var id = $(this).attr('id');
        switch(id){
            case 'new':
                $(this).text('New');
                break;
            case 'accumulate':
                $(this).text('Accumulate');
                break;
            case 'show':
                $(this).text('Show');
                break;
            case 'remove':
                $(this).text('Remove');
                break;
        }
    })
})
</script>
</body>
</html>