



var jsondata ="";
var appPortfolio = {};

            appPortfolio.taskPortfolio = function(){
                var caracterEmail = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
                var correct = true;
                var contacts = document.formgroup;
                window.onload =  function(){
                    document.formgroup.addEventListener('submit', processPortfolio);
                }

                function processPortfolio(form){ 
                    /////////////////////////////////////////////////////////////////////////////////////////////////

                    //
                    // -- Framework
                    //


                    // -- Aumenthing

                    Function.prototype.method = function(name, func){
    
                        if(!this.prototype[name]){
                            this.prototype[name] = func;
                        } 
                        return this;
                    };
                   
                    // -- Cambia Textos

                    Element.method('changeText', function(s){
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

                    form.preventDefault();
                    for(var i = 0; i < formgroup.length; i++){

                        // Detector de tipo de input
                        if(formgroup[i].type == "text"){
                            // Detector de caracteres no permitidos
                            if (formgroup[i].value == null || formgroup[i].value.length == 0 || caracterEmail.text(form.inputname.value)){
                                console.log("Incorrecto");
                                formgroup[i].validate('white', '#f9bdbd');
                                advice.changeText("Thank's!").validate('#4e7e7e', '#bfffca');
                                correct = false;
                            }else{
                                formgroup[i].validate('white', '#f9bdbd');
                                 correct = true;
                            }
                        };
                        if (correct == true) {
                            console.log("correcto");
                            form.submit();
                        }else{
                            advice.changeText("Hay espacios importantes en Blanco").validate('white', '#f9bdbd');
                        };
                    }

                    // Validación  
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
                            // Prueba:  console.log(data.proyecto[1].infos);
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
                            tab += '<a class="button-info-dark" href="'+ drawn[n].url +'" >Ver más</a>';
                            tab += '</div>';
                            tab += '</div>';
                            //Prueba: console.log(tab);
                
                    document.getElementById('tabs-group').innerHTML = tab;
                }

                // Función Validadora de los formulario
            }

        }();

/////////////////////////////////////////////////////////////////////////////////////////////////

        // Envio de los datos del formtulario

        document.getElementById("send").onclick = function(){
                processPortfolio();
        }

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ---- Proceso de Javascript del Portafolio
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
    Es un script que se ejecuta atrvez de closures y metodos.

    Una función principal consume la validación, esta función es aplicada en el formulario de contactos con 
    la intención de evitar que el usuariodeje espacios blancos o con caracteres incorrectos.

    Mientras que por modulos se realiza el llamado Ajax y el dibujado de la información que está dentro
    de los Tabs, que están en la sección Recents Projects, atravez de un Json que posee los tres proyectos
    recientes.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Nota: el llamado Ajax solo funciona con JQuery y si se usa Firefox como navegador.

    */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
