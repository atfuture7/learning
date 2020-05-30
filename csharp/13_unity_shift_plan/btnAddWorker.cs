using UnityEngine;
using UnityEngine.UI;

/**
 * Button bound actions
 * General member: gmgr - game manager
 */

public class btnAddWorker : MonoBehaviour
{
    public gamemgr gmgr;
    int iNumWorker = 0;


    /////////////
    // Add worker
    // The button is flower no grass. Text is hardly readable neither necessary.
    // class member: iNumWorker was for debug at the beginning. 
    public void clickadd()
    {
        string str = string.Format("btn {0}", ++iNumWorker);
        Text txt = transform.Find("Text").GetComponent<Text>();
        txt.text = str;
        Debug.Log("disappeard button");
        // only gmgr worths stay. 
        gmgr.AddWorker();
    }

    ////////////
    //Time elapse. presumably 15 min
    public void timeElapse()
    {
        Debug.Log("Time Passed by");
        gmgr.onOperate();
    }
}
