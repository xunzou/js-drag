/*
 * @Author: ylq
 * @Date: 2019-04-17 13:21:46
 * @Desc: Drag
 * @Last Modified by: ylq
 * @Last Modified time: 2019-04-18 12:19:02
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
    },
    // 拖拽目标元素 在目标元素内部，放下拖拽的内容
    drop(event,index,sub) {
      console.log(148,event,index,sub)
      if(!this.dragStatus) return false
      console.log(150,event,index,sub)
      event.preventDefault();
      event.stopPropagation();
      event = event || window.event;
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

    // 中间子项目内小项目拖拽事件
    subDragstart(event,index,sub){
      event = event || window.event;
      console.log(event);
      console.log('start开始');
      let target = event.target || event.srcElement
      console.log(target)
      let ct = this.getCurTar(target,'sub-item')
      let l = parseInt(ct.style.left)
      let t = parseInt(ct.style.top)
      var disX = event.offsetX - l;
      var disY = event.offsetY - t;
      console.log(ct,l,t,disX,disY)
      this.subObj = {l,t,disX,disY}
      this.subStatus = true
      // event.stopPropagation();
    },
    subDragend(event,index,i) {
      let {l,t,disX,disY} = this.subObj
      event = event || window.event;
      console.log('end拖动结束');
      let nl = event.offsetX - disX
      let nt = event.offsetY - disY
      // if(nl< 0 || nt< 0) {nl = l;nt = t}
      // if(nt< 0) nt = t
      //如果大于最大高度/最大宽度
      let target = event.target || event.srcElement
      let ct = this.getCurTar(target,'mitem-bd')
      let oh = ct.offsetHeight
      //
      if(nl< 0 || nt< 0 || nl > 375 || nt > oh) {
        nl = l;
        nt = t;
      }
      // if(nt > oh) nt = t
      
      this.md[index].sd[i].l = nl
      this.md[index].sd[i].t = nt
      // this.subObj
      this.subStatus = false
      // event.stopPropagation();
    },












  },
})








// })(window)