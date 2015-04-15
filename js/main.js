//
// -- Framework
//

/////////////////////////////////////////////////////////////////////////////////////////////////

// -- Aumenthing

Function.prototype.method = function(name, func){
    
    if(!this.prototype[name]){
        this.prototype[name] = func;
    } 
    return this;
};

// -- Cambia Textos

Element.method('addHtml', function(s){
    this.innerHTML = s;
    return this;
});

// -- Establece un color al validar
Element.method('validate', function(c, b){
    this.style.color = c;
    this.style.background = b;
   return this;
});

/////////////////////////////////////////////////////////////////////////////////////////////////

var jsondata ="";
var appPortfolio = {};

        appPortfolio.taskPortfolio = function(){

            function drawnTab(){
                   
            } 
            return{

                // Llamado Ajax por JQuery

                callAjax: function(){
                    $.ajax({
                        type: "GET",
                        url: 'js/project.json',
                        dataType: "json",
                        success:function(data){
              
                           jsondata= data.proyecto;   
                           // Prueba:  appPortfolio.taskPortfolio.redirectionDrawn(jsondata , 0);
                            // Prueba:  console.log(data.proyecto[1].infos);

                            // Prueba: appPortfolio.taskPortfolio.projectDirection(jsondata);
                
                        },
                        error:function(jqXHR, textStatus, errorThrown) {
                            console.log("Text Status:" +textStatus+"\nError:"+errorThrown);
                        }
                     }); 
                },

                // Función Dibujante de la información en el tab

                redirectionDrawn: function(drawn , n){
                    console.log(drawn[n] , n)

                    var tab = '<div class="project">';

                        tab += '<div id="info-project" class="standard-text recent-content">';
                            tab += drawn[n].infos;
                        tab += '</div>';

                        tab += '<div id="info-img" class="recent-img">';
                            tab += '<img src="' + drawn[n].imagen + '">';
                        tab += '</div>';

                        tab += '<div class="recent-links">';
                            tab += '<a class="button-info-dark" href="allprojects/project/project1.html" >Ver more</a>';
                        tab += '</div>';

                    tab += '</div>';
                    console.log(tab);
             
                
                    document.getElementById('tabs-group').innerHTML = tab;
                },

                // Función Validadora de los formularios

                formValidate: function(name, mail, message){
                    if (name !== null){
                        name.validate('white', '#f9bdbd')
                    }else{
                        
                    }
                }

            }

        }();
/////////////////////////////////////////////////////////////////////////////////////////////////

        // Envio de los indicadores de los Tabs para traer la información

        document.getElementById("tab-1").onclick = function(){

              appPortfolio.taskPortfolio.redirectionDrawn(jsondata , 0);

        }

        document.getElementById("tab-2").onclick = function(){

              appPortfolio.taskPortfolio.redirectionDrawn(jsondata , 1);

        }
        document.getElementById("tab-3").onclick = function(){

              appPortfolio.taskPortfolio.redirectionDrawn(jsondata , 2);

        }

        // Fijador del Llamado Ajax

        appPortfolio.taskPortfolio.callAjax();

/////////////////////////////////////////////////////////////////////////////////////////////////
        

        // Envio de los datos del formulario

        document.getElementsById("send").onclick = function(){
                var name = document.getElementById("name").value();
                appPortfolio.taskPortfolio.formValidate(name);
        }

        /*document.getElementById("send").onclick = function(){
            var cajaName = document.getElementById('name');
            var cajaEmail = document.getElementById('email');
            var cajaMessage = document.getElementById('text-message');
            appPortfolio.taskProtfolio.formValidate(cajaName, cajaEmail, cajaMessage);
            cajaName.validate('white', '#f9bdbd');
            cajaEmail.validate('white', '#f9bdbd');
            cajaMessage.validate('white', '#f9bdbd');
        }*/

/////////////////////////////////////////////////////////////////////////////////////////////////

    