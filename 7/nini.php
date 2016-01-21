<?php
if(!empty($_POST['test'])){
    $test = $_POST['test'];
    echo $test;
}else{
    echo 'naiyo';
}
echo $_COOKIE['username'];

?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>practice_session</title>
</head>
<body>
</body>
</html>