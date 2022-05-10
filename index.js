// set break length
let timer={
    isActive:false,
    isPaused:true,
    isBreak:false,
    breakLength:[5,0],
    session:[25,0],
    time:[25,10],
    pausedTime:null,
}
$('#break-decrement').click(()=>setBreak("minus"))
$('#break-increment').click(()=>setBreak("add"))
let breakText=$("#break-length")

function setBreak(val){
    if(timer.isActive) return
    

    if(timer.breakLength[0]>1 && val==="minus"){
        timer.breakLength[0]-=1
    }
    else if(timer.breakLength[0]<60 && val==="add"){
        timer.breakLength[0]+=1
    }
    
   breakText.text(timer.breakLength[0])

}

// set session length

$('#session-decrement').click(()=>setSession("minus"))
$('#session-increment').click(()=>setSession("add"))
let sessionText=$("#session-length")
let timeLeft=$("#time-left")

function setSession(val){
    if(timer.isActive) return
    

    if(timer.session[0]>1 && val==="minus"){
        timer.session[0]-=1
    }
    else if(timer.session[0]<60 && val==="add"){
        timer.session[0]+=1
    }
    
   sessionText.text(timer.session[0])
    timer.time=timer.session
    
    timeLeft.text(timeFormater(timer.time))
    

}

function timeFormater(arr){
    let newArr=[...arr]
    if(newArr[0]<10){
        newArr[0]="0"+newArr[0].toString()
    }
    if(newArr[1]<10){
        newArr[1]="0"+newArr[1].toString()
    }
    return newArr.join(":")

}

// handle timer



function getTime(){
    if(timer.pausedTime!==null){
        return timer.pausedTime
    }
    else if(timer.isBreak){
        return timer.breakLength
    }
    else{
        return timer.session
    }


}

let startStop=$("#start_stop")
startStop.click(()=>{
    if(!timer.isPaused){
        pause()
        startStop.text("Start")

    }
    else{
        countdown()
        startStop.text("Pause")
    }
})

console.log($("#start_stop"))

let intervalid=null

let audio=document.getElementById("beep")

function countdown(){
  let [minute,sec]=getTime()
  $("#timer-label").text(timer.isBreak? "Break" : "Session")
  timer.isPaused=!timer.isPaused
    const newInterval=setInterval(()=>{
        
        console.log("start",minute,sec)

        timer.time=[minute,sec]

        timeLeft.text(timeFormater(timer.time))

        if(sec<=0 && minute >0){
            minute-=1
            sec=59
        }
        
        else if(sec<=0 && minute<=0){
            audio.play()
            console.log("switch")
            timer.isBreak=!timer.isBreak
            timer.isPaused=null
            if(intervalid!==null){
                clearInterval(intervalid)
                intervalid=null
            }
            console.log(timer.isBreak)
            countdown()
            return
            
        }

        sec--
        


    }
    ,1000)

    intervalid=newInterval
}
// pause timer
function pause(){
    audio.pause()
    audio.currentTime=0
    if(intervalid!==null){
        clearInterval(intervalid)
        intervalid=null
    }
    timer.pausedTime=timer.time
    timer.isPaused=true


}

// reset timer
$("#reset").click(reset)

function reset(){
    clearInterval(intervalid)
    intervalid=null
    timer={
        isActive:false,
        isPaused:true,
        isBreak:false,
        breakLength:[5,0],
        session:[25,0],
        time:[25,10],
        pausedTime:null,
    }
    audio.pause()
    audio.currentTime=0
    timeLeft.text(timeFormater(timer.time))
    breakText.text(timer.breakLength[0])
    sessionText.text(timer.session[0])
    
}


