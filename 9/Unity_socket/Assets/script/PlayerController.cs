using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {

    void Start () {

    }

    void Update () {
//        float inputX = Input.GetAxis("Horizontal");
//        float inputZ = Input.GetAxis("Vertical");
//        transform.Translate(inputX,0,inputZ);
//        
//        if(Input.GetKeyDown(KeyCode.Space)){
//            GetComponent<Rigidbody>().velocity = new Vector3(0,3,0);
//        }
    }
    public void MoveUp(){
        GetComponent<Rigidbody>().velocity = new Vector3(0,0,10);
    }
    public void MoveLeft(){
        GetComponent<Rigidbody>().velocity = new Vector3(-10,0,0);
    }
    public void MoveRight(){
        GetComponent<Rigidbody>().velocity = new Vector3(10,0,0);
    }
    public void MoveDown(){
        GetComponent<Rigidbody>().velocity = new Vector3(0,0,-10);
    }
}
