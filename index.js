var colors=['red','pink','black','blue'];
var app=new Vue({
    el:'#el',
    data:{
      list:[
          {id:1,title:'便签1',content:'',top:10,left:120,theme:'red'}
      ],
        moveEvent:{state:false,index:null,position:{}}
    },
    methods:{
        addNote:function(e){
            //空
            if(this.list.length){
                var id=this.list[this.list.length-1].id+1;
            }else{
                var id=1;
            }
            var top=e.clientY-80-20,
                left=e.clientX-120,
                title='便签'+id,
                content='',
                theme=colors[Math.floor(Math.random() * 4)];
                this.list.push({id,title,content,theme,top,left});
                this.save();
        },
        md: function (i,e) {
            this.moveEvent.state=true;
            this.moveEvent.index=i;
            this.moveEvent.position={
                x: e.offsetX,
                y: e.offsetY
            };
        },
        mu:function(){
            this.moveEvent.state=false;
        },
        //拖拽
        mv:function(e){
            if(this.moveEvent.state){
                var top= e.clientY-80-this.moveEvent.position.y;
                var left= e.clientX-this.moveEvent.position.x;
                this.list[this.moveEvent.index].top=top;
                this.list[this.moveEvent.index].left=left;
                this.save();
            }
        },
        save:function(){
            localStorage.list=JSON.stringify(this.list);
        },
        deleteMsg:function(i){
            this.list.splice(i,1);
            this.save();
        }
    },
    mounted:function(){
        document.onkeyup=(function(e){
            if((e.keyCode==46||e.keyCode==8)&&this.moveEvent.index!=null){
                this.list.splice(this.moveEvent.index,1);
                this.moveEvent.index=null;
                this.save();
            }
        }).bind(this);
        //记录
        if(localStorage.list)
        this.list=JSON.parse(localStorage.list);
    }
});