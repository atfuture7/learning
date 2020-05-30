using UnityEngine;


/**************
 * Station 
 * *************/
public class stationact : MonoBehaviour
{
    public  gamemgr gmgr;
    public  int     id = 0;
    private int     idMax;
    private Vector3 origin, offset;
    public  Vector3 Boundary;

    // tracking status
    private bool    bMouseDown = false;

    /////////////
    // Start is called before the first frame update
    void Start()
    {
        idMax = id;
        origin = transform.position;

        if (gmgr == null) Debug.Log("gmgr null");
        gmgr.RegisterStation(this);

        string log = string.Format("station id: {0}, pos:{1}", id, origin.ToString());
        Debug.Log(log);
    }

    /////////////
    // update position and attached worker
    public void FixedUpdate()
    {
        if (bMouseDown)
        {
            transform.position = gmgr.GetMovePos(offset);
            gmgr.updateAttachedWorker(id);
        }
    }

    /////////////
    // mouse track
    public void OnMouseDown()
    {
        if (bMouseDown) return;

        bMouseDown = true;
        Vector3 pos = gmgr.GetMovePos(new Vector3(0, 0, 0));

        offset = new Vector3(transform.position.x - pos.x, transform.position.y - pos.y, transform.position.z);
    }

    /////////////
    // mouse track 
    // decide action when release control
    public void OnMouseUp()
    {
        if (!bMouseDown) return;

        //keep it simple. just return if irrelevant
        bMouseDown = false;

        // only derived can be deleted
        if (id != 0)
            if (gmgr.CheckDump(this)) return;

        if (id != 0) return;

        //if the genuin, make clone. 
        if (transform.position.x > Boundary.x || transform.position.y < Boundary.y)
        {
            stationact newob = Instantiate(this);
            // already registered at Start()
            newob.id = ++idMax;
            newob.transform.position = transform.position;
            newob.origin = transform.position;
        }
        transform.position = origin;

    }



}
