var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io').listen(server),
    ejs = require('ejs');

app.set('views',__dirname+'/views');
app.set('view engine','ejs')

app.use('/public',express.static(__dirname+'/public'));


//スマホでは断られる。PCで入れる
app.get('/',function(req,res){
    var ua = req.headers['user-agent'];
    if(ua.indexOf('iPhone') < 1){       //スマホではない時
        res.render('index_for_PC');
    }else{                              //そうでない（スマホ）の場合
        res.send('you are not PC');
    }
})

app.get('/smartphone/:roomID?',function(req,res){
    var ua = req.headers['user-agent'];
    var roomID = req.params.roomID;
    
    if(roomID){
            res.render('index_for_SM',{
                roomID : roomID
            });
//        }
    }else{
        res.send('who are you?');
    }
    
})

var PORT = process.env.PORT || 3000;
server.listen(PORT);
console.log('now');

io.on('connection',function(socket){
    var ua = socket.handshake.headers['user-agent'];
    
    function roomIDMaker(){     //ランダムにroomIDを作成する
        var id = '';
        var letters = ['a','b','c','d'];
        for(i=0;i < letters.length;i++){
            id += letters[Math.floor(Math.random()*letters.length)];    //アルファベットを適当に配列
        }
        id += Math.ceil(Math.random()*1024);            //1から1024までの数字を適当に追加
        
        return id;
    }
    
    if(ua.indexOf('iPhone') < 1){      //もしスマホでなければ
        var roomID = roomIDMaker();
        console.log(roomID);
        socket.emit('give_id',roomID);
        socket.join(roomID);
    }
    
    //スマホ側からroomに入る申請
    socket.on('check_id',function(roomID){
        socket.join(roomID);        //特定のroomに入れる
        io.sockets.in(roomID).emit('SM_login');
    })
    
    //上の通信で、スマホが部屋に入ってきたら、PCからスマホにboxの位置情報を渡す
    socket.on('boxes_data',function(data){
        io.sockets.in(data.id).emit('boxes_data',data);
    })
    
//    //再描画用にPCからスマホに向けて飛ばし続ける(重すぎるため中止)
//    socket.on('boxes_renew',function(data){
//        io.sockets.in(data.id).emit('boxes_renew',data);    //発信している
//    })
    
    //モード変更をスマホへ通達
    socket.on('mode_change',function(data){
        console.log(data.now_mode);
        io.sockets.in(data.id).emit('mode_change',data)
    })
    
//    //色をインタラクティブに変えるため、PCからスマホに番号と色を送信
//    socket.on('color_change',function(data){
//        io.sockets.in(data.id).emit('color_change',data);
//    })
    socket.on('color_change',function(data){
        var color = getRandomColor();
        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '0x';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            color = Number(color);                      //colorである0xXXXXXXは数列にしてあげる必要がある
            return color;
        }
        io.sockets.in(data.id).emit('color_change',{
            color: color,
            name: data.name
        });
    })
    
    //サイズをインタラクティブに変えるため、PCからスマホに番号とサイズを送信
    socket.on('size_change',function(data){
        console.log('size');
        io.sockets.in(data.id).emit('size_change',data);
    })
    
    //消えるのをインタラクティブに変えるため、PCからスマホに番号とサイズを送信
    socket.on('visible_change',function(data){
        io.sockets.in(data.id).emit('visible_change',data);
    })
    
    //画像を貼ったプレーンを作ったら信号をスマホへ発信
    socket.on('create_plane',function(data){
        io.sockets.in(data.id).emit('create_plane');
    })
    
    
    //音に反応して、PC側からsocket発信
    socket.on('sound',function(data){
        console.log('sound');
        io.sockets.in(data.id).emit('sound');
    })
    
    
})