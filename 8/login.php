<?php

session_start();

if(empty($_POST['email']) || empty($_POST['password'])){ //もし名前、もしくはemail欄が空っぽだったら
    header('Location: index.php?msg=err1'); //ログインページに戻る
    exit;
}else{
    $pdo = new PDO('mysql:dbname=Accumile;host=localhost;charset=utf8','root','');
    $sql = "SELECT * FROM login_datas WHERE email = :email AND pass = :pass";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':email',$_POST['email']);
    $stmt->bindValue(':pass',$_POST['password']);
    $stmt->execute();
    if(!$re = $stmt->fetch(PDO::FETCH_ASSOC)){ //もし登録されていない名前だったら
        header('Location: index.php?msg=err2'); //ログインページに戻る
        exit;
    }else{
        $_SESSION['name'] = $re['name'];
        header("Location: main.php");
        exit;
    }
}
?>