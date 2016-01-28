using UnityEngine;
using System.Collections;
using SocketIO;

public class MoveControlScript : MonoBehaviour {
    
    private SocketIOComponent socket;
    private PlayerController plycon;

    void Start () {
        GameObject go = GameObject.Find("SocketIO");
        socket = go.GetComponent<SocketIOComponent>();
        
        //コントローラーの命令が入ってきたら処理する。（１、idを特定し、オブジェクトを特定　２、特定したオブジェクトのコンポーネントに命令）
        socket.On("move",CheckID);
    }

    void Update () {

    }
    
    void CheckID(SocketIOEvent e){
        //socket情報抽出
        string id = "__"+e.data.GetField("id").str;
        string direction = e.data.GetField("direction").str;
        Debug.Log(id);
        Debug.Log(direction);
        
        //送られてきたIDの対象を特定
        GameObject target = GameObject.Find(id);
        plycon = target.GetComponent<PlayerController>();
        
        //対象のオブジェクトに、特定の方向に動かす命令
        switch(direction){
            case "up":
                plycon.MoveUp();
                break;
            case "left":
                plycon.MoveLeft();
                break;
            case "right":
                plycon.MoveRight();
                break;
            case "down":
                plycon.MoveDown();
                break;
        }
        
    }
}
