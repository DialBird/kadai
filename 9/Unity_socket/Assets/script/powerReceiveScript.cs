using UnityEngine;
using System.Collections;
using SocketIO;

public class powerReceiveScript : MonoBehaviour {
    
    private SocketIOComponent socket;

    public void Start () {
        GameObject go = GameObject.Find("SocketIO");
        socket = go.GetComponent<SocketIOComponent>();
        
        socket.On("open",Opend);
        socket.On("power",PowerReact);
    }
    
    public void Opend(SocketIOEvent e){
        Debug.Log("Opend"); //正常に起動
    }
    
    public void PowerReact( SocketIOEvent e ){
        string val = e.data.GetField("power").str;
        Debug.Log("this is :" + val);
    }
}
