<?php
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$pdo = new PDO('mysql:dbname=Accumile;host=localhost;charset=utf8;','root','');
$sql = "SELECT * FROM login_datas WHERE name = :name AND email = :email AND pass = :pass";
$stmt = $pdo->prepare($sql);
$stmt->bindValue(':name',$name);
$stmt->bindValue(':email',$email);
$stmt->bindValue(':pass',$password);
$stmt->execute();
$re = $stmt->fetch(PDO::FETCH_ASSOC);
$msg = null;
if($re){
    $msg = 'もう登録されています';
}else{
    $sql = "INSERT INTO login_datas(id,name,email,pass) VALUES(NULL, :name, :email, :pass)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':name',$name);
    $stmt->bindValue(':email',$email);
    $stmt->bindValue(':pass',$password);
    $stmt->execute();
    $msg = '登録しました';
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>signin_end.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen"><?php echo $msg ?></h1>
        <form action="index.php" method="post">
            <input type="submit" class="btn center" value="Back">
        </form>
    </div><!--wrapper-->
</body>
</html>