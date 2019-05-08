/*
 * @Author: ylq
 * @Date: 2019-04-17 13:21:46
 * @Desc: Drag
 * @Last Modified by: ylq
 * @Last Modified time: 2019-05-08 14:37:36
 */
// (function(window){
// let win = window;

// // 被拖拽的元素 
// let dragStart = (event) => {
//   event = event || window.event;
//   console.log(event)
//   console.log('start开始');
//   //不能使用text或Text，firefox会打开新tab
//   let target = event.target || event.srcElement
//   console.log(target)
//   let tp = target.getAttribute('tp')
//   event.dataTransfer.setData('tp', tp);
// }

// // 被拖拽的元素 拖动中……
// let drag = (event) => {
//   event = event || window.event;
//   console.log(event)
//   console.log('drag拖动中……');
// }

// let dragend = (event) => {
//   event = event || window.event;
//   console.log(event)
//   console.log('end拖动结束');
// }



// // 拖拽目标元素 
// let dragenter = (event) => {
//   event = event || window.event;
//   console.log(event)
//   console.log('dragenter进入目标元素');

// }

// let dragover = (event) => {
//   event.preventDefault();
//   event = event || window.event;
//   console.log(event)
//   console.log('dragover在目标元素上的时候，会一直触发');
// }

// let drop = (event) => {
//   event.preventDefault();
//   event = event || window.event;
//   console.log(event)
//   console.log('drop拖动元素在目标元素内释放时');
//   let tp = event.dataTransfer.getData('tp')
//   console.log('drop', tp)
// }

// let dragleave = (event) => {
//   event = event || window.event;
//   console.log(event)
//   console.log('ondragleave被拖放元素移出目标元素时触发');
// }


