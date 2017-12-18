<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", function() {
        var div1 = document.createElement("div");
        div1.style.cssText = "clear:both";
        // create TOC list
        var outline = document.createElement("div");
        outline.setAttribute("id", "outline-list");
        outline.style.cssText = "border:solid 1px #ccc; background:#eee; min-width:200px;padding:4px 10px;";
        
        var ele_p = document.createElement("p");
        ele_p.style.cssText = "text-align: left; margin: 0;";
        outline.appendChild(ele_p);
        
        var ele_span = document.createElement("span");
        // ele_span.style.cssText = "float: left;";
        var ele_text=document.createTextNode("TOC");
        ele_span.appendChild(ele_text);
        
        var ele_a = document.createElement("a");
        ele_a.appendChild(document.createTextNode("[+]"));
        ele_a.setAttribute("href", "#");
        ele_a.setAttribute("onclick", "javascript:return openct(this);");
        ele_a.setAttribute("title", "Click to Open TOC");

        ele_span.appendChild(ele_a);
        ele_p.appendChild(ele_span);

        var ele_ol = document.createElement("ol");
        ele_ol.style.cssText = "display:none;margin-left:14px;padding-left:14px;line-height:160%;";
        ele_ol.setAttribute("id", "outline_ol");
        outline.appendChild(ele_ol);
        var div1 = document.createElement("div");
        div1.style.cssText = "clear:both";

        document.body.insertBefore(outline, document.body.childNodes[0]);
        // get all the headlines
        var headers = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
        if (headers.length < 2)
          return;

        // -----
        var old_h = 0, ol_cnt = 0;
        // -----
        
        for (var i = 0; i < headers.length; i++) {
          
          var ele_ols = null;
            // get H* and prepare for the ordered list 
            var header = headers[i];
            //header.setAttribute("id", "t" + i + header.tagName);
            header.setAttribute("id", header.textContent);
            var h = parseInt(header.tagName.substr(1), 10);
            // -----
            if (!old_h){
              old_h = h;
            }
            
            if (h > old_h) {
              ele_ols = document.createElement("ol");
              var ele_Current = ele_ol;
              if(ele_Current && ol_cnt > 0){
                var temp = ol_cnt;
                while(temp > 0){
                  ele_Current = ele_Current.lastChild;
                  temp--;
                }
              }
              ele_Current.lastChild.appendChild(ele_ols);
              ol_cnt++;
            } else if (h < old_h && ol_cnt > 0) {
              if (h == 1) {
                while (ol_cnt > 0) {
                  ol_cnt--;
                }
              } else {
                ele_ols = document.createElement("ol");
                var ele_Current = ele_ol;
                if(ele_Current && ol_cnt > 0){
                  var temp = ol_cnt;
                  while(temp > 1){
                    ele_Current = ele_Current.lastChild;
                    temp--;
                  }
                }
              ele_Current.appendChild(ele_ols);

              ol_cnt--;
            }
            }
            if (h == 1) {
              while (ol_cnt > 0) {
                ol_cnt--;
              }
            }
            old_h = h;
            // -----
            if (ele_ols){
              ele_li = document.createElement("li")
              ele_ols.appendChild(ele_li);
            } else {
              ele_li = document.createElement("li")
              ele_ol.appendChild(ele_li);
            }
            
            var a = document.createElement("a");
            // set href for the TOC item 
            //a.setAttribute("href", "#t" + i + header.tagName);
            a.setAttribute("href", "#" + header.textContent);
            // TOC item text
            a.innerHTML = header.textContent;

            
            ele_li.appendChild(a);
          }
          // -----
          while (ol_cnt > 0) {
            ol_cnt--;
          }
          // -----

        });
        
// 
function openct(e) {
  if (e.innerHTML == '[+]') {
    // createTextNode
    e.setAttribute('title', 'collapse');
    e.innerHTML = '[-]';
    var element = document.getElementById("outline_ol");
    element.style.cssText = "margin-left:14px;padding-left:14px;line-height:160%;";
  } else {
    e.setAttribute('title', 'expand');
    e.innerHTML = '[+]';
    var element = document.getElementById("outline_ol");
    element.style.cssText = "display:none;margin-left:14px;padding-left:14px;line-height:160%;";
  }
  e.blur();
  return false;
}
</script>
