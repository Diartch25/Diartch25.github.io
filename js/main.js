Function.prototype.method = function(name, func){
    
    if(!this.prototype[name]){
        this.prototype[name] = func;
    } 
    return this;
};


Element.method('addHtml', function(s){
    this.innerHTML = s;
    return this;
});

Element.method('validate', function(c, b){
    this.style.color = c;
    this.style.background = b;
   return this;
});

//elemento("text").change('yellow').addHtml('Una palabra');


var appPortfolio = {};

        appPortfolio.taskPortfolio = function(){

            function drawnTab(drawn){
                
                    var contenido = '<ul>'; 

                    tab += '<div class="project1">';

                        tab += '<div id="info-project" class="recent-content">';
                            tab += drawn.proyecto[1].infos;
                        tab += '</div>';

                        tab += '<div id="info-img" class="recent-img">';
                            tab += '<img src="' + drawn.proyecto[1].imagen + '">';
                        tab += '</div>';

                        tab += '<div class="recent-links">';
                            tab += '<a class="button-info-dark" href="allprojects/project/project1.html" >Ver more</a>';
                        tab += '</div>';

                    tab += '</div>';
    
             
                
                    document.getElementById('addlist').innerHTML=tab;
                   
            } 
            return{
                callAjax: function(){
                    $.ajax({
                        type: "GET",
                        url: '../js/datos.json',
                        dataType: "json",
                        success:function(data){
              
                            projectDirection(data.project);   
                
                        },
                        error:function(jqXHR, textStatus, errorThrown) {
                            console.log("Text Status:" +textStatus+"\nError:"+errorThrown);
                        }
                     }); 
                },
                projectDirection: function(work){
                    drawnTab(work);
                },
                formValidate: function(name, mail, message){
                   /* if (name !== null || mail !== null || message !== null){
                        if (){

                        }
                    }*/
                }

            }
        }();
        
       

        function Producto(n){
            this.nombre = n;
        }


       // appPortfolio.taskProtfolio();
        

        document.getElementById("send").onclick = function(){
            var cajaName = document.getElementById('name');
            var cajaEmail = document.getElementById('email');
            var cajaMessage = document.getElementById('text-message');
            appPortfolio.taskProtfolio.formValidate(cajaName, cajaEmail, cajaMessage);
            cajaName.validate('white', '#f9bdbd');
            cajaEmail.validate('white', '#f9bdbd');
            cajaMessage.validate('white', '#f9bdbd');
        }

        /*document.getElementById("funcion1").onclick = function(){
         
        }*/


    