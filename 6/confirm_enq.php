<?php require('catch_form.php'); ?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>確認ページ</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
<style>
    input[type="text"]{
        height:20px;
    }
    #back_btn,#send_btn{
        margin:0 auto;
        display:block;
    }
    #back_btn,#send_btn{
        margin-bottom: 40px;
        width:100px;
    }
    #send_btn{
        margin-bottom: 0px;
        width:150px;
    }
</style>
</head>
<body>
    <div id="wrapper">
        <h1>入力した内容</h1>
        <form action="input_finish.php" method="post">
            <dl>
                <dt>名前：</dt><dd><?php echo $name ?></dd>
                <dt>Email：</dt><dd><?php echo $email ?></dd>
                <dt>性別：</dt><dd><?php echo $sex ?></dd>
                <dt>趣味：</dt>
                <dd>
                    <?php
                    if(!isset($hobby)){
                        echo 'なし';
                    }else{
                        $num = count($hobby);
                        for($i = 0;$i < $num;$i++){
                            if($i < ($num - 1)){
                                echo $hobby[$i].",";
                            }else{
                                echo $hobby[$i];
                            }
                        }
                    }
                    ?>
                </dd>
                <?php
                if(isset($other)){
                    echo '<dt style="margin-left:-50px;width:150px;">その他の趣味：</dt>';
                    echo '<dd>'.$other.'</dd>';
                }
                ?>
            </dl>
        </form>
        <form action="input_enq.php" method="post">
            <input type="submit" value="戻る" id="back_btn">
        </form>
        <form action="input_finish.php" method="post">
            <input type="hidden" name="name" value="<?php echo $name ?>">
            <input type="hidden" name="email" value="<?php echo $email ?>">
            <input type="hidden" name="sex" value="<?php echo $sex ?>">
            <input type="hidden" name="hobby"
                   value="<?php
                            if(isset($hobby)){
                                echo implode(',',$hobby);
                            }else{
                                echo '';
                            }
                            ?>">
            <input type="hidden" name="other"
                   value="<?php
                          if(isset($other)){
                              echo $other;
                          }else{
                              echo '';
                          }
                          ?>">
            <input type="submit" id="send_btn" value="この内容で送信する">
        </form>
    </div><!--wrapper-->
</body>
</html>