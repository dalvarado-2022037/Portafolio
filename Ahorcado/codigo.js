/*const botonA = document.getElementById("a");

botonA.addEventListener("click", function() {
    alert("¡Hola!");
    botonA.disabled = false;
});

botones["a"].addEventListener("click", function() {
    alert("¡Hola!");
    botonA.disabled = true;
    botonA.classList.add("no-hover");
    botonA.classList.add("boton-no");
});*/
const botones = {};

//Abecedario
const letrasAbecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Iteramos a través de cada letra en el array
letrasAbecedario.forEach(letra => {
    // Obtenemos el botón correspondiente usando su ID
    botones[letra] = document.getElementById(letra);
});

//Funcion para desactivar un botons
const desactivarBoton = (valorBoton) => {
    botones[valorBoton].disabled = true;
    botones[valorBoton].classList.add("no-hover");
    botones[valorBoton].classList.add("boton-no");
};

//Obtenemos el canvas
const canvas = document.getElementById('canvasAhorcado');
const ctx = canvas.getContext('2d');

//Variable para ver la ubicacion de la letra
let modificar;
//Variable para ver si existe la letra en la palabra
let resultado;
//Variable para ver cuantas veces falla
let fallas = 0;

//Registrar que cuando se aga un click en cualquier boton
letrasAbecedario.forEach(letra => {
    //Si se da un click en cualquier comento entra con el evento click
    botones[letra].addEventListener("click", function() {
        //Llamamos el metodo para dibujar el mastil

        // Llama a la función desactivarBoton pasando la letra como argumento
        desactivarBoton(letra);

        //Verificamos si hay una letra en la palabra
        resultado = palabraALaZar.includes(letra);
        //Obtenemos la unicacion de la letra
        modificar = palabraALaZar.indexOf(letra);

        //Si hay una letra entra 
        if (resultado == true) {
            //Dado el caso solo hay 1 la setea de golpe
            h1Elementos[modificar+1].textContent = letra;
            //Pero si hay 2 lo busca en un ciclo for
            for (let i = 0; i < palabraALaZar.length; i++) {
                //Si exite hace el cambio
                if (palabraALaZar[i] === letra) {
                    h1Elementos[i+1].textContent = letra;
                }
            }
            let final = verificar();
            if (final == true) {
                alert("Finish"); 
                bloquearBotones();
                dibujarCuerpoVivo();
                let tiempo = 3;
                let contador2 = setInterval(()=>{
                    tiempo--;
                    if(tiempo == 0){
                        document.write("<body style=' background-image: linear-gradient(300deg, #000000, #148939, #148939 ,#148939,  #148939, #148939 ,#000000); '>")
                        document.write("<center>");
                        document.write("<h1 style=' font-size: 80px'>Felicidades has ganado</h1>")
                        document.write("<h1 style=' font-size: 80px'>La palabra es: "+palabraALaZar+"</h1>")
                        document.write("<h1 style=' font-size: 80px'>Desea Volver a Jugar</h1>")
                        document.write("<button style='padding: 10px 20px; font-size: 16px; border: none; background-color: #3498db; color: #fff; cursor: pointer;' onclick ='Refres()'> Claro que si </button>");
                        document.write("</center>");
                        document.write("</body>");
                    }
                },1000);
            }
        }else{
            fallas++;
            dibujarAhorcado(fallas);
            if(fallas == 7){
                alert("Fin del juego la palabra es: " + palabraALaZar);
                dibujarCuerpo();
                bloquearBotones();
                let tiempo = 3;
                let contador = setInterval(()=>{
                    tiempo--;
                    if(tiempo == 0){
                        clearInterval(contador);
                        document.write("<body style=' background-image: linear-gradient(300deg, #000000, #148939, #148939 ,#148939,  #148939, #148939 ,#000000); '>")
                        document.write("<center>");
                        document.write("<h1 style=' font-size: 80px'>Que pena has perdido</h1>")
                        document.write("<h1 style=' font-size: 80px'>La palabra es: "+palabraALaZar+"</h1>")
                        document.write("<h1 style=' font-size: 80px'>Desea Volver a Jugar</h1>")
                        document.write("<button style='padding: 10px 20px; font-size: 16px; border: none; background-color: #3498db; color: #fff; cursor: pointer;' onclick ='Refres()'> Claro que si </button>");
                        document.write("</center>");
                        document.write("</body>");
                    }
                },1000);
            }
        }
    });

    // Agregamos un evento keydown para detectar una tecla específica
    window.addEventListener("keydown", function(event) {
        // Comparamos la tecla presionada con la letra correspondiente
        if (event.key === letra) {
            // Simulamos un clic en el botón usando el método "click()"
            botones[letra].click();
        }
    });
});

