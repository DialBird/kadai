<?php
//文字列と配列に対してXSS対策
function myHtmlspecialchars($x){
    if(is_array($x)){
        return array_map('myHtmlspecialchars',$x);
    }else{
        return htmlspecialchars($x,ENT_QUOTES);
    }
};
$name = myHtmlspecialchars($_POST["name"]);
$email = myHtmlspecialchars($_POST["email"]);
$sex = myHtmlspecialchars($_POST["sex"]);
if(empty($_POST["hobby"])){
    $hobby = null;
}else{
    $hobby = myHtmlspecialchars($_POST["hobby"]);
}
if(empty($_POST["other"])){
    $other = null;
}else{
    $other = myHtmlspecialchars($_POST["other"]);
}