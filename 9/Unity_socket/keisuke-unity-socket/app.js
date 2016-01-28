var server = require('http').createServer(handler);
var io = require('socket.io').listen(server);
var fs = require('fs');
var parser = require('ua-parser-js');

var ua;

//io.set('log level',1);  //最新版のsocketIOだとエラーが出る。そもそもなくてもdebugは出ない。

function handler(req,res){
    ua = req.headers['user-agent'];
    
    //uaによって読み込むhtmlを変更する
    if(ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0){
        fs.readFile(__dirname+'/public/index_for_iOS.html','utf8',function(err,data){
            if(err){
                res.writeHead(404,{'Content-Type':'text/plain'});
                res.end('not found');
            }
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data)
            res.end();
        })
    }else{
        fs.readFile(__dirname+'/public/index.html','utf8',function(err,data){
            if(err){
                res.writeHead(404,{'Content-Type':'text/plain'});
                res.end('not found');
            }
            res.writeHead(200,{'Content-Type':'text/html'});
            res.write(data)
            res.end();
        })
    }
    
//    console.log(parser.setUA(ua).getBrowser());       //なぜかsetUAが使えなくなっている
    
}
server.listen(process.env.PORT || 3000);
console.log("now working...");

//socket io
io.sockets.on('connection',function(socket){
    
    //デバイスの種類により、対応を変える
//    socket.on('device_check',function(){
//        if(ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0){
//            socket.emit('device','you are smartphone');
//        }else{
//            socket.emit('device','you aren\'t smartphone');
//        }
//    })
    
    
    //Unityへpowerを送る実験
    socket.on('power',function(data){
        console.log(data);
        io.sockets.emit('power',data);
    })
    
    
    //ログインするたびごとにUnityにオブジェクトを生成する実験。（ページを離れたらオブジェクトが消える）
    socket.on('new_player',function(){           //idはapp.jsでしか取得できないので、ここからデータを詰める
        console.log(socket.id);
        io.sockets.emit('new_player',{id:socket.id});
    })
    
    
    //HTML側のコントローラーからの命令
    socket.on('move',function(data){
        console.log(data);
        io.sockets.emit('move',{      //idと方向を送る
            id : socket.id,
            direction : data
        });
    });
    
    
    //回線が切れたらUnityに命令
    socket.on('disconnect',function(){
        socket.broadcast.emit('player_exit',{id:socket.id});
        console.log('goodby'+ socket.id);
    })
})