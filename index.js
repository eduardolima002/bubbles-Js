const palco = document.getElementById("palco")
const num_objetos = document.getElementById("num_objetos")
const txt_qtde = document.getElementById("txt_qtde")
const btn_adicionar = document.getElementById("btn_adicionar")
const btn_remover = document.getElementById("btn_remover");

let larguraPalco = palco.offsetWidth;
let alturaPalco = palco.offsetHeight;
let bolas = [];
let numBolas = 0;

    class Bola{
        constructor(arrayBolas, palco){
            this.tam=Math.floor(Math.random()*15)+10;
            this.r = Math.floor(Math.random()*255);
            this.g = Math.floor(Math.random()*255);
            this.b = Math.floor(Math.random()*255);
            this.pY = Math.abs(Math.floor(Math.random()* (alturaPalco - this.tam)));
            this.pX = Math.floor(Math.random()* (larguraPalco - this.tam));
            this.velX = Math.floor(Math.random()* 2)+0.5;
            this.velY = Math.floor(Math.random()* 2)+0.5;
            this.dirX = ((Math.random() * 10) > 5) ? 1 : -1;
            this.dirY = ((Math.random() * 10) > 5) ? 1 : -1;
            this.arrayBolas = arrayBolas;
            this.palco = palco;
            this.id = Date.now()+ "_" + Math.floor(Math.random()* 100000000);
            this.desenhar();
            this.controle = setInterval(this.controlar,10);
            this.eu=document.getElementById(this.id);
        }

        minhaPos=() =>{
            return this.arrayBolas.indexOf(this);
        }

        remover=() =>{
            clearInterval(this.controle);
            bolas = bolas.filter((el) => {
                if(el != this.id){
                    return el;
                }
            })

            this.eu.remove();
            numBolas--;
            num_objetos.innerHTML= numBolas;
        }
        desenhar=() =>{
            const div = document.createElement("div");
            div.setAttribute("id", this.id);
            div.setAttribute("class", "bola");
            div.setAttribute("style", `left:${this.pX}px; top:${this.pY}px; width:${this.tam}px; height:${this.tam}px; background-color:rgb(${this.r},${this.g},${this.b});`)
            numBolas++;
            num_objetos.innerHTML = numBolas;
            this.palco.appendChild(div);
        }

        controle_bordas=() =>{
            if(this.pX + this.tam >= larguraPalco){
                this.dirX = -1;
            }else if(this.pX <= 0){
                this.dirX = 1;
            }
            if(this.pY + this.tam >= alturaPalco){
                this.dirY = -1;
            }else if(this.pY <= 0){
                this.dirY = 1;
            } 
        }
        controlar=() =>{
            this.controle_bordas();
            this.pX += this.dirX * this.velX;
            this.pY += this.dirY * this.velY;
            this.eu.setAttribute("style", `left:${this.pX}px; top:${this.pY}px; width:${this.tam}px; height:${this.tam}px; background-color:rgb(${this.r},${this.g},${this.b});`)
            if((this.pX > larguraPalco) || (this.pY > alturaPalco)){
                this.remover();
            }
        }
    }

window.addEventListener("resize", (evt) => {
    larguraPalco = palco.offsetWidth;
    alturaPalco = palco.offsetHeight;
})

btn_adicionar.addEventListener("click", () =>{
    const qtde = txt_qtde.value;
    for(let i =0; i < qtde; i++){
        bolas.push(new Bola(bolas, palco));
    }
})

btn_remover.addEventListener("click", () => {
    bolas.map((el) => {
        el.remover();
    })
})
