<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>cleatetbl.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen fadeInUp">新しい目標を作りましょう</h1>
        <form action="createtbl_end.php" method="post">
            <input type="text" name="skill_title" placeholder="New Dream" class="center mgn_btm" required>
            <input type="submit" class="btn center mgn_btm" value="create">
        </form>
        <button onclick="location.href='main.php'" class="center btn back_btn">Back</button>
    </div><!--wrapper-->
</body>
</html>