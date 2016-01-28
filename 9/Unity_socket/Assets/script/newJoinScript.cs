using UnityEngine;
using System.Collections;
using SocketIO;

public class newJoinScript : MonoBehaviour {
    
    private SocketIOComponent socket;
    
    //プレイヤーの元となるオブジェクトを取り込む
    public GameObject player;
    
    //入ってきたプレーヤーidを詰め込む配列
    private string[] players = new string[10];      //最大参加人数は10人

    public void Start () {
        GameObject go = GameObject.Find("SocketIO");
        socket = go.GetComponent<SocketIOComponent>();
        
        //新しくログインしてきたら、CreateNewを起動
        socket.On("new_player",CreateNewPlayer);
        
        //誰かがページを離れたら、オブジェクトが消える。
        socket.On("player_exit",RemovePlayer);
    }

    public void CreateNewPlayer(SocketIOEvent e){
        //idを受け取る
        string id = "__"+e.data.GetField("id").str;     //基本最初は/から始まるので、そのままnameにしてしまうと、Findするときに子要素と勘違いされるため、エスケープ
        Debug.Log(id);
//        id.Replace("/","");      //なぜか聞かない
        
        for(int i=0;i < players.Length;i++){        //Lengthは大文字から始める
            
            //まだスペースがあれば作る
            if(players[i] == null){
                //失敗
//                players[i] = new JSONObject{
//                    "id":id,
//                    "obj":new_player
//                };
//                stri obj = new JSONObject(JSONObject.Type.OBJECT);
//                obj.AddField("id",id);
//                obj.AddField("player",new_player);
                
                //成功　結局idだけわかればあとはオブジェクトが判別できると判断したから
                players[i] = id;
                break;
            }
            
            //満タンの場合は作らない(return文の活用)
            if(i == (players.Length - 1)){
                Debug.Log("The place is Full!");
                return;
            }
        }
//        foreach(string str in players){     //あるものすべてに対して
//            Debug.Log(str);
//        };
        
        //出現位置を指定
        Vector3 pos = new Vector3(0,0,0);
        //プレイヤーオブジェクトを生成
        GameObject new_player = Instantiate(player,pos,transform.rotation) as GameObject;   //最後のasは必要不可欠
        new_player.name = id;
        
        
    }
    public void RemovePlayer(SocketIOEvent e){
        string id = "__"+e.data.GetField("id").str;
//        Debug.Log("goodby "+id);
        GameObject obj = GameObject.Find(id);
        Destroy(obj);
    }
}
