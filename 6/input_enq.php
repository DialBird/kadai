<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>アンケート入力ページ</title>
<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
<link rel="stylesheet" type="text/css" href="css/index.css">
    <style>
        #checkboxs{
            margin-left: 120px;
            text-align: left;
        }
        textarea{
            display:none;
        }
    </style>
</head>
    
<body>
    <div id="wrapper">
        <h1>アンケート</h1>
        <form action="confirm_enq.php" method="post">
            <dl>
                <dt>名前：</dt><dd><input type="text" name="name" required></dd>
                <dt>Email：</dt><dd><input type="text" name="email" required></dd>
                <dt>性別：</dt>
                <dd>
                    <input type="radio" name="sex" value="男性" id="man" required><label for="man">男性</label>
                    <input type="radio" name="sex" value="女性" id="woman"><label for="woman">女性</label>
                    <input type="radio" name="sex" value="どちらでもない" id="none"><label for="none">どちらでもない</label>
                </dd>
                <dt style="width:200px;margin-left: -100px;">趣味（複数選択可）：</dt>
                <dd>
                    <div id="checkboxs">
                        <input type="checkbox" name="hobby[]" value="スポーツ" id="sport"><label for="sport">スポーツ</label><br>
                        <input type="checkbox" name="hobby[]" value="勉強" id="study"><label for="study">勉強</label><br>
                        <input type="checkbox" name="hobby[]" value="読書" id="read"><label for="read">読書</label><br>
                        <input type="checkbox" name="hobby[]" value="散歩" id="walk"><label for="walk">散歩</label><br>
                        <input type="checkbox" name="hobby[]" value="昼寝" id="sleep"><label for="sleep">昼寝</label><br>
                        <input type="checkbox" value="その他" id="other">その他の趣味</label>
                        <textarea cols="30" rows="4" name="other"></textarea>
                    </div>
                </dd>
            </dl>
            <input id="btn" type="submit" value="送信">
        </form>
    </div><!--wrapper-->
    <script src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script>
        $(function(){
            //イベント設定　その他を押すとtextarea
            $('#other').on('click',textappear);
            
            //関数
            function textappear(){
                if(!$('#other').hasClass('selected')){
                    $('#other').addClass('selected');
                }else{
                    $('#other').removeClass('selected');
                }
                if($('#other').hasClass('selected')){
                    $('textarea').show();
                }else{
                    $('textarea').hide();
                }
            };
        });
    </script>
</body>
</html>