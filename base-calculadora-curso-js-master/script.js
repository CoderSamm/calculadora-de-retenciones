//Esto agrega a la pantalla el boton de la calculadora que toquemos

const valorPantalla = document.getElementById('pantalla').value


function agregar(valor){
    document.getElementById('pantalla').value += valor
}

//esto borra el valor que esta en la pantalla
function borrar(valor){
    document.getElementById('pantalla').value = ''
}




//esta accion toma el valor de la pantalla y ejecuta los calculos
function calcular(){
    const valorPantalla = document.getElementById('pantalla').value
    const resultado = eval(valorPantalla);
    document.getElementById('pantalla').value = resultado
    
    //valores a imprimir em pantalla
    const subtotal = (resultado) / 1.19;
    const iva = subtotal * 0.19;
    const total = resultado;

    const valorSubtotal = subtotal;
    const valorIva = iva;
    const valorTotal = total;

    //Convertimos el valor en pantalla a pesos Colombianos
    const copSubtotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorSubtotal)

    const copIva = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorIva)

    const copTotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorTotal)

    //imprimir valores dentro de html 

    document.getElementById('valor-subtotal').innerHTML = `<p>Subtotal: ${copSubtotal}</p>`
    document.getElementById('valor-iva').innerHTML = `<p>Iva: ${copIva}</p>`
    document.getElementById('valor-total').innerHTML = `<p>Total: ${copTotal}</p>`

}

//Controles adicionales

//Tecla Enter
const teclaEnter = document.getElementById('pantalla')
teclaEnter.addEventListener('keypress', function(evento){
    if(evento.key === 'Enter' || evento.keycode === 13){
        calcular()
    }
})


//RETENCIONES

//retefuente

function reteFuente(){
    const valorPantalla = document.getElementById('pantalla').value;
    const resultado = eval(valorPantalla);


    //valores a imprimir em pantalla
    const subtotal = (resultado) / 1.19;
    const iva = subtotal * 0.19;
    const total = resultado;
    const retefuente = subtotal * 0.025;

    
    const valorSubtotal = subtotal;
    const valorIva = iva;
    const valorTotal = total;
    const valorRetefuente = retefuente
    
    
    //Mostrar el valor en la pantalla de la calculadora
    const totalNeto = resultado - retefuente
    const valorTotalNeto = totalNeto

    //formatear valor en pantalla
    const valorFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0 // Cambia a 2 si necesitas mostrar centavos    
    }).format(totalNeto);

    document.getElementById('pantalla').value = valorFormateado;

    //Convertimos el valor en pantalla a pesos Colombianos

    //subtotal en pantalla
    const copSubtotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorSubtotal)

    //iva en pantalla    
    const copIva = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorIva)

    //total en pantalla
    const copTotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorTotal)

    //total neto en pantalla
    const copTotalNeto = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorTotalNeto)

    //retefuente en pantalla
    const copRetefuente = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorRetefuente)

    //imprimir valores dentro de html 

    document.getElementById('valor-subtotal').innerHTML = `<p>Subtotal: ${copSubtotal}</p>`
    document.getElementById('valor-iva').innerHTML = `<p>Iva: ${copIva}</p>`
    document.getElementById('valor-total').innerHTML = `<p>Total: ${copTotal}</p>`

    document.getElementById('valor-retefuente').innerHTML = `<p>Retefuente: ${copRetefuente}</p>`
    document.getElementById('valor-total-neto').innerHTML = `<p>Total Neto: ${copTotalNeto}</p>`

}



