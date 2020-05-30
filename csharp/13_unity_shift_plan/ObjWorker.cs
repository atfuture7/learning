using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

/**************
 * Worker
 * *************/
public class ObjWorker : MonoBehaviour
{
    public  gamemgr gmgr;
    public  int     id = 0;
    private int     idMax;
    private Vector3 origin, offset;
    public  Vector3 Boundary;
    public  Text    wkrTag;

    // tracking status
    private bool bMouseDown = false;
    private List<int> lstTrigger;

    //logic control
    private int iPressure = 0;
    private int iPresUnit = 8;
    private int iDecRate = 6;
    private int iSale = 0;
    private int iSaleUnit = 450;

    
    /////////////
    // Start is called before the first frame update
    void Start()
    {
        idMax = id;
        origin = transform.position;
        if (lstTrigger == null) lstTrigger = new List<int>();

        if (gmgr == null) Debug.Log("gmgr null");
        gmgr.RegisterWorker(this);

        // hide the genuine behind the scene
        if (id == 0)
        {
            transform.position = new Vector3(origin.x, origin.y, 5);
            this.GetComponent<BoxCollider2D>().enabled = false;
            wkrTag.text = "";
        }
        Debug.Log(string.Format("worker id: {0}, pos:{1}", id, origin.ToString()));
    }

    /////////////
    // Update is called once per frame
    public void FixedUpdate()
    {
        if (bMouseDown)
        {
            transform.position = gmgr.GetMovePos(offset);
            wkrTag.transform.position = Camera.main.WorldToScreenPoint(transform.position);
            //Debug.Log(string.Format("count worker {0}, {1}", id, transform.position));
        } 
        
        if  (lstTrigger.Count > 0)
        {
            wkrTag.transform.position = Camera.main.WorldToScreenPoint(transform.position);
        }
    }

    /////////////
    // track mouse
    public void OnMouseDown()
    {
        if (bMouseDown) return;

        bMouseDown = true;
        Vector3 pos = gmgr.GetMovePos(new Vector3(0, 0, 0));

        offset = new Vector3(transform.position.x - pos.x, transform.position.y - pos.y, transform.position.z);
    }

    /////////////
    // track mouse
    // decide action when releasing control 
    public void OnMouseUp()
    {
        if (!bMouseDown) return;

        //keep it simple. just return if irrelevant
        bMouseDown = false;
        if ( gmgr.CheckDump(this)) return;

        if (lstTrigger.Count >0)
        {
            // pick the last one if multiple
            int iSob = lstTrigger[lstTrigger.Count - 1];
            gmgr.checkAttach(id, iSob);
            lstTrigger.Clear();
            lstTrigger.Add(iSob);
        }

    }

    /////////////
    // track collision 
    // Unity doesn't activate collision for static items
    // only trigger valid
    public void OnTriggerEnter2D(Collider2D collision)
    {
        //Debug.Log(string.Format("trigger to worker name: {0} ", collision.gameObject.name));
        if (collision.gameObject.name.StartsWith("station"))
        {
            stationact sob = collision.GetComponent<stationact>();
            lstTrigger.Add(sob.id);
        }
    }

    /////////////
    // track collision
    // when leave collision, detach if there is.
    public void OnTriggerExit2D(Collider2D collision)
    {
        Debug.Log(string.Format("trigger exit worker name: {0} ", collision.gameObject.name));
        if (collision.gameObject.name.StartsWith("station"))
        {
            stationact sob = collision.GetComponent<stationact>();
            lstTrigger.Remove(sob.id);
            // detach
            if (lstTrigger.Count <=0 ) gmgr.checkAttach(id, -1, false);
        }
    }

    /////////////
    // clone worker
    // fired from UI button, validated by game manager
    // Text is refered item. Unity will refer to the genuine copy, so also need 
    //     clone it. And set the parent to Canvas to be visible.
    public void CloneWorker()
    {
        // Instantiate
        ObjWorker newob = Instantiate(this);
        newob.wkrTag = Instantiate(this.wkrTag);
        Canvas _canvas = wkrTag.GetComponentInParent<Canvas>() as Canvas;
        newob.wkrTag.transform.SetParent(_canvas.transform, false);

        // already registered at Start()
        // set detail
        newob.id = ++idMax;
        newob.GetComponent<SpriteRenderer>().enabled = true;
        newob.transform.position = origin;
        newob.GetComponent<BoxCollider2D>().enabled = true;
        newob.enabled = true;
        newob.wkrTag.text = string.Format("Id: {0}", newob.id);
        newob.wkrTag.transform.position = Camera.main.WorldToScreenPoint(transform.position);
        Debug.Log(string.Format("clone worker {0}, {1}", newob.id, transform.position));
    }

    /////////////
    // update worker for time elapse
    // Fired by UI button, dispatched by game manager
    public void timeInOperation(bool bAttached)
    {
        int iIncPress, iIncSal;
        
        if ( bAttached )
        {
            iIncPress = iPresUnit;
            iIncSal = iSaleUnit;
        } else
        {
            iIncPress = iPresUnit * iDecRate *-1;
            iIncSal = 0;
        }

        iPressure += iIncPress;
        iSale += iIncSal;

        if (iPressure < 0) iPressure = 0;
        wkrTag.text = string.Format("Id: {0}, Pressure:{1}, Sale:{2}", id, iPressure, iSale);
    }
}