var vm = new Vue({
  el: '#app',
  data() {
    return {
      md: [],
      dragStatus: false,
      sortEle:null,
      sortStatus: false,
      subObj:{},
      subStatus: false,
      //sub drag
      itemindex:0,
      itemsubindex:0,
      
      //滚蛋条的事情
      curMouseY:undefined,
      timer: undefined,
    }
  },
  created: function () {

  },
  mounted: function () {
    // let sidebar = document.getElementById('sidebar')
    // sidebar.addEventListener('dragstart', this.dragstart)
    // sidebar.addEventListener('dragend', this.dragend)

    // let main = document.getElementById('main')
    // main.addEventListener('dragenter',this.dragenter)
    // main.addEventListener('dragover', this.dragover)
    // main.addEventListener('drop', this.drop)
    // main.addEventListener('dragleave',this.dragleave)
    // this.onloadItemDrag()
  },
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
    dragstart(event) {
      event = event || window.event;
      console.log('start开始');
      let target = event.target || event.srcElement
      let tp = target.getAttribute('tp')
      let issuper =  target.getAttribute('issuper')
      event.dataTransfer.setData('tp', tp);
      event.dataTransfer.setData('issuper', issuper);
      this.dragStatus = true
    },
    // drag(event) {
    //   event = event || window.event;
    //   console.log(event)
    //   console.log('drag拖动中……');
    // },
    dragend(event) {
      console.log('end拖动结束');
      this.dragStatus = false
      // 清除定时任务
      this.curMouseY = undefined;
      clearInterval(this.timer)
      this.timer = undefined;
    },
    // 拖拽目标元素 进入 
    // dragenter(event) {
    //   event = event || window.event;
    //   console.log(event)
    //   console.log('dragenter进入目标元素');
    // },
    // // 拖拽目标元素 离开
    // dragleave(event) {
    //   event = event || window.event;
    //   console.log(event)
    //   console.log('ondragleave被拖放元素移出目标元素时触发');
    // },

    // 拖拽目标元素 一直在目标元素
    dragover(event) {
      event.preventDefault();
      event.stopPropagation();
      //这下面的事件都是为了滚动而弄得
      let my = event.clientY
      this.curMouseY = my
      this.scrollEvent()
    },
    // 拖拽目标元素 在目标元素内部，放下拖拽的内容
    drop(event,index,sub) {
      event = event || window.event;
      event.preventDefault();
      event.stopPropagation();
      console.log(148,event,index,sub)
      if(this.subStatus && this.checkBrower() == 'FF'){
        console.log(1234567,event)
        this.subEvent = event;
      }
      if(!this.dragStatus) return false
      console.log(150,event,index,sub)
      let target = event.target || event.srcElement
      console.log(999,target)
      console.log('drop拖动元素在目标元素内释放时');
      let tp = event.dataTransfer.getData('tp')
      let isFrame = event.dataTransfer.getData('issuper')
      let o = {tp,isFrame}
      if(sub){
        let ct = this.getCurTar(target,'mitem-bd')
        let mw = document.getElementById('mainWrap');
        let st = parseInt(mw.scrollTop)
        console.log(164,st)
        console.log(event.clientX,ct.offsetLeft)
        console.log(event.clientY,ct.offsetTop)
        let l = event.clientX - ct.offsetLeft
        let t = event.clientY - ct.offsetTop + st
        console.log(166,l,t)
        if(l< 0) l = 0
        if(t< 0) t = 0
        o.l = l
        o.t = t
      }
      // console.log('drop', tp)
      this.insertData(o,index,sub)
      this.dragStatus = false
      // 清除定时任务
      this.curMouseY = undefined;
      clearInterval(this.timer)
      this.timer = undefined;
    },

    insertData(o,index,sub){
      if(!this.dragStatus) return false
      console.log(176,o,index,sub)
      let {tp,isFrame,l,t} = o
      console.log(178,tp,isFrame,index,sub)
      let md = this.md;
      let item = {
        isFrame,
        sd:[]
      }
      // 一级
      if(!sub){
        if(isFrame == 0){
          // let sd = []
          item.sd.push({tp,l,t})
          // item.sd = sd
        }
        md.splice(index, 0, item)
      } else {
        console.log(193,index)
        // 二级
        if(isFrame == 0){
          console.log(196,index)
          let mysd = md[index].sd || []
          mysd.push({tp,l,t})
        }
        // 如果是框架
        if(isFrame == 1){
          md.splice(index, 0, item)
        }
      }
      this.md = md
      console.log(this.md)
    },
    // 中间大的子项目拖拽事件
    // itemSortDragstart(event,index){
    //   console.log(20222222)
    //   event = event || window.event;
    //   this.sortEle = index;
    //   this.sortStatus = true;
    //   event.preventDefault();
    //   // event.stopPropagation();
    // },
    // // 中间大的子项目拖拽事件
    // itemSortDragend(event,index){
    //   console.log(202333333333)
    //   event = event || window.event;
    //   this.sortStatus = false;// 拖放结束还原拖动元素的背景
    //   // event.preventDefault();
    // },
    // itemSortDragenter(event,index){
    //   console.log('itemSortDragenter')
    //   event = event || window.event;
    //   if(!this.sortStatus) return false

    // },
    // itemSortDragover(event){
    //   event.preventDefault()
    //   event.stopPropagation();
    // },
    // itemSortDragleave(event,index){
    //   console.log('itemSortDragleave')
    //   event = event || window.event;
    //   if(!this.sortStatus) return false

    // },
    checkBrower(){
      let ua = navigator.userAgent
      if(ua.indexOf('Firefox') >-1){
        return 'FF'
      } else {
        return false
      }
    },

    // 中间子项目内小项目拖拽事件
    subDragstart(event){
      console.log(264,event, window.event)
      event = event || window.event;
      console.log(event);
      console.log('sub-start开始');
      let target = event.target || event.srcElement
      console.log(target)
      let ct = this.getCurTar(target,'sub-item')
      let index = ct.getAttribute('index')
      let i = ct.getAttribute('subindex')
      let l = parseInt(ct.style.left)
      let t = parseInt(ct.style.top)
      var disX = event.offsetX - l;
      var disY = event.offsetY - t;
      if(this.checkBrower() == 'FF'){
        disX = event.layerX;
        disY = event.layerY;
        console.log(233333,disX,disY)
      }
      console.log(ct,l,t,disX,disY,index,i)
      this.subObj = {l,t,disX,disY,index,i}
      this.subStatus = true
      event.dataTransfer.setData("itemindex",`${index}`);
      // event.dataTransfer.setData('text/plain', 'data');
      // event.stopPropagation();
    },
    subDragend(event) {
      console.log(290,event)
      console.log(293,event, window.event)
      let {l,t,disX,disY,index,i} = this.subObj
      console.log(310,l,t,disX,disY,index,i)
      event = this.subEvent || event;
      console.log(311,event)
      console.log('sub-end拖动结束',event);
      let nl = event.offsetX - disX
      let nt = event.offsetY - disY
      
      // 如果是firefox浏览器
      if(this.checkBrower() == 'FF'){
        nl = event.layerX - disX;
        nt = event.layerY - disY;
        if(target.className.indexOf('mitem-bd') == -1 || target.className.indexOf('sub-item') == -1 ){
          let curSubTarget = this.getCurTar(target,'sub-item')
          let subL = parseInt(curSubTarget.style.left)
          let subT = parseInt(curSubTarget.style.top)
          nl = (event.layerX + subL) - disX;
          nt = (event.layerY + subT) - disY;
        }
        console.log(319,nl,nt)
      }

      // 获取当前容器父容器
      //如果大于最大高度/最大宽度
      let target = event.target || event.srcElement
      let ct = this.getCurTar(target,'mitem-bd')
      let oh = ct.offsetHeight
      let ow = ct.offsetWidth
      console.log(292,'当前容器高度',oh,'当前容器宽度',ow)
      //
      if(nl< 0 || nt< 0 || nl > ow || nt > oh) {
        nl = l;
        nt = t;
      }
      // if(nt > oh) nt = t
      
      this.md[index].sd[i].l = nl
      this.md[index].sd[i].t = nt
      // this.subObj
      this.subStatus = false
      this.subEvent = undefined;
      // event.stopPropagation();
    },

    // 滚动条事件
    scrollEvent(){
      if(this.curMouseY > 490 && this.dragStatus) {
        clearInterval(this.timer)
        let mainWrap = document.getElementById('mainWrap')
        let st = mainWrap.scrollTop
        let ch = mainWrap.clientHeight
        let sh = mainWrap.scrollHeight
        console.log(308,'-------------',st,ch,sh)
        this.timer = setInterval(function(){
          mainWrap.scrollTop += 20
          console.log(mainWrap.scrollTop)
          if(mainWrap.scrollTop >= ch + sh - 20){
            clearInterval(this.timer)
          }
        },50)
      } else {
        clearInterval(this.timer)
        this.curMouseY = undefined;
      }
    },











  },
})






// })(window)