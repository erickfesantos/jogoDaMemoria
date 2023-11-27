let div = document.getElementById('numbers');
let cartas = [...div.querySelectorAll('div')];
let score = document.querySelector('.score');
let lixo = document.querySelector('#lixeira');

let pontos=0, limitador=0, indiceToConteudo= [0, 0], indices = [0, 0]; 
let controle = new Array(16).fill(0), limiteDeCartas = 0, reset = 0;

// corrigir conteúdo da carta aparecendo depois do alerta 

function removerLimparPontos(supremos){
  supremos.map((K)=>{
    K.classList.remove("supremo");
    pontos = 0;
    score.innerHTML = pontos;
  });
}

function trocarVerdeBranco(K){
  K.style.backgroundColor = 'rgb(25,179,159)';
  K.style.color = 'white';
}

function conteudoToInt(conteudo){
  let number = parseInt(conteudo);
  return number;
}

function adicionarPontos(){
   pontos += 10;
   return pontos;
}

function trocarPreto(J){
   J.style.backgroundColor = 'rgb(25,27,38)';                    
   J.style.color = 'rgb(25,27,38)';
}

function zerarGame(){
  if(pontos == 80){
    let supremos = [...document.querySelectorAll(".supremo")];
    alert("Fim de jogo!");
    removerLimparPontos(supremos);
  } 
}

function liberarCartas(){
  controle[indices[0]] = 0; /* Libera carta de acordo com o índice */
  controle[indices[1]] = 0; /* ... */
}

function impedir3Jogadas(){
  if(limiteDeCartas >= 3) {
    alert("Escolha 2 cartas por vez!");
    limiteDeCartas = 0;
    reset = 1;
  }
}

function sortearNumero() {
   return Math.floor(Math.random() * 16) + 1;
}

// Criar função embaralhar para tornar conteúdo das cartas aleatório




cartas.map((K,indice)=>{  
  
  	K.addEventListener('click', ()=>{
      
      if(reset == 1) limitador = 0; //correção de erro das 3 cartas, a 3ª bugava e voltava para black
      reset = 0;
      
      limiteDeCartas++;
      
      impedir3Jogadas()
      
      if(controle[indice] == 0){ /* Chave para bloquear o duplo click na seleção da mesma carta */
      
        trocarVerdeBranco(K);

        indiceToConteudo[limitador] = conteudoToInt(K.textContent);
        indices[limitador] = indice;
        limitador++
   
        controle[indice] = 1; /* Bloqueio da carta */
        
        if(limitador==2){

          liberarCartas();

          if(indiceToConteudo[0] == indiceToConteudo[1]){
                
            score.innerHTML = adicionarPontos();
                
             cartas.map((L)=>{
               if(conteudoToInt(L.textContent) == indiceToConteudo[0]){
                 L.classList.add('supremo');
               }
             });
           }

           setTimeout(()=>{  /* Trocar todo mundo pra preto exceto quem tiver classe "supremo" */
             cartas.map((J)=>{ 
               trocarPreto(J);
               liberarCartas(); 
               limiteDeCartas = 0;
             });  
            }, 500);
           

            zerarGame();
              
            limitador = 0;
              
         } 
              
      }     /* Fim da validação de duplo click na carta. */
    });     /* Fim do evento. */
});         /* Fim do MAP.  */



lixo.addEventListener("click", ()=>{
  let supremos = [...document.querySelectorAll(".supremo")];
  removerLimparPontos(supremos);
});
