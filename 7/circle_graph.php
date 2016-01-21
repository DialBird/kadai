<?php
//DB接続
$pdo = new PDO('mysql:dbname=keisuke.test;host=localhost;charset=utf8;','root','');

//DB文字コード指定&選んだレコードの数をカウント
$stmt = $pdo->query("SELECT * FROM keisuke_test_table WHERE flag='0'");
$count = $stmt->rowCount();

$stmt2 = $pdo->query('SET NAMES utf8');
$stmt2 = $pdo->query("SELECT * FROM keisuke_test_table WHERE flag='1'");
$count2 = $stmt2->rowCount();

//データ登録SQL作成
//$stmt = $pdo->prepare("SELECT * FROM keisuke_test_table"); //元の全部を出力するSELECT
//$stmt = $pdo->prepare("SELECT * FROM keisuke_test_table WHERE name='敬亮'"); //WHEREを使うときはダブルクォーテーション
$stmt = $pdo->prepare("SELECT * FROM keisuke_test_table WHERE flag='0'");
$flag = $stmt->execute();
$stmt2 = $pdo->prepare("SELECT * FROM keisuke_test_table WHERE flag='1'");
$flag2 = $stmt2->execute();

//データ表示
$view = null;
$view2 = null;
if($flag==false){
    $view = 'error1';
}else{
    while($result = $stmt->fetch(PDO::FETCH_ASSOC)){
        $view .= '<li>'.$result['name'].','.$result['tension'].'</li>';
    }
}
if($flag2==false){
    $view = 'error2';
}else{
    while($result2 = $stmt2->fetch(PDO::FETCH_ASSOC)){
        $view2 .= '<li>'.$result2['name'].','.$result2['tension'].'</li>';
    }
}
?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>フリーアンケート表示</title>
<script type='text/javascript' src='js/flotr2.min.js'></script>
<style>
    #graph{
        width:600px;
        height:400px;
        border:solid 1px;
    }
</style>
</head>
<body>
<header>
      <a href="index.php">データ登録</a>
</header>
<div>
    <ul style="color:red;"><?= $view ?></ul>
    <ul><?= $view2 ?></ul>
</div>
<div id="graph"></div>
</body>
<script>
    var x = <?= $count?>;
    var y = <?= $count2?>;
    
    (function basic_pie(container) {
      var
        d1 = [[0, x]],
        d2 = [[0, y]]
        graph;

      graph = Flotr.draw(container, [
        { data : d1, label : '0の数（' + x + '）' },
        { data : d2, label : '1の数（' + y + '）' }
      ], {
        HtmlText : false,
        grid : {
          verticalLines : false,
          horizontalLines : false
        },
        xaxis : { showLabels : false },
        yaxis : { showLabels : false },
        pie : {
          show : true, 
          explode : 0
        },
        mouse : { track : true },
        legend : {
          position : 'se',
          backgroundColor : '#D2E8FF'
        }
      });
    })(document.getElementById("graph"));
</script>
    
</html>
