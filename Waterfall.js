(function(){
    function Waterfall(param){
        this.id = typeof param.container == 'string' ? document.getElementById(param.container) : param.container;
        this.colWidth = param.colWidth;
        this.colCount = param.colCount || 4;
        this.cls = param.cls && param.cls != '' ? param.cls : 'wf-cld';

        this.init();
    }
    Waterfall.prototype = {
        getByClass:function(cls,p){
            // var arr = [],reg = new RegExp("(^|\\s+)" + cls + "(\\s+|$)","g");
            // var nodes = p.getElementsByTagName("*"),len = nodes.length;
            // for(var i = 0; i < len; i++){
            //     if(reg.test(nodes[i].className)){
            //         arr.push(nodes[i]);
            //         reg.lastIndex = 0;
            //     }
            // }
            // return arr;
            return document.querySelectorAll("." + cls);
        },
        maxArr:function(arr){
            var len = arr.length,temp = arr[0];
            for(var ii= 1; ii < len; ii++){
                if(temp < arr[ii]){
                    temp = arr[ii];
                }
            }
            return temp;
        },
        getMargin:function(node){
            var dis = 0;
            //在IE下可以用currentStyle，而在火狐下面我们需要用到getComputedStyle
            if(node.currentStyle){
                dis = parseInt(node.currentStyle.marginBottom);
            }else if(document.defaultView){
                dis = parseInt(document.defaultView.getComputedStyle(node,null).marginBottom);
            }
            return dis;
        },

        getMinCol:function(arr){
            var ca = arr,cl = ca.length,temp = ca[0],minc = 0;
            for(var i = 0; i < cl; i++){
                if(temp > ca[i]){
                    temp = ca[i];
                    minc = i;
                }
            }
            return minc;
        },
        init:function(){
            var _this = this;
            var col = [];//列高
            // var iArr = [];//索引
            var nodes = _this.getByClass(_this.cls,_this.id),len = nodes.length;

            for(var i = 0; i < _this.colCount; i++){
                col[i] = 0;
            }

            for(var i = 0; i < len; i++) {
                nodes[i].h = nodes[i].offsetHeight + _this.getMargin(nodes[i]);
                // iArr[i] = i;
            }

            for(var i = 0; i < len; i++){

                //ming col数组中最小元素的索引
                var ming = _this.getMinCol(col);

                nodes[i].style.left = ming * _this.colWidth + "px";
                nodes[i].style.top = col[ming] + "px";
                col[ming] += nodes[i].h;
            }
            
            _this.id.style.height = _this.maxArr(col) + "px";
        }
    };
    window.Waterfall = Waterfall;
})();