const MAIN = document.querySelector("main");
let obj = {
    "w-k": [[8, 5]],
    "w-q": [[8, 4]],
    "w-r": [[8, 1], [8, 8]],
    "w-b": [[8, 3], [8, 6]],
    "w-n": [[8, 2], [8, 7]],
    "w-p": [],

    
    "b-k": [[1, 5]],
    "b-q": [[1, 4]],
    "b-r": [[1, 1], [1, 8]],
    "b-b": [[1, 3], [1, 6]],
    "b-n": [[1, 2], [1, 7]],
    "b-p": [],
}
let pown = 0;
while(pown++ < 10){
    obj["w-p"].push([7, pown])
    obj["b-p"].push([2, pown])
}
let i = 0


const load = () => {
    while (i++ < 8){
        let j = 0
        MAIN.innerHTML += `<article class="hmm-${i%2}" id="${i}"></article>`
        while (j++ < 8){
            let o = ""
            for (objT in obj){
                obj[objT].forEach((x) => {
                    if (i == x[0] && j == x[1]){
                        o = `<img src="img/${objT}.svg" class="${i}_${j}" alt="${objT}">`;
                        return
                    }
                })
            }
            document.getElementById(`${i}`).innerHTML += `<section id="${i}_${j}">${o}</section>`
        }
    }
}
load()

let hoverNow = null
drag = false
let afterId = "1_1"
let beforeId = "1_1"
document.onmousemove = (e) => {
    e.preventDefault()
    if (!drag) {
        hoverNow = e.target
    }else {
        if (hoverNow.getAttribute("class") != null){
            let x = Math.trunc(e.clientX/100)+1
            let y = Math.trunc(e.clientY/100)+1
            if (y > 8) y = 8
            if (x > 8) x = 8
            afterId = `${y}_${x}`
            
            hoverNow.style.position = "absolute"
            hoverNow.style.transform = "translate(-50%, -50%)"
            hoverNow.style.top  = `${e.clientY}px`
            hoverNow.style.left = `${e.clientX}px`
            beforeId = hoverNow.getAttribute("class")
        }
    }
}


for (i in document.querySelectorAll("section")){
    if (i == Number(i)) {
        document.querySelectorAll("section")[i].addEventListener("mousedown", (e) => {
            e.preventDefault()
            drag = true
        });
        document.querySelectorAll("section")[i].addEventListener("mouseup", (e) => {
            e.preventDefault()
            drag = false
            hoverNow.setAttribute("class", afterId)
            hoverNow.style = ""
            document.getElementById(`${beforeId}`).innerHTML = ""
            document.getElementById(`${afterId}`).innerHTML = hoverNow.outerHTML
            console.log(hoverNow)
        });
        document.querySelectorAll("section")[i].addEventListener("mouseleave", (e) => {
            e.preventDefault()
            drag = false
            hoverNow.style = ""
        });
    }
}