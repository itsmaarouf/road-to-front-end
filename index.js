const bntEl = document.querySelector(".btn");

bntEl.addEventListener("mouseover",(event)=>{
    const x = (event.pageX -bntEl.offsetLeft);
    const y = (event.pageY -bntEl.offsetTop);

    bntEl.style.setProperty("--xPos",x +"px")
    bntEl.style.setProperty("--yPos",y +"px")
});