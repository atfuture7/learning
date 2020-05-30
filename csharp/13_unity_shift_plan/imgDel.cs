using UnityEngine;
using UnityEngine.EventSystems;

/******
 * Image controller
 * Experimental. Want to build a sensor with image. Here is a dumping area.
 * General member: gmgr - game manager
 ******/

public class imgDel : MonoBehaviour, IPointerEnterHandler, IPointerExitHandler
{
    public gamemgr gmgr;

    void IPointerEnterHandler.OnPointerEnter(PointerEventData eventData)
    {
        Debug.Log("mouse enter");
        gmgr.SetDumpTrack(true);
        //throw new NotImplementedException();
    }

    void IPointerExitHandler.OnPointerExit(PointerEventData eventData)
    {
        Debug.Log("mouse exit");
        gmgr.SetDumpTrack(false);
        //throw new NotImplementedException();
    }

}