const bloquearBotones = () => {
    for (let i = 0; i < letrasAbecedario.length; i++) {
        botones[letrasAbecedario[i]].disabled = true;
        botones[letrasAbecedario[i]].classList.add("boton-no");
        botones[letrasAbecedario[i]].classList.add("no-hover");
    }
}

//Palabras para el ahorcado
const palabras = ['pato', 'carro', 'mariposa', 'avion', 'montaña', 'oceano', 
'guitarra', 'felicidad', 'chocolate', 'aventura', 'lluvia', 'unicornio',
'estanque','mago','rugir','robot','poema','ganado','pulmon','billete',
'terminal','chicle','basurero','vegetal','alarma','estudiar','ñ','uno',
'posar','bronce','campesino','aceite','imagen','copia','gripe','aeiou'];
//const palabras = ['pato'];

//Obtenemos un numero aleatorio
const numeroAleatorio = Math.floor(Math.random() * palabras.length);

//Obtenemos la palabra mas larga
let palabraALaZar = palabras[numeroAleatorio];

// Obtén el elemento contenedor donde se agregarán los <h1>
const contenedor = document.getElementById('contenedor');

// Crear un contenedor para las filas
const filaContenedor = document.createElement('div');

//Le asignamos las caracteristicas del CSS
filaContenedor.classList.add('fila-contenedor');

//Al contenedor le seteamos todo lo anterior
contenedor.appendChild(filaContenedor);

//Por si se ingresan palabras muy largas
let texto;
if (palabraALaZar.length<11) {
    texto = " ___"
}else{
    texto = " __"
}

for (let i = 0; i < palabraALaZar.length+1; i++) {
    // Crea un elemento <h1> en cada iteración del bucle
    const h1 = document.createElement('h1');
    if (i == 0) {
        // Establece el contenido de texto del h1 
        h1.textContent = "    ";
        // Agrega el elemento <h1> al contenedor de filas
        filaContenedor.appendChild(h1);
    }else{
        // Establece el contenido de texto del h1 
        h1.textContent = texto;
        // Agrega el elemento <h1> al contenedor de filas
        filaContenedor.appendChild(h1);  
    }
}

// Aqui obtenemos todos los elementos <h1> y los asignamos a un array
const h1Elementos = filaContenedor.getElementsByTagName('h1');

//Validamos si encontro la palabra
const verificar = () =>{
    //Realizamos un ciclo para ver el contenido de todos los h1
    for (let i = 1; i < h1Elementos.length; i++) {
        //Si dado el caso hay 1 que siga con el contenido de " ___" rompe el ciclo y retorna falso
        if (h1Elementos[i].textContent === " ___") {
            return false;
        }
    }
    //Si se termina el ciclo retorna verdadero
    return true;
}



// Dibuja el ahorcado aquí según el número de fallas
const dibujarAhorcado = (fallas) =>{
    // Borra el contenido previo del canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja las partes del ahorcado según las fallas
    if(fallas == 1){
        // Dibuja la cabeza
        //El metodo arc es para hacer arcos
        ctx.beginPath();
        ctx.arc(150, 50, 30, 0, Math.PI * 2);
        ctx.stroke();
        //El asta
        for (let i = 0; i < 10; i++) {
            ctx.moveTo(60+i, 0);
            ctx.lineTo(60+i, 250);
        }
        //La base
        for(let i = 0; i < 5; i++){
            ctx.moveTo(10, 250+i);
            ctx.lineTo(200, 250+i);
        }

        //Parte superior
        for(let i = 0; i < 5; i++){
            ctx.moveTo(60, 0+i);
            ctx.lineTo(220, 0+i);
        }

        //Cuerda
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 20);
        ctx.stroke();

    }else if (fallas == 2) {

        //Boca
        ctx.moveTo(140, 60);
        ctx.lineTo(160, 60);

        //Ojos
        ctx.moveTo(140, 50);
        ctx.lineTo(140, 40);
        ctx.moveTo(160, 50);
        ctx.lineTo(160, 40);
        ctx.stroke();
    }else if (fallas == 3) {
        // Dibuja el cuerpo
        ctx.moveTo(150, 80);
        ctx.lineTo(150, 160);
        ctx.stroke();
    }else if (fallas == 4) {
        // Dibuja una pierna
        ctx.moveTo(150, 160);
        ctx.lineTo(120, 220);
        ctx.stroke();
    }else if(fallas == 5){
        ctx.moveTo(150, 160);
        ctx.lineTo(180, 220);
        ctx.stroke();
    }else if (fallas == 6) {
        // Dibujar brazos
        ctx.moveTo(150, 100);
        ctx.lineTo(120, 140);
        ctx.stroke();
    }else if (fallas == 7){
        ctx.moveTo(150, 100);
        ctx.lineTo(180, 140);
        ctx.stroke();
    }
}

