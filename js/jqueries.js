$("document").ready(function() {

    var titrePage = $("head title").text();

    $("body").prepend("<header><nav><ul><li><a href ='c'>Aide et contacts</a></li><li><a href ='p'>Panier</a></li><li><a href ='r'>Réservation</a></li><li><a href ='a'>Nos voyages</a></li></ul></nav></header>"
    );

    $("nav").addClass("navbar");
    $("nav a").addClass("btn1");
    $("[href='c']").attr("href","contact.html");
    $("[href='p']").attr("href","panier.html");
    $("[href='r']").attr("href","reservation.html");
    $("[href='a']").attr("href","page_accueil.html");

    $("header").after("<h1></h1>");
    $("h1").text(titrePage);

    if (titrePage = "Réservation") {
        $("h1").attr("id","resform")
    }

    
    
    $("body").append([
        "<footer id = 'footer'>",
        "   <div id = 'foot_left'>",
        "       <ul class = 'liste_footer'>",
        "           <li><p id='foot4'>Qui sommes-nous?</p></li>",
        "           <li><a href='nos-specialistes.html' class = 'footLiens'> Nos spécialistes</a></li>",
        "           <li><a href='contact.html' class = 'footLiens'> Contactez-nous</a></li>",
        "           <li><a href='avis-clients.html' class = 'footLiens'> Avis clients VilleJeunet</a></li>",
        "       </ul>",
        "   </div>",
        "   <div id='foot1'>",
        "       <ul class = 'liste_footer'>",
        "           <li><p id = 'foot5'>Informations Pratiques</p></li>",
        "           <li><a href='mentions-legales.html' class = 'footLiens'> Mentions légales</a></li>",
        "           <li><a href='foire-aux-questions.html' class = 'footLiens'> FAQ </a></li>",
        "           <li><a href='politique-de-confidentialite.html' class = 'footLiens'> Confidentialité</a></li>",
        "       </ul>",
        "   </div>",
        "</footer>"].join('\n'))

        

    }); 





