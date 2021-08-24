document.querySelectorAll('.three')[0].checked=true
var timer=setInterval(()=>{
    rightclick(3)
},6000)
var timer1=setInterval(()=>{
    toright(4)
},6000)
const length=document.querySelectorAll('.swiper li').length;
const width=document.querySelectorAll('.swiper li')[0].offsetWidth;
for(i=0;i<length;i++){
    document.querySelectorAll('.swiper li')[i].style.left=(width+20)*i+"px"
}

//第一个轮播图函数
function onOver(){
    clearInterval(timer)
}

function onOut(){
    timer=setInterval(()=>{
        rightclick(3)
    },6000)
}
// x-总图数
function leftclick(x){
    let arr=document.querySelectorAll('.three')
    for(i=0;i<x;i++){
        if(arr[i].checked)
        {
            if(i-1<0){
                arr[x-1].checked=true;
                let temp= document.querySelector('.middiv').style.animation="_loop1 1s linear forwards"
                console.log(temp)
                break
            }
            arr[i-1].checked=true;                              
            document.querySelector('.middiv').style.animation="_loop"+(i+1)+" 1s linear forwards"
            break
        }
    }
}
// x-总图数
function rightclick(x){
    let arr=document.querySelectorAll('.three')
    for(i=0;i<x;i++){
        if(arr[i].checked)
        {
            if(i+1==x){
                arr[0].checked=true;
                document.querySelector('.middiv').style.animation="loop3 1s linear forwards"
                break
            }
            arr[i+1].checked=true
            i=i+1
            let b=document.querySelector('.middiv').style.animation="loop"+i+" 1s linear forwards"
            break
        }
    }
}

function changeimg(x,y){
    //x-当前点击位置 y-总图数
    document.querySelector('.middiv').style.animation="change"+x+" 1s linear forwards"
}

//第二个轮播图函数
function toleft(x){
    //一、移动
    let total=document.querySelectorAll('.swiper li').length;
    let list=document.querySelectorAll('.swiper li');
    let allwidth=document.querySelector('.swiper').offsetWidth;//实际大小  276px为每一个元素块所占大小
    // 5~8
    for(i=x;i<2*x;i++){
        list[i].style.left=allwidth+(276)*(i-x)+"px"//
    }
    //offsetLeft是只读的
    let movetimer1=setInterval(() => {
        for(i=0;i<x;i++){//控制首四节点移动
            list[i].style.left=list[i].offsetLeft-35+"px";
        }
        for(i=x;i<2*x;i++){//控制后四节点移动
            list[i].style.left=list[i].offsetLeft-35+"px";//有一个增速+20的跟
        }
        if(list[x].offsetLeft<=20)
            clearInterval(movetimer1)
    }, 20);
    // 采用relative实现时发现过程太过繁琐 这里改为使用absolute定位实现
    //二、更换数组     谁在前？谁在后？ 这里使用NodeList来实现   第一个添加到最后一个
    let d=document.createDocumentFragment()
    for(i=0;i<x;i++){
        d.appendChild(document.querySelectorAll('.swiper li')[0])
        d.childNodes[0].childNodes[0]=document.querySelectorAll('.swiper li')[0]
        document.querySelector('.swiper').appendChild(d)
    }
}

function toright(x){
    //一、移动
    let total=document.querySelectorAll('.swiper li').length;
    let list=document.querySelectorAll('.swiper li');
    let allwidth=document.querySelector('.swiper').offsetWidth;//实际大小  276px为每一个元素块所占大小
    // 所有一起动，但是最后四个要放到前四个来  8  4 5 6 7
    for(i=total-x;i<total;i++){
        list[i].style.left=(-276)*(4-i+total-x)+"px"//5 6 7 8  如何让5>6>7>8    (计算结果1 2 3 4)      5-(i+1-total+x)=(4-i+total-x)
    }
    //offsetLeft是只读的
    let movetimer=setInterval(() => {
        for(i=total-x;i<total;i++){//4 8
            list[i].style.left=list[i].offsetLeft+2+"px"
        }
        for(i=0;i<x;i++){//
            list[i].style.left=list[i].offsetLeft+2+"px"
        }
        if(list[total-x].offsetLeft>=0)
            clearInterval(movetimer)
    }, 20);
    // 采用relative实现时发现过程太过繁琐 这里改为使用absolute定位实现
    //二、更换数组     谁在前？谁在后？ 这里使用NodeList来实现  最后一个添加到第一个：删除末尾 添加到首位
    for(i=0;i<x;i++){
        let lastnode=document.querySelector('.swiper').children[total-1]//firstchild 与 lastchild在此不能用
        let swiper=document.querySelector('.swiper')
        swiper.insertBefore(lastnode,swiper.children[0])
        // swiper.removeChild(lastnode)
    }
}

function mouseover(){
    clearInterval(timer1)
}
function mouseout(){
    timer1=setInterval(()=>{
        toright(4)
    },6000)
}
// 数组使用方法带不能用于集合或NodeList
// setTimeout(()=>{
//     let arr=[]
//     for(i=0;i<total;i++){
//         arr[i]=list[i]
//     }
//     let temp1=arr.splice(0,x)
//     let temp2=arr.splice(total-2*x,total-x)
//     arr=arr.concat(temp1)
//     // arr=arr.unshift(...temp2)
//     temp2=temp2.concat(arr)
//     for(i=0;i<total;i++){
//         document.querySelectorAll('.swiper li')[i]=temp2[i]
//     }
// },2000)