const dibujarCuerpo = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibuja la cabeza
    ctx.beginPath();
    ctx.arc(150, 50, 30, 0, Math.PI * 2);
    ctx.stroke();

    // Dibuja la boca
    ctx.beginPath();
    ctx.arc(150, 65, 7, 0, Math.PI * 2);

    //El asta
    for (let i = 0; i < 10; i++) {
        ctx.moveTo(60+i, 0);
        ctx.lineTo(60+i, 250);
    }
    //La base
    for(let i = 0; i < 5; i++){
        ctx.moveTo(10, 250+i);
        ctx.lineTo(200, 250+i);
    }

    //Parte superior
    for(let i = 0; i < 5; i++){
        ctx.moveTo(60, 0+i);
        ctx.lineTo(220, 0+i);
    }

    //Cuerda
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 20);
    ctx.stroke();

    // Dibuja los ojos
    //Ojo Derecho
    ctx.moveTo(135, 50);
    ctx.lineTo(145, 40);
    ctx.moveTo(135, 40);
    ctx.lineTo(145, 50);

    //Ojo Izquierdo
    ctx.moveTo(155, 50);
    ctx.lineTo(165, 40);
    ctx.moveTo(155, 40);
    ctx.lineTo(165, 50);

    // Dibuja el cuerpo
    ctx.moveTo(150, 80);
    ctx.lineTo(150, 160);
    
    // Dibuja piernas
    //Pierma derecha
    ctx.moveTo(150, 160);
    ctx.lineTo(120, 190);
    //Curva de la pierna 
    ctx.moveTo(120, 190);
    ctx.lineTo(140, 210);

    //Pierma Izquierda
    ctx.moveTo(150, 160);
    ctx.lineTo(180, 190);
    //Curva de la pierna 
    ctx.moveTo(180, 190);
    ctx.lineTo(160, 210);

    
    // Dibujar brazos
    //Brazo Derecho
    ctx.moveTo(150, 100);
    ctx.lineTo(120, 100);
    //Cuerva del brazo
    ctx.moveTo(120, 100);
    ctx.lineTo(150, 79);

    //Brazo izquierdo
    ctx.moveTo(150, 100);
    ctx.lineTo(180, 100);
    //Cuerva del brazo
    ctx.moveTo(180, 100);
    ctx.lineTo(150, 79);

    ctx.stroke();
}

const dibujarCuerpoVivo = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dibuja la cabeza
    ctx.beginPath();
    ctx.arc(150, 150, 20, 0, Math.PI * 2);
    ctx.stroke();

    // Dibuja la boca
    ctx.beginPath();
    ctx.arc(150, 157, 6, 0, Math.PI );

    //El asta
    for (let i = 0; i < 10; i++) {
        ctx.moveTo(60+i, 0);
        ctx.lineTo(60+i, 250);
    }
    //La base
    for(let i = 0; i < 5; i++){
        ctx.moveTo(10, 250+i);
        ctx.lineTo(200, 250+i);
    }

    //Parte superior
    for(let i = 0; i < 5; i++){
        ctx.moveTo(60, 0+i);
        ctx.lineTo(220, 0+i);
    }

    // Dibuja los ojos
    //Ojo Derecho
    ctx.moveTo(148, 142);
    ctx.lineTo(144, 145);
    ctx.moveTo(140, 142);
    ctx.lineTo(144, 145);

    //Ojo Izquierdo 

    ctx.moveTo(150, 142);
    ctx.lineTo(155, 145);
    ctx.moveTo(160, 142);
    ctx.lineTo(155, 145);

    // Dibuja el cuerpo
    ctx.moveTo(150, 170);
    ctx.lineTo(150, 220);
    
    // Dibuja piernas
    //Pierma derecha
    ctx.moveTo(150, 220);
    ctx.lineTo(145, 240);
    //Curva de la pierna 
    ctx.moveTo(145, 240);
    ctx.lineTo(130, 250);

    //Pierma Izquierda
    ctx.moveTo(150, 220);
    ctx.lineTo(175, 210);
    //Curva de la pierna 
    ctx.moveTo(175, 210);
    ctx.lineTo(190, 230);
    
    // Dibujar brazos
    //Brazo Derecho
    ctx.moveTo(150, 180);
    ctx.lineTo(125, 190);
    //Cuerva del brazo
    ctx.moveTo(125, 190);
    ctx.lineTo(145, 205);

    //Brazo izquierdo
    ctx.moveTo(150, 180);
    ctx.lineTo(175, 178);
    //Cuerva del brazo
    ctx.moveTo(175, 178);
    ctx.lineTo(187, 160);

    ctx.stroke();
}


const Refres = () =>{
    location.reload();
}
//alert(palabraALaZar);



