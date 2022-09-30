$(function (){
    let winPossibility = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    $("body").prepend("<p>Pour la première partie les ronds commencent puis c'est à chaque fois le perdant de la partie d'avant.<br>" +
        "Pour les égalités le joueur qui commence change à chaque fois</p>");
    $("body").prepend("<h1>Morpion</h1>");
    $("body").append("<h2 class='info'>&nbsp;</h2>");
    let test = true;
    let nbClick = 0;
    var win = false;


    $("td").click(function () {
        $("h2.info").replaceWith("<h2 class='info'>Tour des " + ((!test) ? "ronds" : "croix") + "</h2>");
        if (!$(this).hasClass("symbole_1") && !$(this).hasClass("symbole_0")) {
            $(this).addClass("symbole_" + ((test) ? "0" : "1"));
            test = !test;
            nbClick++;
        }
        var cases = [];
        $("td").each(function (index, element){
            if ($(element).hasClass("symbole_" + ((!test) ? "0" : "1"))){
                cases.push(index);
            }
        });

        if (nbClick >= 5){

                $(winPossibility).each(function (index, possibility){
                    var testWin = 0;
                    $(cases).each(function (key, value) {
                        if ($.inArray(value, possibility) != -1) {
                            testWin++;
                        }
                        if (testWin == 3) {
                            $("td").addClass("win");
                            $("h2.info").replaceWith("<h2 class='info winner'>" + "Les " + ((test) ? "croix" : "ronds") + " ont gagné" + "</h2>");
                            setTimeout(function () {
                                alert("Le jeu va recommencer");
                                $("td.win").removeAttr("class");
                                $("h2.winner").replaceWith("<h2 class='info winner'>&nbsp;</h2>");
                                nbClick = 0;
                                win = true;
                            }, 100);
                        } else {
                            win = false;
                        }
                    });
                });
            if (nbClick == 9 && !$("td").hasClass("win") && win == false){
                $("td").addClass("tie");
                $("h2.info").replaceWith("<h2 class='info winner'>C'est une égalité</h2>");
                setTimeout(function () {
                    alert("Le jeu va recommencer");
                    $("td.tie").removeAttr("class");
                    $("h2.winner").replaceWith("<h2 class='info winner'>&nbsp;</h2>");
                    nbClick = 0;
                }, 100);
            }
        }
        console.log(cases);
    });
});