
  var str = "They are called radio buttons because they look and operate";

  function setRadios(iNum) {
    var arr = str.split(' ');
    var radioArea = document.getElementById('radio_area');
    for (idx = 0; idx< Math.min(arr.length, iNum); idx++ ) {
      var x = document.createElement("INPUT");
      x.setAttribute("type", "radio");
      x.setAttribute("name", "radioInput");
      x.setAttribute("formControlName", "radioInput");
      x.setAttribute("value", idx);
      radioArea.append(x);
      var x = document.createElement("LABEL");
      x.innerHTML = arr[idx] + "<br/>";
      radioArea.append(x);
    };
  }

  function setOptions(iNum) {
    var arr = str.split(' ');
    var obj_select = document.getElementById('s_input');
    for (idx = 0; idx< Math.min(arr.length, iNum); idx++ ) {
      var x = document.createElement("option");
      x.text = arr[idx];
      obj_select.add(x);
    }
  }
