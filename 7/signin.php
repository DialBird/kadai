<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>signin.php</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
</head>
<body>
    <div id="wrapper">
        <h1 class="text_cen">Sign in</h1>
        <form action="signin_end.php" method="post">
            <input type="text" name="name" placeholder="New Name" class="center mgn_btm" required>
            <input type="text" name="email" placeholder="New Email" class="center mgn_btm" required>
            <input type="text" name="password" placeholder="New Password" class="center mgn_btm" required>
            <input type="submit" class="btn center" value="SEND" style="background:rgba(255, 0, 98, 0.69)">
        </form>
        <button onclick="location.href='index.php'" class="btn center" style="margin-top:50px;">Back</button>
    </div><!--wrapper-->
</body>
</html>