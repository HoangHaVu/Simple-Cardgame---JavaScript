console.log('JHello');

const array = [];
const detailbracket = document.getElementById('detailbracket');
const cardbracket = document.getElementById('cardbracket');

getData();

async function getData(){
    const resp = await fetch("https://api.myjson.com/bins/sykj7");
    const data = await resp.json();   
    for(i=0;i<data.cards.length;i++){
        let{realName,playerName,asset}= data.cards[i];
        array.push(new card(realName,playerName,asset));
    }
    fillCards(array)
}

function fillCards(array){

    for(i=0;i<cardbracket.children.length;i++){
        let cardi = cardbracket.children[i];
      
        cardi.children[1].innerHTML = array[i].realName;
        cardi.children[2].innerHTML = array[i].playerName;
        cardi.children[3].innerHTML = array[i].asset;
        
}
}

function selectCard(index){
    resetSelected();
    document.getElementsByClassName("carddetail")[index].style.border="thick solid #FF1C1C";
    let selec = cardbracket.children[index];
    let selectedCard = new card(selec.children[1].innerHTML,selec.children[2].innerHTML,selec.children[3].innerHTML);
    detailbracket.children[1].innerHTML=selectedCard.realName;
    detailbracket.children[2].innerHTML=selectedCard.playerName;
    detailbracket.children[3].innerHTML=selectedCard.asset;
    
}
function submitCard(){
    let selec = {
        RealName : detailbracket.children[1].innerHTML,
        PlayerName : detailbracket.children[2].innerHTML,
        Asset : detailbracket.children[3].innerHTML
    };
    
    console.log(selec);

    const request = new XMLHttpRequest();
    try{
        request.open("POST","databank.php");
        request.setRequestHeader("Content-Type","application/json");
        request.send(selec);
    }
    catch(e){
        console.log("Kann den Post Request nicht ausführen, da die Adresse fehlerhaft ist.")
    }
   
}

function resetSelected(){
    let x = document.getElementsByClassName("carddetail")
    for(i=0;i<x.length;i++){
        document.getElementsByClassName("carddetail")[i].style.border= "thin solid #4d4d4d";
    }
}

function findselected(sortarray){
    let name = detailbracket.children[1].innerHTML;
    
    for (i=0;i<sortarray.length;i++){       
            if(sortarray[i].realName===name){
                document.getElementsByClassName("carddetail")[i].style.border="thick solid #FF1C1C";
            }
    }
}

function sortASC(){
    let sortArray = [...array];
    sortArray.sort(function(a, b) {
        var nameA = a.realName.toUpperCase(); // Groß-/Kleinschreibung ignorieren
        var nameB = b.realName.toUpperCase(); // Groß-/Kleinschreibung ignorieren
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // Namen müssen gleich sein
        return 0;
      });
    fillCards(sortArray);
    resetSelected();
    findselected(sortArray);
}

function sortDESC(){
    let sortArray = [...array];
    sortArray.sort(function(a, b) {
        var nameA = a.realName.toUpperCase(); // Groß-/Kleinschreibung ignorieren
        var nameB = b.realName.toUpperCase(); // Groß-/Kleinschreibung ignorieren
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
      
        // Namen müssen gleich sein
        return 0;
      });
    fillCards(sortArray);
    resetSelected();
    findselected(sortArray);
}

class card {
    constructor(realName,playerName,asset){
        this.realName = realName;
        this.playerName= playerName;
        this.asset = asset;
    }
}