/*
 * @Author: ylq
 * @Date: 2019-03-11 11:15:44
 * @Desc: APP.js
 * @Last Modified by: ylq
 * @Last Modified time: 2019-03-15 14:25:18
 */
var vm = new Vue({
  el: '#app',
  data: {
    a: '123',
    sidebarList: [{
      type: 'btn',
      name: '按钮',
      claName: 'el-button el-button--primary'
    }, {
      type: 'img',
      name: '文本',
    }, {
      type: 'imgText',
      name: '文本+图片',
    }, {
      type: 'row',
      name: '框框',
      children: [],
    }],
    melIndex: -1,
    mel: document.getElementById('mainFrame'),
    melEv: undefined,
    sidebar: {
      drag: false,
      placeholder: false,
    },
    subItem:{
      drag:false,
    },
    row: () => {
      return {
        type: 'row',
        name: '框框',
        children: [],
      }
    },
    main: [],
  },
  created: function () {
    // `this` 指向 vm 实例
    console.log('a is: ' + this.a)
  },
  mounted: function () {

  },
  computed: {},
  methods: {
    // 获取目标target
    getCurTar(target, cla) {
      console.log(174, target)
      if (target.className.indexOf(cla) > -1) {
        console.log(176, target)
        return target
      } else {
        let parTarget = target.parentNode;
        console.log(179, parTarget)
        return this.getCurTar(parTarget, cla);
      }
    },
    sideItemMouseDown(item, e) {
      const ev = e || event;
      let itObj = Object.assign({}, item)
      this.mel = ''
      this.melIndex = -1
      this.melEv = undefined
      this.sidebar.drag = true;
      
      var inTarget = document.getElementById('mainFrame');
      var itOL = inTarget.offsetLeft;
      var itOT = inTarget.offsetTop;
      var itW = inTarget.clientWidth
      var itH = inTarget.clientHeight

      var curObj = ev.target || ev.srcElement;
      var ol = curObj.offsetLeft,
        ot = curObj.offsetTop;
      curObj.onselectstart = () => false;
      var disX = ev.clientX - ol;
      var disY = ev.clientY - ot;
      var template = document.getElementById('dragTemplate')
      template.innerHTML = curObj.innerHTML
      // template.style.width = curObj.clientWidth + 'px'
      // template.style.height = curObj.clientHeight + 'px'
      document.onmousemove = (ev) => {
        this.sideItemMouseMove(ev, { template, itOL, itOT, itW, itH, disX, disY })
      }
      document.onmouseup = ev => {
        this.sideItemMouseUp(ev,{ template, itOL, itOT, itW, itH, disX, disY, itObj })
      }
      if(e.stopPropagation) e.stopPropagation();
      if(e.preventDefault) e.preventDefault();
      e.cancelBubble=true;
      e.returnValue=false;
      return false;
    },
    // sideItemMouseMove
    sideItemMouseMove(ev, o){
      let { template, itOL, itOT, itW, itH, disX, disY } = o
      let sl = ev.clientX - disX;
      let st = ev.clientY - disY;
      template.style.left = sl + 'px';
      template.style.top = st + 'px';
      if (!(sl < itOL || sl > (itOL + itW) || st < itOT || st > (itOT + itH))) {
        // console.log(61,ev)
        this.sidebar.placeholder = true
      } else {
        this.sidebar.placeholder = false
      }
    },
    // sideItemMouseUp
    sideItemMouseUp(ev, o) {
      let { template, itOL, itOT, itW, itH, disX, disY, itObj } = o
      template.style = undefined;
      template.innerHTML = ''
      this.sidebar.placeholder = false
      document.onmousemove = document.onmouseup = null;
      let sl = ev.clientX - disX;
      let st = ev.clientY - disY;
      // mainFrame 以下简称 mf
      //  【left< mf的left】【left>mf+mf宽度】【top < mf的top】【top >mf+mf高度】 通过这个判断可以确定是在内容区域
      if (!(sl < itOL || sl > (itOL + itW) || st < itOT || st > (itOT + itH))) {
        // className
        let cn = this.mel.className
        let melEv = this.melEv
        // 框框
        let row = this.row()
        if (itObj.type !== 'row') {
          itObj.sty = {}
          if (melEv) {
            console.log(ev)
            console.log(melEv)
            let l = melEv.l + (ev.clientX - melEv.clientX)
            let t = melEv.t + (ev.clientY - melEv.clientY)
            if (l < 0) {
              l = 0
            }
            if (t < 0) {
              t = 0
            }
            itObj.sty = { l: l ? l + 'px' : 0, t: t ? t + 'px' : 0 }
          }
          console.log(110, itObj.sty)
          row.children.push(itObj)
        }
        // 数据
        let m = this.main
        if (cn) {
          // 插入
          if (cn.indexOf('module-item-bd') > -1 && itObj.type !== 'row') {
            // console.log(1,itObj)
            let children = m[this.melIndex].children || []
            children.push(itObj)
            m[this.melIndex].children = children;
          }
          // 新插入
          if (cn.indexOf('module-placeholder') > -1) {
            // console.log(2,itObj)
            m.splice(this.melIndex, 0, row)
          }
          this.main = m;
        } else {
          // console.log(3,itObj)
          this.main.push(row)
        }

      }
      this.sidebar.drag = false;
      //释放全局捕获 releaseCapture();
      if (template.releaseCapture) {
        template.releaseCapture();
      }
    },

    // 大拖拽 鼠标进入事件
    sortMouseOver(e, index, type) {
      const ev = e || event;
      console.log(111, this.sidebar.drag)
      if (!this.sidebar.drag) {
        return false;
      }
      let curObj = ev.target;
      let curObjSub = ev.target
      let l = ev.offsetX
      let t = ev.offsetY
      console.log(162, curObj)
      if (type == 2) {
        if (!(ev.target.className.indexOf('module-item-bd') > -1)) {
          curObjSub = this.getCurTar(ev.target, 'module-sub-item');
          let sl = curObjSub.style.left || 0;
          let st = curObjSub.style.top || 0;
          // console.log(197, sl, st)
          sl = parseInt(sl)
          st = parseInt(st)
          l = ev.layerX + sl
          t = ev.layerY + st
          // console.log(197, l, t, sl, st)
        }
        curObj = this.getCurTar(ev.target, 'module-item-bd');
      }
      // console.log(162, ev)
      // console.log(162,ev.offsetX,curObj.offsetX)
      // console.log(162,ev.offsetY,curObj.offsetY)
      // console.log(162,ev.clientX,curObj.clientX)
      // console.log(162,ev.clientY,curObj.clientY)
      // console.log(ev.target.className)
      this.melIndex = index;
      this.mel = curObj
      ev.l = l;
      ev.t = t;
      this.melEv = ev
      // console.log(this.melIndex)
      // console.log(this.mel.className)
      return false;
    },


    subMouseDown(e, index, subIndex) {
      const ev = e || event;
      console.log(ev, index, subIndex)
      let target = ev.target || ev.srcElement;
      this.subItem.drag = true;
      this.subItem.i = index;
      this.subItem.si = subIndex;
      let curObj = this.getCurTar(target, 'module-sub-item');
      let ol = curObj.offsetLeft,
        ot = curObj.offsetTop,
        zindex = curObj.style.zIndex;
      let disX = ev.clientX - ol;
      let disY = ev.clientY - ot;

      let parentObj = this.getCurTar(target, 'module-item-bd');
      var itOL = parentObj.offsetLeft;
      var itOT = parentObj.offsetTop;
      var itW = parentObj.clientWidth
      var itH = parentObj.clientHeight
      document.onmousemove = ev => {
        if(this.subItem.drag){
          this.subMouseMove(ev,{itOL, itOT, itW, itH, disX, disY})
        }
      }
      document.onmouseup = ev => {
        this.subMouseUp(ev,{itW, itH, disX, disY, zindex})
      }
      if(e.stopPropagation) e.stopPropagation();
      if(e.preventDefault) e.preventDefault();
      e.cancelBubble=true;
      e.returnValue=false;
      return false;
    },

    subMouseMove(ev,o){
      let target = ev.target || ev.srcElement;
      let { itOL, itOT, itW, itH, disX, disY} = o

      // 获取left 和 top
      let {sl,st} = this.getLeftTop(ev,{itW, itH, disX, disY})

      let m = this.main;
      let mc = m[this.subItem.i].children
      // 如果鼠标是在外面
      if(!(ev.clientX < itOL || ev.clientX > (itOL + itW) || ev.clientY < itOT || ev.clientY > (itOT + itH)) ){
        if(target.className.indexOf('module-item-bd') == -1){
          mc[this.subItem.si].sty = {
            z:9999,
            l:sl + 'px',
            t:st + 'px',
          }
          m[this.subItem.i].children = mc
          this.main = m
        }
      }
    },

    subMouseUp(ev,o){
      console.log(272,ev)
      console.log('---------------------------------------------')
      this.subItem.drag = false;
      document.onmousemove = document.onmouseup = null;
      // agruemnts 
      let { itW, itH, disX, disY, zindex} = o;
      // 获取left 和 top
      let {sl,st} = this.getLeftTop(ev,{itW, itH, disX, disY})

      this.main[this.subItem.i].children[this.subItem.si].sty.l = sl
      this.main[this.subItem.i].children[this.subItem.si].sty.t = st
      this.main[this.subItem.i].children[this.subItem.si].sty.z = zindex
      console.log(this.main)
      //释放全局捕获 releaseCapture();
      if (document.releaseCapture) {
        document.releaseCapture();
      }

    },
    // 获取left 和 top
    getLeftTop(ev,o){
      let { itW, itH, disX, disY} = o;
      let sl = ev.clientX - disX;
      let st = ev.clientY - disY;
      if(sl < 0) sl = 0
      if(st < 0) st = 0;
      if(sl > (itW - 50)) sl = itW - 50 
      if(st > (itH - 50)) st = itH - 50 
      return {sl,st}
    },




  },

})