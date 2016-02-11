$(function(){
    //------------------------------------------------------
    //グローバル
    //------------------------------------------------------
    //DOM
    var canvas = $('#canvas');
    
    //socketのroomID
    var this_roomID = $('#roomID').val();
    
    //THREE関連
    var renderer,
        width = window.innerWidth,
        height = window.innerHeight,
        scene,
        camera,
        boxes = [],
        box_num,
        now_mode = 'color',   //現在のモード（colir、size、disappear、sound）を取得
        move_switch = 0;
    
    //------------------------------------------------------
    //socket通信
    //------------------------------------------------------
    var socket = io.connect();
    
    socket.emit('check_id',this_roomID);     //QRから取得したroomIDをサーバーへ飛ばす
    
    socket.on('SM_login',function(){
//        alert('join!');
    })
    
    socket.on('boxes_data',function(boxes_data){
        box_num = boxes_data.box_num;       //箱の数を受信
        //Three.js開始
        ThreeStart(boxes_data);
    })
    
    //モードの変更を受信
    socket.on('mode_change',function(data){
         now_mode = data.now_mode;
        $('#data').text(now_mode);
    })
    
    
    //------------------------------------------------------------------------------------------------------------
    //THREE.js開始
    //------------------------------------------------------------------------------------------------------------
    function ThreeStart(boxes_data){
        initThree();
        initEvent();
        initObjects(boxes_data);        //箱情報を渡して描画してもらう
        initLight();
        initCamera();
        render();     //レンダー時にもつかう
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
        
        var intersects;
        
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
                //モード（now_mode）によって動作変更
                    switch(now_mode){
                        case 'color':
                            socket.emit('color_change',{
                                id: this_roomID,
                                name: target.object.name
                            })
                            $('#data').text(target.object.name);
                            break;
                        case 'size':
                            socket.emit('size_change',{
                                id: this_roomID,
                                name: intersects[0].object.name
                            })
                            break;
                        case 'disappear':
                            socket.emit('visible_change',{
                                id: this_roomID,
                                name: intersects[0].object.name
                            })
                            break;
                        case 'sound':
                            break;
                    }
            }
        });
        
        
        //インタラクティブに変化を受け取る
        socket.on('color_change',function(data){
            var target = boxes[data.name];
            target.material.color.set(data.color);
        })
        socket.on('size_change',function(data){
            var target = boxes[data.name];
            scale_change(target);
        })
        socket.on('visible_change',function(data){
            var target = boxes[data.name];
            visible_change(target);
        })
        
        socket.on('create_plane',function(){
            var pG = new THREE.PlaneGeometry(200,200);
            var pM = new THREE.MeshLambertMaterial({
                side : THREE.DoubleSide,
                map : THREE.ImageUtils.loadTexture('../public/img/dialbird.jpg')
            });
            var plane = new THREE.Mesh(pG,pM);
            plane.position.set(0,0,200);
            scene.add(plane);
        })
        
        //------------------------------------------------------
        //ここからアニメーションは作れるか(できていない。多分処理に手間がかかりすぎる)
//        socket.on('boxes_renew',function(data){
//            var bData = data.boxes_data;
//            for(i=0;i < boxes.length;i++){
//                boxes[i].material.color.set(bData.color);
//            }
//        })
        
        //------------------------------------------------------
        
        socket.on('sound',function(){
            //move_switchを変更することで、render関数内でアニメーションを実行させる
            move_switch = 1;
            setTimeout(function(){
                move_switch = 0;
            },50);
        })
    }
    
    //ランダムカラー生成
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '0x';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        color = Number(color);                      //colorである0xXXXXXXは数列にしてあげる必要がある
        return color;
    }
    
    //------------------------------------------------------
    //object追加
    //------------------------------------------------------
    function initObjects(boxes_data){
        
        var size = boxes_data.size;
        var bData = boxes_data.boxes_data;       //送られてきた箱情報
        
        //displayBox.jsに記載
        displayBox_in_SM(bData, size, scene, boxes);        //sceneはreturnしなくてもいい
        
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
        camera.position.set(0,0,0);
        camera.lookAt(new THREE.Vector3(1,0,0));

        control = new THREE.DeviceOrientationControls(camera);
    }
    
    
    //------------------------------------------------------
    //レンダー処理
    //------------------------------------------------------
    function render(){
        requestAnimationFrame(render);
        
        soundRep(move_switch, box_num, boxes);
        
        renderer.render(scene,camera);
        
        control.connect();
        control.update();
    }
})