function reteFuenteIva(){
    const valorPantalla = document.getElementById('pantalla').value;
    const resultado = eval(valorPantalla);
    
     //valores a imprimir em pantalla
    const subtotal = (resultado) / 1.19;
    const iva = subtotal * 0.19;
    const total = resultado;
    const retefuente = subtotal * 0.025;
    const reteiva = iva * 0.15;
    const totalNeto = resultado - retefuente - reteiva



    const valorSubtotal = subtotal;
    const valorIva = iva;
    const valorTotal = total;
    const valorRetefuente = retefuente
    const valorReteiva = reteiva;
    const valorTotalNeto = totalNeto

    const valorFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0 // Cambia a 2 si necesitas mostrar centavos
    }).format(totalNeto);

    document.getElementById('pantalla').value = valorFormateado;
  

    //Convertimos el valor en pantalla a pesos Colombianos

    //subtotal en pantalla
    const copSubtotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorSubtotal)

    //iva en pantalla    
    const copIva = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorIva)

    //total en pantalla
    const copTotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorTotal)

    //retefuente en pantalla
    const copRetefuente = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorRetefuente)

    //reteiva en pantalla
    const copReteiva = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorReteiva)

    //valor total neto en pantalla
    const copTotalNeto = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorTotalNeto);

    //imprimir valores dentro de html 

    document.getElementById('valor-subtotal').innerHTML = `<p>Subtotal: ${copSubtotal}</p>`
    document.getElementById('valor-iva').innerHTML = `<p>Iva: ${copIva}</p>`
    document.getElementById('valor-total').innerHTML = `<p>Total: ${copTotal}</p>`

    document.getElementById('valor-retefuente').innerHTML = `<p>Retefuente: ${copRetefuente}</p>`
    document.getElementById('valor-reteiva').innerHTML = `<p>Reteiva: ${copReteiva}</p>`
    document.getElementById('valor-total-neto').innerHTML = `<p>Total Neto: ${copTotalNeto}</p>`
}   

function totalRetenciones(){

    const valorPantalla = document.getElementById('pantalla').value;
    const resultado = eval(valorPantalla);
    
     //valores a imprimir em pantalla
    const subtotal = (resultado) / 1.19;
    const iva = subtotal * 0.19;
    const total = resultado;
    const retefuente = subtotal * 0.025;
    const reteiva = iva * 0.15;
    const reteica = subtotal * 0.0125;
    const totalNeto = resultado - retefuente - reteiva - reteica



    const valorSubtotal = subtotal;
    const valorIva = iva;
    const valorTotal = total;
    const valorRetefuente = retefuente
    const valorReteiva = reteiva;
    const valorReteica = reteica;
    const valorTotalNeto = totalNeto

    const valorFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0 // Cambia a 2 si necesitas mostrar centavos
    }).format(totalNeto);

    document.getElementById('pantalla').value = valorFormateado;



    //Convertimos el valor en pantalla a pesos Colombianos

    //subtotal en pantalla
    const copSubtotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorSubtotal)

    //iva en pantalla    
    const copIva = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorIva)

    //total en pantalla
    const copTotal = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorTotal)

    //retefuente en pantalla
    const copRetefuente = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorRetefuente)

    //reteiva en pantalla
    const copReteiva = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorReteiva)

    //reteica en pantalla
    const copReteica = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorReteica)

    //valor total neto en pantalla
    const copTotalNeto = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valorTotalNeto);

    //imprimir valores dentro de html 

    document.getElementById('valor-subtotal').innerHTML = `<p>Subtotal: ${copSubtotal}</p>`
    document.getElementById('valor-iva').innerHTML = `<p>Iva: ${copIva}</p>`
    document.getElementById('valor-total').innerHTML = `<p>Total: ${copTotal}</p>`

    document.getElementById('valor-retefuente').innerHTML = `<p>Retefuente: ${copRetefuente}</p>`
    document.getElementById('valor-reteiva').innerHTML = `<p>Reteiva: ${copReteiva}</p>`
    document.getElementById('valor-reteica').innerHTML = `<p>Reteica: ${copReteica}</p>`
    document.getElementById('valor-total-neto').innerHTML = `<p>Total Neto: ${copTotalNeto}</p>`

}   


