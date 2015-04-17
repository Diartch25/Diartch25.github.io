



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

                    Element.method('changetext', function(s){
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
                        if(formgroup[i].type == "text"){
                            if (formgroup[i].value == null || formgroup[i].value.length == 0 || caracterEmail.text(form.inputname.value)){
                                console.log("Incorrecto");
                                formgroup[i].validate('white', '#f9bdbd');
                                correct = false;
                            }else{
                                formgroup[i].validate('white', '#f9bdbd');
                                 correct = true;
                            }
                        };
                        if (correct == true) {
                            console.log("correcto");
                            form.submit();
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
                            tab += '<a class="button-info-dark" href="allprojects/project/project1.html" >Ver more</a>';
                        tab += '</div>';

                    tab += '</div>';
                    console.log(tab);
                
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

/////////////////////////////////////////////////////////////////////////////////////////////////

/*res.validate("Hola perro");
        document.getElementById("send").onclick = function(){
            var cajaName = document.getElementById('name');
            var cajaEmail = document.getElementById('email');
            var cajaMessage = document.getElementById('text-message');
            appPortfolio.taskProtfolio.formValidate(cajaName, cajaEmail, cajaMessage);
            cajaName.validate('white', '#f9bdbd');
            cajaEmail.validate('white', '#f9bdbd');
            cajaMessage.validate('white', '#f9bdbd');
        }*/

/////////////////////////////////////////////////////////////////////////////////////////////////

    