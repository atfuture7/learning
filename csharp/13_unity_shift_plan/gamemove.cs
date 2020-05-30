using UnityEngine;

/*****
 * Screen - Map position converter. 
 ******/

public class gamemove
{
    // Start is called before the first frame update
    public Vector3 getMapPos(Vector3 offset)
    {
        Vector3 posMap = Input.mousePosition;
        posMap = Camera.main.ScreenToWorldPoint(posMap);
        posMap.z = 0;
        posMap += offset;
        //string log = string.Format("pos:{0}", posMap.ToString());
        //Debug.Log(log);

        return posMap;
    }
}
