using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

/*********
 * gamegr: Game manager class.
 * Maintain relation between objects. (need some cleasing...)
 * *******/


public class gamemgr : MonoBehaviour
{
    private List<stationact>    lstStat;       // list of station
    private List<ObjWorker>     lstWorker;     // list of worker
    private List<int[]>         lstAttach;     // list of attachment
    private gamemove            gameMove;      // position converter

    // status tracker
    private bool                bDumpTrack = false; //dumping area tracker


    ////////////////////////////////////////
    // Start is called before the first frame update
    // Classes initialization isn't necessarily build items from upper list first
    // ObjWorker is earlier than gamemgr
    void Start()
    {
        // Which object initialized first is ambiguous. 
        // put checker at every 1st useage
        if (lstStat == null) lstStat = new List<stationact>();
        if (lstWorker == null) lstWorker = new List<ObjWorker>();
        if (gameMove == null) gameMove = new gamemove();
    }

    ////////////////////////////////////////
    // Station
    // Rigister a new station when start()
    public void RegisterStation(stationact obj)
    {
        if (lstStat == null) lstStat = new List<stationact>();

        lstStat.Add(obj);
        Debug.Log(string.Format("count station {0}", lstStat.Count));
    }

    /////////////
    // Remove a station
    public void RemoveStation(stationact obj)
    {
        lstStat.Remove(obj);
        GameObject.Destroy(obj);
    }

    ////////////////////////////////////////
    // Worker
    // Register a new worker when start()
    public void RegisterWorker(ObjWorker obj)
    {
        if (lstWorker == null ) lstWorker = new List<ObjWorker>();
        lstWorker.Add(obj);
        Debug.Log(string.Format("count worker {0}", lstWorker.Count));
    }

    /////////////
    // Remove a worker
    public void RemoveWorker(ObjWorker obj)
    {
        lstWorker.Remove(obj);
        GameObject.Destroy(obj.wkrTag);
        GameObject.Destroy(obj);
    }

    /////////////
    // Add a Worker (validation check)
    // Command from UI button
    // Check overlap. Items are allowed to overlap, but prevent at generation.
    // Instantiate in ObjWorker class
    public void AddWorker()
    {
        ObjWorker obj = lstWorker[0];
        if (lstWorker.Count > 1)
        {
            ObjWorker objPrev = lstWorker[lstWorker.Count - 1];
            if (objPrev.transform.position.x == obj.transform.position.x
                && objPrev.transform.position.y == obj.transform.position.y)
            {
                Debug.Log("Previous one untouched, skip");
                return;
            }
        }
        obj.CloneWorker();
    }

    ////////////////////////////////////////
    // Move object
    // Initialization
    public Vector3 GetMovePos(Vector3 offset)
    {
        if (gameMove == null ) gameMove = new gamemove();

        return gameMove.getMapPos(offset);
    }

    ////////////////////////////////////////
    // Dumping area
    // Command from UI sensor image
    public void SetDumpTrack(bool set)
    {
        bDumpTrack = set;
    }


    /////////////
    // station check if item released at dumping area
    public bool CheckDump(stationact ob)
    {
        if (!bDumpTrack) return false;

        ob.GetComponent<SpriteRenderer>().enabled = false;
        RemoveStation(ob);
        bDumpTrack = false;
        return true;
    }

    /////////////
    // worker check if item released at dumping area
    public bool CheckDump(ObjWorker ob)
    {
        if (!bDumpTrack) return false;

        ob.GetComponent<SpriteRenderer>().enabled = false;
        //remove from attach list
        checkAttach(ob.id, -1, false);
        RemoveWorker(ob);
        bDumpTrack = false;
        return true;
    }

    ////////////////////////////////////////
    // Relation between station and worker

    // Try to set or release attachment 
    // Query from worker class (or when delete)
    // Relation is set in game manager, but still other details should be dealt 
    // in worker class. 
    public bool checkAttach(int iWorker, int iStation = -1, bool bAttach=true)
    {
        int idx = 0;
        bool bExist = false;
        Debug.Log(string.Format("check attach worker: {0}, stat: {1} ", iWorker, iStation));
        if (lstAttach == null) lstAttach = new List<int[]>();
        foreach(int[] aInt in lstAttach)
        {
            if (aInt[0] == iWorker)
            {
                bExist = true;
                break;
            }
            idx++;
        }

        if (bExist && !bAttach)
        {
            // detach 
            lstAttach.RemoveAt(idx);
            bExist = false;
        } else if ( !bExist && bAttach && iStation > 0)
        {
            int[] aInt = { iWorker, iStation };
            lstAttach.Add(aInt ) ;
            bExist = true;
        } else
        {
            // do nothing, don't change
        }

        if (bExist)
        {
            // stick worker to station
            updateAttachedWorker(lstAttach[idx][1]);
        }

        return bExist;
    }

    /////////////
    // update worker position to follow attached station
    // relation should exist
    // items (work and station) should exist in lists
    public void updateAttachedWorker(int iStation)
    {
        int iWorker = -1;
        bool bSet = false;
        Vector3 v3Station = new Vector3(0, 0, 0);

        if (lstAttach == null) lstAttach = new List<int[]>();
        foreach (int[] aInt in lstAttach)
        {
            if (aInt[1] == iStation)
            {
                iWorker = aInt[0];
                bSet = true;
                break;
            }
        }
        if (!bSet ) return;
        Debug.Log(string.Format("update attach worker: {0}, stat: {1} ", iWorker, iStation));

        bSet = false;
        stationact oStat = getStationById(iStation);
        if (oStat != null )
        {
            v3Station = oStat.transform.position;
            bSet = true;
        }

        if (!bSet) return; //should throw error

        ObjWorker oWkr = getWorkerById(iWorker);
        if ( oWkr != null )
        {
            oWkr.transform.position = new Vector3(v3Station.x, v3Station.y, oWkr.transform.position.z);
        }

    }

    ////////////////////////////////////////
    // Time elapse
    // Fired from UI button
    // update all workers, distinguished by attached status
    public void onOperate()
    {
        bool bAttached = false;
        List<int> lsWkr = new List<int>();
        foreach (int[] aInt in lstAttach) lsWkr.Add(aInt[0]);

        foreach (ObjWorker oWkr in lstWorker)
        {
            if (oWkr.id == 0) continue;
            if (lsWkr.Remove(oWkr.id)) bAttached = true;
            else bAttached = false;
            oWkr.timeInOperation(bAttached);
        }
    }

    ////////////////////////////////////////
    // Tools

    // get worker from list
    private ObjWorker getWorkerById(int wId)
    {
        ObjWorker oRet = null;

        foreach (ObjWorker oWkr in lstWorker)
        {
            if (oWkr.id == wId)
            {
                oRet = oWkr;
                break;
            }
        }
        return oRet;
    }

    /////////////
    // get station from list
    private stationact getStationById(int sId)
    {
        stationact oRet = null;

        foreach (stationact oSta in lstStat)
        {
            if (oSta.id == sId)
            {
                oRet = oSta;
                break;
            }
        }
        return oRet;
    }

}
