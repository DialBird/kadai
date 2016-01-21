<?php
setcookie('test','wooo',0,'/','');
if(isset($_COOKIE['test'])){
    echo $_COOKIE['test'].'<br>';
}else{
    echo 'naiyo'.'<br>';
}
echo $_SERVER['HTTP_HOST'].$_SERVER["REQUEST_URI"];

?>

<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>practice_session</title>
<script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
</head>
<body>
    <form action="nini.php" method="post">
        <input type="text" name="test">
        <input type="submit">
    </form>
<script>
$(function(){
    
})
</script>
</body>
</html>