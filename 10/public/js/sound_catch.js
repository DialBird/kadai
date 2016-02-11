var socket = io.connect();

var roomID;     //roomIDをここでも取得

var sound_send_switch = true;  //これがtrueになっていればsoundをsocket送信

var now_mode;

$('#mode').on('change',function(){
    now_mode = $('#mode').val();
    console.log(now_mode);
})

//PC側から送られてくるroomIDを受け取る（特定のroomに発信するため）
socket.on('give_id',function(data){
    roomID = data;
})

var input;
var analyzer;

var mic;

function setup(){
    mic = new p5.AudioIn();
    mic.start();
}

function draw(){
    //音量取得
    var vol = mic.getLevel();
    
    if(now_mode == 'sound'){
        if(vol > 0.01){
            if(sound_send_switch){
                sound_send_switch = false;
                socket.emit('sound',{
                    id: roomID
                });
                //連続でsoundを送信するのを防ぐ
                setTimeout(function(){
                    sound_send_switch = true;
                },100)
            }
        }
    }
    
    
}