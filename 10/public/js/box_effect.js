//------------------------------------------------------
//sizeモードアニメーションを実行+ソケット通信(targetの型が3DオブジェクトとIntersectsの二つあるため注意)
//------------------------------------------------------

function scale_change(target, this_roomID, socket){
    var c = 1;      //最初のスケール

    scale_big(c,target);

    function scale_big(c,target){
        c += 0.1;
        target.scale.set(c,c,c);
        var bTid = setTimeout(function(a,b){
            scale_big(a,b);
        }, 10, c, target);
        if(c >= 2){
            clearTimeout(bTid);
            var sTid = setTimeout(function(a,b){
                scale_small(a,b)
            }, 10, c, target);
            if(c <= 1){
                clearTimeout(sTid);
            }
        }
    }
    function scale_small(c,target){
        c -= 0.1;
        target.scale.set(c,c,c);
        var sTid = setTimeout(function(a,b){
            scale_small(a,b)
        },10, c, target);
        if(c <= 1){
            clearTimeout(sTid);
        }
    }
}


//------------------------------------------------------
//disappearモード
//------------------------------------------------------

function visible_change(target){
    target.visible = false;
    setTimeout(function(){
        target.visible = true;
    },1000);
}


//------------------------------------------------------
//音を受け取ると、ブロック全体が広がって縮まる
//------------------------------------------------------
function soundRep(move_switch, box_num, boxes){
    var pos;            //オブジェクトの位置
    switch(move_switch){
            //スイッチが0であればboxが初期位置に戻る
        case 0:
            for(i=0;i < box_num;i++){
                //個々のboxの位置を求める
                pos = boxes[i].position;
                //もしboxの位置が半径120の球状にあったら、終了
                if(Math.sqrt(Math.pow(pos.x,2)+Math.pow(pos.y,2)+Math.pow(pos.z,2)) <= 120){
                    break;
                }
                //球体の中心に向けて縮小
                var dir = new THREE.Vector3(pos.x*(-1), pos.y*(-1), pos.z*(-1)).normalize();
                pos.set(pos.x + dir.x, pos.y + dir.y, pos.z + dir.z);
            }
            break;
            //スイッチが１であれば、球体の中心から遠ざかるように移動
        case 1:
            var dir;        //オブジェクトが動く向き
            for(i=0;i < box_num;i++){
                pos = boxes[i].position;
                boxes[i].position.set(pos.x+(pos.x)/10,pos.y+(pos.y)/10,pos.z+(pos.z)/10);
            }
            break;
    }
}

