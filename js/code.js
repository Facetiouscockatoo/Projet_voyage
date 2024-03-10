
let liste_destinations = document.getElementById("333")
let template = document.querySelector("#rcorners1");
let lien = document.querySelector("body>nav>ul>template>a")
var destination = JSON.parse()

class Destination {
    constructor(ville, prix_de_base, pDej, animaux) {
        this._ville = ville
        this._prix_de_base = prix_de_base
        this._pDej = pDej
        this._animaux = animaux
    }
}


var destinations = [
    new Destination("Tokyo",240,true,false), 
    new Destination("Casablanca",120,true,false),
    new Destination("Ile Maurice",140,true,false),
    new Destination("Munich",160,true,false),
    new Destination("Paris",180,true,true),
    new Destination("Sydney",200,true,false),
    new Destination("New York",220,true,true),
    new Destination("Athènes",100,false,true)
    
]




function destination() {
    let u = new URLSearchParams(window.location.search).get("id");
    document.getElementById("destination_res").selectedIndex = u;
    document.getElementById("body_principal_reservation").style.backgroundImage = "url('../images/"+destinations[u]._ville+".jpg')";
}



function ajouter(){
    let adulte_id = new URLSearchParams(window.location.search).get("nbreadultes");
    let enfants_id = new URLSearchParams(window.location.search).get("nbreenfants");
    let depart_id = new URLSearchParams(window.location.search).get("week_year");
    let arrivee_id = new URLSearchParams(window.location.search).get("week_year");
   
    document.getElementById("nbra").textContent+=adulte_id;
    document.getElementById("nbre").textContent+=enfants_id;
    document.getElementById("jd").textContent+=depart_id;
    document.getElementById("ja").textContent+=arrrivee_id;

}


function heure() {
    for ( dest of destinations) {

        var date = new Date();
        var day = date.getFullYear() +"/"+ date.getMonth() +"/"+ date.getDate() ;
        var time = date.getHours() +":"+ date.getMinutes();
        
        let clone = document.importNode(template.content,true)
        
        let cloneChild = clone.firstElementChild;

        document.getElementsByClassName("nom_temps").textContent = dest_ville + "\n" + day + "\n" + time  ;


    }


}
setInterval(heure,1000);


function calcul_prix() {
    
    let a = document.getElementById("destination_res").selectedIndex;
    
    let price_adulte = destinations[a]._prix;
    let price_enfant = price_adulte*40/100; 
    var price = document.getElementById("nbra").value*price_adulte + document.getElementById("nbre").value*price_enfant;

    let date_arrive=document.getElementById("ja").type;
    let date_depart=document.getElementById("jd").type;
    
    let depart = new Date(date_depart) ;
    let arrivee = new Date(date_arrive) ;
    nbre_de_jours = (arrivee.getFullYear() - depart.getFullYear())* 365 + ((arrivee.getMonth() - depart.getMonth()))*30 + ((arrivee.getDay() - depart.getDay()))

    price = nbre_de_jours*price;
    
    if (destinations[a]._pDej) {
        price += nbre_de_jours*15
    }
    ;
    if (destinations[a]._ville.animaux){
        price += 30
    }
    ;
    document.getElementById("prix").textContent = "Prix  à payer:" + "" + price; 
}


function date_jour(){
    ja = document.getElementById("ja");
    jd = document.getElementById("jd");

    ja.min = new Date().toISOString().split("T")[0];
    
    
    jd.min = ja.value;
    ja.max = jd.value;
}



function create_templates() {

    for ( dest of destinations) {
        
        let temp = getTemperature(dest._ville)
        let clone = document.importNode(template.content,true)
        let identifiant = destinations.indexOf(dest)
        
        let cloneChild = clone.firstElementChild;

        cloneChild.firstElementChild.textContent = dest._ville + temp;
        cloneChild.firstElementChild.nextElementSibling.setAttribute("href","reservation.html?id="+String(identifiant))
        cloneChild.firstElementChild.nextElementSibling.firstElementChild.setAttribute("src","../images/"+dest._ville+".jpg")
    
        liste_destinations.append(cloneChild);

    }

}

function filtrage() {
    let liste_contraintes = [
        document.getElementById("input_max_prix").value,
        document.getElementById("input_min_prix").value,
        document.getElementById("input_p_dej").checked,
        document.getElementById("input_animaux").checked];
    
    console.log(liste_contraintes);
    let destinationsAdaptees = [];
    for (e of destinations) {
         if (e._prix_de_base < liste_contraintes[0] || liste_contraintes[0] == "")
         
         {if (e._prix_de_base > liste_contraintes[1] || liste_contraintes[1] == "") 
             {if (( !(liste_contraintes[2])) || liste_contraintes[2] && e._pDej )
                 {if ((!(liste_contraintes[3])) || liste_contraintes[3] && e._animaux) 
            
                        {destinationsAdaptees.push(e._ville)}
                 }
             }
         }

    }
            ;
    
    for (let i = 1; i < liste_destinations.children.length; i++) {
        
        console.log(!(destinationsAdaptees.includes(liste_destinations.children[i].firstElementChild.textContent)));
        if (!(destinationsAdaptees.includes(liste_destinations.children[i].firstElementChild.textContent))) {
            liste_destinations.children[i].classList.add("notshow")
        }
        else {liste_destinations.children[i].classList.remove("notshow")}};
        
}

function reinit_filtres() {

    document.getElementById("input_max_prix").value = '';
    document.getElementById("input_min_prix").value = '';
    document.getElementById("input_p_dej").checked = false;
    document.getElementById("input_animaux").checked = false;

}



function getTemperature(ville){
    const apiKey ='d4dce21dfff7fc3e618f71a5724c16b5';
    
    let temperatureElement=document.getElementById(`temperature-${destination}`);
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${apiKey}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data =>{
            if (temperatureElement){
                const temperature = data.min && data.min.temps;
                if(temperature!== undefined){
                    temperatureElement.textContent=`${temperature} °C`;
                    temperatureElement.style.opacity=1
                } else{
                    console.error('Données de température non disponible:', data);
                    temperatureElement.textContent = 'temperature indisponible';
                    temperatureElement.style.opacity=1
                }
            }
        })
        .catch(error=> {
            console.error('Erreur de récupération de la température:', error);
            if(temperatureElement){
                temperatureElement.textContent='Température indisponible'
                temperatureElement.style.opacity=1
            }
        })
}





