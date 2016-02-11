//------------------------------------------------------
//PCでboxを描画する(半径を120に決定している)
//------------------------------------------------------

function displayBox_in_PC(boxes, box_num, size, scene, boxes_data){
    
    var bG, bM, posX, posY, posZ, color;
    var deg = 0;
    
    for(i=0;i < box_num;i++){
        //ランダムに色決定
        color = getRandomColor();
        //mesh作成
        bG = new THREE.BoxGeometry(size,size,size);
        bM = new THREE.MeshPhongMaterial({color : color});
        boxes[i] = new THREE.Mesh(bG,bM);
        boxes[i].name = i;
        
        //データをboxes_dataに詰め込む
        push_data(boxes_data, boxes[i].name, color);
        
//        if(0 <= i && i < 20){
//            deg += 18*Math.PI/180;
//            posY = 100;
//            posX = Math.sin(deg)*(20*Math.sqrt(11));
//            posZ = Math.cos(deg)*(20*Math.sqrt(11));
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(20 <= i && i < 40){
//            deg += 18*Math.PI/180;
//            posY = 80;
//            posX = Math.sin(deg)*40*Math.sqrt(5);
//            posZ = Math.cos(deg)*40*Math.sqrt(5);
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(40 <= i && i < 60){
//            deg += 18*Math.PI/180;
//            posY = 60;
//            posX = Math.sin(deg)*60*Math.sqrt(3);
//            posZ = Math.cos(deg)*60*Math.sqrt(3);
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(60 <= i && i < 80){
//            deg += 18*Math.PI/180;
//            posY = 40;
//            posX = Math.sin(deg)*80*Math.sqrt(2);
//            posZ = Math.cos(deg)*80*Math.sqrt(2);
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(80 <= i && i < 100){
//            deg += 18*Math.PI/180;
//            posY = 20;
//            posX = Math.sin(deg)*20*Math.sqrt(35);
//            posZ = Math.cos(deg)*20*Math.sqrt(35);
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(100 <= i && i < 120){
//            deg += 18*Math.PI/180;
//            posY = 0;
//            posX = Math.sin(deg)*120;
//            posZ = Math.cos(deg)*120;
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(120 <= i && i < 140){
//            deg += 18*Math.PI/180;
//            posY = -20;
//            posX = Math.sin(deg)*20*Math.sqrt(35);
//            posZ = Math.cos(deg)*20*Math.sqrt(35);
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(140 <= i && i < 160){
//            deg += 18*Math.PI/180;
//            posY = -40;
//            posX = Math.sin(deg)*80*Math.sqrt(2);
//            posZ = Math.cos(deg)*80*Math.sqrt(2);
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(160 <= i && i < 180){
//            deg += 18*Math.PI/180;
//            posY = -60;
//            posX = Math.sin(deg)*60*Math.sqrt(3);
//            posZ = Math.cos(deg)*60*Math.sqrt(3);
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(180 <= i && i < 200){
//            deg += 18*Math.PI/180;
//            posY = -80;
//            posX = Math.sin(deg)*40*Math.sqrt(5);
//            posZ = Math.cos(deg)*40*Math.sqrt(5);
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
//        if(200 <= i && i < 220){
//            deg += 18*Math.PI/180;
//            posY = -100;
//            posX = Math.sin(deg)*(20*Math.sqrt(11));
//            posZ = Math.cos(deg)*(20*Math.sqrt(11));
//            boxes[i].position.set(posX,posY,posZ);
//            scene.add(boxes[i]);
//        }
        
        //posも固有のboxes[i]のプロパティにする
        if(0 <= i && i < 20){
            deg += 18*Math.PI/180;
            boxes[i].posY = 100;
            boxes[i].posX = Math.sin(deg)*(20*Math.sqrt(11));
            boxes[i].posZ = Math.cos(deg)*(20*Math.sqrt(11));
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(20 <= i && i < 40){
            deg += 18*Math.PI/180;
            boxes[i].posY = 80;
            boxes[i].posX = Math.sin(deg)*40*Math.sqrt(5);
            boxes[i].posZ = Math.cos(deg)*40*Math.sqrt(5);
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(40 <= i && i < 60){
            deg += 18*Math.PI/180;
            boxes[i].posY = 60;
            boxes[i].posX = Math.sin(deg)*60*Math.sqrt(3);
            boxes[i].posZ = Math.cos(deg)*60*Math.sqrt(3);
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(60 <= i && i < 80){
            deg += 18*Math.PI/180;
            boxes[i].posY = 40;
            boxes[i].posX = Math.sin(deg)*80*Math.sqrt(2);
            boxes[i].posZ = Math.cos(deg)*80*Math.sqrt(2);
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(80 <= i && i < 100){
            deg += 18*Math.PI/180;
            boxes[i].posY = 20;
            boxes[i].posX = Math.sin(deg)*20*Math.sqrt(35);
            boxes[i].posZ = Math.cos(deg)*20*Math.sqrt(35);
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(100 <= i && i < 120){
            deg += 18*Math.PI/180;
            boxes[i].posY = 0;
            boxes[i].posX = Math.sin(deg)*120;
            boxes[i].posZ = Math.cos(deg)*120;
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(120 <= i && i < 140){
            deg += 18*Math.PI/180;
            boxes[i].posY = -20;
            boxes[i].posX = Math.sin(deg)*20*Math.sqrt(35);
            boxes[i].posZ = Math.cos(deg)*20*Math.sqrt(35);
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(140 <= i && i < 160){
            deg += 18*Math.PI/180;
            boxes[i].posY = -40;
            boxes[i].posX = Math.sin(deg)*80*Math.sqrt(2);
            boxes[i].posZ = Math.cos(deg)*80*Math.sqrt(2);
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(160 <= i && i < 180){
            deg += 18*Math.PI/180;
            boxes[i].posY = -60;
            boxes[i].posX = Math.sin(deg)*60*Math.sqrt(3);
            boxes[i].posZ = Math.cos(deg)*60*Math.sqrt(3);
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(180 <= i && i < 200){
            deg += 18*Math.PI/180;
            boxes[i].posY = -80;
            boxes[i].posX = Math.sin(deg)*40*Math.sqrt(5);
            boxes[i].posZ = Math.cos(deg)*40*Math.sqrt(5);
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
        if(200 <= i && i < 220){
            deg += 18*Math.PI/180;
            boxes[i].posY = -100;
            boxes[i].posX = Math.sin(deg)*(20*Math.sqrt(11));
            boxes[i].posZ = Math.cos(deg)*(20*Math.sqrt(11));
            boxes[i].position.set(boxes[i].posX,boxes[i].posY,boxes[i].posZ);
            scene.add(boxes[i]);
        }
    }
    
    return boxes_data;
}

//------------------------------------------------------
//smartPhoneでboxを描画する
//------------------------------------------------------
//統一のsizeはすでにいれてある。固有の色と名前をいれて場所に設置する
function displayBox_in_SM(bData, size, scene, boxes){
    
    var bG, bM, posX, posY, posZ, color, name;
    var deg = 0;
    
    for(i=0;i < bData.length;i++){      //lengthとしているが、２２０と決まっている。下の配置の仕方を柔軟な形に変更すればあるいは？
        //名前を継承
        name = bData[i].name;
        //色を継承
        color = bData[i].color;
        //mesh作成
        bG = new THREE.BoxGeometry(size,size,size);
        bM = new THREE.MeshPhongMaterial({color : color});
        boxes[i] = new THREE.Mesh(bG,bM);
        boxes[i].name = name;
        
        if(0 <= i && i < 20){
            deg += 18*Math.PI/180;
            posY = 100;
            posX = Math.sin(deg)*(20*Math.sqrt(11));
            posZ = Math.cos(deg)*(20*Math.sqrt(11));
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(20 <= i && i < 40){
            deg += 18*Math.PI/180;
            posY = 80;
            posX = Math.sin(deg)*40*Math.sqrt(5);
            posZ = Math.cos(deg)*40*Math.sqrt(5);
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(40 <= i && i < 60){
            deg += 18*Math.PI/180;
            posY = 60;
            posX = Math.sin(deg)*60*Math.sqrt(3);
            posZ = Math.cos(deg)*60*Math.sqrt(3);
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(60 <= i && i < 80){
            deg += 18*Math.PI/180;
            posY = 40;
            posX = Math.sin(deg)*80*Math.sqrt(2);
            posZ = Math.cos(deg)*80*Math.sqrt(2);
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(80 <= i && i < 100){
            deg += 18*Math.PI/180;
            posY = 20;
            posX = Math.sin(deg)*20*Math.sqrt(35);
            posZ = Math.cos(deg)*20*Math.sqrt(35);
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(100 <= i && i < 120){
            deg += 18*Math.PI/180;
            posY = 0;
            posX = Math.sin(deg)*120;
            posZ = Math.cos(deg)*120;
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(120 <= i && i < 140){
            deg += 18*Math.PI/180;
            posY = -20;
            posX = Math.sin(deg)*20*Math.sqrt(35);
            posZ = Math.cos(deg)*20*Math.sqrt(35);
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(140 <= i && i < 160){
            deg += 18*Math.PI/180;
            posY = -40;
            posX = Math.sin(deg)*80*Math.sqrt(2);
            posZ = Math.cos(deg)*80*Math.sqrt(2);
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(160 <= i && i < 180){
            deg += 18*Math.PI/180;
            posY = -60;
            posX = Math.sin(deg)*60*Math.sqrt(3);
            posZ = Math.cos(deg)*60*Math.sqrt(3);
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(180 <= i && i < 200){
            deg += 18*Math.PI/180;
            posY = -80;
            posX = Math.sin(deg)*40*Math.sqrt(5);
            posZ = Math.cos(deg)*40*Math.sqrt(5);
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        if(200 <= i && i < 220){
            deg += 18*Math.PI/180;
            posY = -100;
            posX = Math.sin(deg)*(20*Math.sqrt(11));
            posZ = Math.cos(deg)*(20*Math.sqrt(11));
            boxes[i].position.set(posX,posY,posZ);
            scene.add(boxes[i]);
        }
        
    }
}









//------------------------------------------------------
//ランダムカラー生成
//------------------------------------------------------
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
//データを詰め込む(PC専用）
//------------------------------------------------------
function push_data(boxes_data, name, color){
    boxes_data.push({
        name : name,
        color : color
    });
}

    