/*
* @Author: ylq
 * @Date: 2019-04-17 13:21:46
 * @Desc: Drag
 * @Last Modified by: ylq
 * @Last Modified time: 2019-04-17 14:23:48
 */
// (function(window){
  // function DragFn(o){
  //   this.dragDom = o.dragDom;
  //   this.dropDom = o.dropDom;
  // }
  // DragFn.prototype.getName = function() {
  //   return this.name;
  // };
  // DragFn.prototype.getMessage = function() {
  //   return this.message;
  // };
  let win = window;
  
  // 被拖拽的元素 
  let dragStart = (event)=> {
    event = event || window.event;
    console.log(event)
    console.log('start开始');
    //不能使用text或Text，firefox会打开新tab
    let target = event.target || event.srcElement
    console.log(target)
    let tp = target.getAttribute('tp')
    event.dataTransfer.setData('tp',tp); 
  }

  // 被拖拽的元素 拖动中……
  let drag = (event)=> {
    event = event || window.event;
    console.log(event)
    console.log('drag拖动中……');
  }

  let dragend = (event)=> {
    event = event || window.event;
    console.log(event)
    console.log('end拖动结束');
  }



  // 拖拽目标元素 
  let dragenter = (event)=> {
    event = event || window.event;
    console.log(event)
    console.log('dragenter进入目标元素');
    
  }

  let dragover = (event)=> {
    event.preventDefault();
    event = event || window.event;
    console.log(event)
    console.log('dragover在目标元素上的时候，会一直触发');
  }

  let drop = (event)=> {
    event.preventDefault();
    event = event || window.event;
    console.log(event)
    console.log('drop拖动元素在目标元素内释放时');
    let tp = event.dataTransfer.getData('tp')
    console.log('drop',tp)
  }

  let dragleave  = (event)=> {
    event = event || window.event;
    console.log(event)
    console.log('ondragleave被拖放元素移出目标元素时触发');
  }


  window.onload = function(){

    let sidebar = document.getElementById('sidebar')
    sidebar.addEventListener('dragstart',dragStart)
    sidebar.addEventListener('dragend',dragend)

    let main = document.getElementById('main')
    // main.addEventListener('dragenter',dragenter)
    main.addEventListener('dragover',dragover)
    main.addEventListener('drop',drop)
    // main.addEventListener('dragleave',dragleave)
  }

  



// })(window)


