<?php require('catch_form.php'); ?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>ありがとうございました！</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
    <?php
    if(empty($hobby)){
        $hobby = 'なし';
    }
    if(empty($other)){
        $other = 'なし';
    }
    //CSVファイルにして書き込み
    $handle = fopen('data/data.csv','a');
    flock($handle,LOCK_EX);
    if(filesize('data/data.csv') === 0){
        $title_array = ['名前','Email','性別','趣味（複数）','その他の趣味'];
        mb_convert_variables('SJIS-win','UTF-8',$title_array);
        fputcsv($handle,$title_array);
    }
    $array = [$name,$email,$sex,$hobby,$other];
    mb_convert_variables('SJIS-win','UTF-8',$array);
    fputcsv($handle,$array);
    flock($handle,LOCK_UN);
    fclose($handle);
    ?>
<body>
    <div id="wrapper">
        <h1>ありがとうございました！</h1>
        <a href='index.php' style="margin-top:40px;text-align:center;display:block">最初に戻る</a>
        <a href='show_enq.php' style="margin-top:40px;text-align:center;display:block">アンケート結果を見る</a>
    </div>
</body>
</html>