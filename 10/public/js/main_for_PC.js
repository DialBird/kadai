$(function(){
    
    $(document).ready(function() {
        $('#mode').selectOrDie();
    });
    
    //------------------------------------------------------
    //グローバル
    //------------------------------------------------------
    //DOM
    var canvas = $('#canvas'),
        mode = $('#mode'),
        now_mode = 'color';
        
    //PCのTHREE関連
    var renderer,
        width = canvas.width(),
        height = canvas.height(),
        scene,
        camera,
        axis,
        boxes = [],     //箱オブジェクトを収納
        box_num = 220,     //箱オブジェクトの数
        size = 10,        //箱オブジェクトのサイズ
        move_switch = 0;//声に連動してブロックを動かす際のスイッチ（０と１がある）
    
    //スマホに送る情報
    var boxes_data = [];     //スマホに送るオブジェクトの位置や色情報のデータ
    
    
    
    //------------------------------------------------------
    //socket通信
    //------------------------------------------------------
    var socket = io.connect();
    
    var this_roomID = '';        //roomID初期化
    
    var isConnected = false;        //スマホがつながっているかのスイッチ
    
    
    //QRコードを作成
    socket.on('give_id',function(roomID){
        $('#qrcode').qrcode('https://keisuke-interactive-threejs.herokuapp.com/smartphone/'+roomID);        //アクセス先のURLを指定
//        $('#qrcode').qrcode('http://172.17.11.55:3000/smartphone/'+roomID);        //アクセス先のURLを指定
        this_roomID = roomID;
    })
    
    
    //スマホがroomにログインしてきたらQRコードを外し、スマホ側にboxの位置情報を送信する許可を出す。
    socket.on('SM_login',function(){
        $('#qrcode_zone').remove();
        
        isConnected = true;
        
        socket.emit('boxes_data',{
            id : this_roomID,
            size : size,
            box_num: box_num,
            boxes_data : boxes_data
        });         //位置情報の変化も含みスマホへ送信
    })
    
    socket.on('boxes_data',function(data){
        console.dir(data);
    })
    
    
    //------------------------------------------------------------------------------------------------------------
    //THREE.js開始
    //------------------------------------------------------------------------------------------------------------
    window.addEventListener('load',function(){
        ThreeStart();
    })
    function ThreeStart(){
        initThree();
        initEvent();
        initObjects();
        initLight();
        initCamera();
        render();
    }
    
    //------------------------------------------------------
    //three初期化
    //------------------------------------------------------
    function initThree(){
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(width,height);
        renderer.setClearColor(0xfcfcfc,1);
        canvas.append(renderer.domElement);
        
        scene = new THREE.Scene();
    }
    
    //------------------------------------------------------
    //event追加
    //------------------------------------------------------
    function initEvent(){
        
        var intersects;         //Rayにぶつかったオブジェクトが入っている。
        
        //モードが変わったらmodeに代入
        mode.on('change',function(){
            now_mode = mode.val();
            socket.emit('mode_change',{
                id: this_roomID,
                now_mode: now_mode
            })
        })
        
        canvas.on('mousedown',function(e){
            e.preventDefault();
            var mx = (e.offsetX / width)*2 - 1;
            var my = -(e.offsetY / height)*2 + 1;
            var vector = new THREE.Vector3(mx,my,0.5);
            vector.unproject(camera);
            var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            
            intersects = ray.intersectObjects(boxes);
            if(intersects.length > 0){
                var target = intersects[0];
                console.log(target.object.name);
                
                //モードによって反応を変える
                if(now_mode == 'color'){            //colorの場合
                    //PCのキューブの色を適当に変え、その情報をsocketで共有
                    socket.emit('color_change',{
                        id: this_roomID,
                        name: target.object.name
                    });
                }else if(now_mode == 'size'){       //sizeの場合
                    socket.emit('size_change',{
                        id: this_roomID,
                        name: target.object.name
                    })
                }else if(now_mode == 'disappear'){       //disappear
//                    visible_change(target, this_roomID, socket);
                    socket.emit('visible_change',{
                        id: this_roomID,
                        name: target.object.name
                    })
                }else if(now_mode == 'sound'){
                    //音を鳴らすすと、ブロックの塊が伸縮する
                }
            }
        }).on('mouseover',function(){
            control.enabled = true;
        }).on('mouseout',function(){
            control.enabled = false;
        });
        
        socket.on('color_change',function(data){
            boxes[data.name].material.color.set(data.color);
        })
        
        socket.on('size_change',function(data){
            var target = boxes[data.name];
            scale_change(target);
        })
        
        socket.on('visible_change',function(data){
            var target = boxes[data.name];
            visible_change(target);
        })
        
        socket.on('sound',function(){
            //move_switchを変更することで、render関数内でアニメーションを実行させる
            move_switch = 1;
            setTimeout(function(){
                move_switch = 0;
            },50);
        })
        
        //------------------------------------------------------
        //テストゾーン
        //------------------------------------------------------
        
        //テストボタンを押すと、オブジェクトが一旦全部消えて、また現れるテスト
//        $('#test').on('click',function(){
//            for(i=0;i < box_num;i++){
//                boxes[i].visible = false;
//                setTimeout(function(){
//                    for(i=0;i < box_num;i++){
//                        boxes[i].visible = true;
//                    }
//                },1000);
//            }
//        })
        
        
        
        
        //------------------------------------------------------
        //画像を読み込んで、オブジェクトに貼る
        //------------------------------------------------------
        var getImage = $('#getImage'),
            stocks = $('#stocks');
        
        getImage.on('change',action);
        
        function action(){
            var data = getImage.prop('files');
            var reader = new FileReader();
            reader.readAsDataURL(data[0]);
            
            reader.onload = function(){
                $("<img src=" + reader.result + " height='50' class='stock'>").appendTo(stocks)
                    .on('click',function(){
                    $('.stock').removeClass('selected');
                    $(this).addClass('selected');
                })
            }
        }
        
        
        //読み込んだ画像を貼ったテクスチャオブジェクトを出す。(うまくいかず)
//        $('#set_texture').on('click',function(){
//            //選択中の画像のsrcを取得
//            var nowImage = $('.selected').attr('src');
//            console.log(nowImage);
////            var pG = new THREE.PlaneGeometry(200,200);
////            var pM = new THREE.MeshLambertMaterial({
////                color : 0xff0000,
////                side : THREE.DoubleSide,
////                map : THREE.ImageUtils.loadTexture($('.selected').attr('src'))
////            });
////            var plane = new THREE.Mesh(pG,pM);
////            plane.position.set(0,0,300);
////            scene.add(plane);
//        })
        
        //アップロードした画像は、一度サーバーに保存しないと使えないのだろう........代わりにすでに入れてある画像を使ってデモ的な感じで
        $('#set_texture').on('click',function(){
            var pG = new THREE.PlaneGeometry(200,200);
            var pM = new THREE.MeshLambertMaterial({
                side : THREE.DoubleSide,
                map : THREE.ImageUtils.loadTexture('../public/img/dialbird.jpg')
            });
            var plane = new THREE.Mesh(pG,pM);
            plane.position.set(0,0,200);
            scene.add(plane);
            socket.emit('create_plane',{
                id: this_roomID
            });
            
        });
    }
    
    
    //------------------------------------------------------
    //object追加
    //------------------------------------------------------
    function initObjects(){
        //axisHelper
        axis = new THREE.AxisHelper(1000);
        axis.position.set(0,0,0);
        scene.add(axis);
        
        //ボックスを作成して並べ、boxes_dataに色と名前情報を詰める(別のdisplayBox.jsに関数が入っている)
        boxes_data = displayBox_in_PC(boxes, box_num, size, scene, boxes_data);
        
//        //画像を貼る用の球体オブジェクト（一旦保留）
//        var sG = new THREE.SphereGeometry(200,50,50);
//        var sM = new THREE.MeshPhongMaterial({color:0xff5959,side:THREE.DoubleSide});
//        var sphere = new THREE.Mesh(sG,sM);
//        sphere.position.set(0,0,0);
//        scene.add(sphere);
    }
    
    //------------------------------------------------------
    //ライト
    //------------------------------------------------------
    function initLight(){
        var light = new THREE.DirectionalLight(0xffffff,1);
        light.position.set(0,100,0);
        scene.add(light);
        var amb = new THREE.AmbientLight(0xa5a5a5,1);
        scene.add(amb);
    }
    
    
    
    //------------------------------------------------------
    //カメラ、コントローラ
    //------------------------------------------------------
    var control;
    function initCamera(){
        camera = new THREE.PerspectiveCamera(45,width/height,1,1000);
        camera.position.set(300,400,300);
        camera.lookAt(axis.position);

        control = new THREE.OrbitControls(camera);
        control.enabled = false;        //canvas内に入ったらtrue
    }
    
    
    //------------------------------------------------------
    //レンダー処理
    //------------------------------------------------------
    function render(){
        requestAnimationFrame(render);
        
        //box_effect.js内に記載
        soundRep(move_switch, box_num, boxes);
        
        renderer.render(scene,camera);
        control.update();
    }
    
})