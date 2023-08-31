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
                    console.log()
                    if (i == x[0] && j == x[1]){
                        o = `<img draggable="true" src="img/${objT}.svg" pos="${i}_${j}" alt="${objT}">`;
                        return
                    }
                    // console.log(objT, x)
                })
                // for (objP in ){
                //     console.log(objP)
                // }
            }
            document.getElementById(`${i}`).innerHTML += `<section id="${i}_${j}">${o}</section>`
        }
    }
}
load()

let hoverNow = null
let hoverBefore = null


for (i in document.querySelectorAll("img")){
    if (i == Number(i)) {
        document.querySelectorAll("img")[i].addEventListener("dragstart", (e) => {
            hoverBefore = hoverNow
        });
    }
}

for (i in document.querySelectorAll("img")){
    if (i == Number(i)) {
        document.querySelectorAll("img")[i].addEventListener("dragend", (e) => {
                console.log(Now)
                setTimeout(() => {
                e.preventDefault()
                // console.log(hoverBefore)
                // console.log(hoverNow)
                // hoverBefore.innerHTML = ""
                // console.log(Now)
                // hoverNow.innerHTML = hoverBefore
            }, 100)
        });
    }
}

for (i in document.querySelectorAll("section")){
    if (i == Number(i)) {
        document.querySelectorAll("section")[i].addEventListener("mouseover", (e, a) => {
            hoverIdNow = e.target.getAttribute("pos")? e.target.getAttribute("pos"): e.target.getAttribute("id")
           
            console.log(hoverIdNow)
        });
    }
}