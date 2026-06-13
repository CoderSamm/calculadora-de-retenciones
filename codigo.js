function obtenerTotalDesdePantalla() {
    const pantalla = document.getElementById('pantalla');
    const valorPantalla = pantalla.value;

    // validar vacío
    if (!valorPantalla || valorPantalla.trim() === '') {
        pantalla.value = '0';
        return null;
    }

    // calcular
    const total = eval(valorPantalla);

    // validar resultado
    if (isNaN(total) || !isFinite(total)) {
        pantalla.value = 'Error';
        return null;
    }
    pantalla.value = total;
    return total;
}


const copFormat = new Intl.NumberFormat('es-CO',{
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

const elementos = {
    'valor-subtotal': document.getElementById('valor-subtotal'),
    'valor-iva': document.getElementById('valor-iva'),
    'valor-total': document.getElementById('valor-total'),
    'valor-retefuente': document.getElementById('valor-retefuente'),
    'valor-reteiva': document.getElementById('valor-reteiva'),
    'valor-reteica': document.getElementById('valor-reteica'),
    'valor-total-neto': document.getElementById('valor-total-neto')
};

function calcularBase(total) {
    const subtotal = total / 1.19;
    const iva = subtotal * 0.19;

    return { subtotal, iva };
}

function calcularRetenciones(total) {
    const { subtotal, iva } = calcularBase(total);

    const retefuente = subtotal * 0.025;
    const reteiva = iva * 0.15;
    const reteica = subtotal * 0.0125;

    return {
        subtotal,
        iva,
        retefuente,
        reteiva,
        reteica
    };
}


function crearDatosBase({total, subtotal, iva}) {
    return [
        { id: 'valor-subtotal', etiqueta: 'Subtotal', valor: subtotal },
        { id: 'valor-iva', etiqueta: 'IVA', valor: iva },
        { id: 'valor-total', etiqueta: 'Total', valor: total }
    ];
}

function renderizarResultados(datos){
    datos.forEach(item => {
        const elemento = elementos[item.id];
        if (!elemento) return;

        const valorSeguro = (!isFinite(item.valor) || isNaN(item.valor)) ? 0 : item.valor;

        elemento.textContent = `${item.etiqueta}: ${copFormat.format(valorSeguro)}`;
    });
}



function calcular(){

    const total = obtenerTotalDesdePantalla();
    if(total === null)return;

    const {subtotal, iva} = calcularBase(total);
    const datos = crearDatosBase({total, subtotal, iva});

    renderizarResultados(datos)
}

//Tecla Enter
const teclaEnter = document.getElementById('pantalla')
teclaEnter.addEventListener('keydown', function(evento){
    if(evento.key === 'Enter'){
        calcular()
    }
})

//RETENCIONES

//RETENCION EN LA FUENTE

function reteFuente(){
    const total = obtenerTotalDesdePantalla();
    if(total === null)return;

   const {
    subtotal,
    iva,
    retefuente
    } = calcularRetenciones(total);

    const totalNeto = total - retefuente

    const datos = crearDatosBase({total, subtotal, iva});

     datos.push (
        { id: 'valor-retefuente', etiqueta: 'ReteFuente', valor: retefuente },
        { id: 'valor-total-neto', etiqueta: 'Total Neto', valor: totalNeto }
     )
       
    renderizarResultados(datos);

}

function reteFuenteIva(){
    const total = obtenerTotalDesdePantalla();
    if(total === null)return;

   const {
    subtotal,
    iva,
    retefuente,
    reteiva
    } = calcularRetenciones(total)

    const totalNeto = total - retefuente - reteiva

      const datos = crearDatosBase({total, subtotal, iva});

     datos.push (
        { id: 'valor-retefuente', etiqueta: 'ReteFuente', valor: retefuente },
        { id: 'valor-reteiva', etiqueta: 'ReteIva', valor: reteiva },
        { id: 'valor-total-neto', etiqueta: 'Total Neto', valor: totalNeto }
     )
       

    renderizarResultados(datos);
}   

function totalRetenciones(){
    const total = obtenerTotalDesdePantalla();
    if(total === null)return;

   const {
    subtotal,
    iva,
    retefuente,
    reteiva,
    reteica,
    } = calcularRetenciones(total)

    const totalNeto = total - retefuente - reteiva - reteica

   const datos = crearDatosBase({total, subtotal, iva});

     datos.push (
        { id: 'valor-retefuente', etiqueta: 'ReteFuente', valor: retefuente },
        { id: 'valor-reteiva', etiqueta: 'ReteIva', valor: reteiva },
        { id: 'valor-reteica', etiqueta: 'ReteIca', valor: reteica },
        { id: 'valor-total-neto', etiqueta: 'Total Neto', valor: totalNeto }
     )

    renderizarResultados(datos);
}   

//LIMPIAR PANTALLA Y RESULTADOS

function limpiarTodo(){

    //limpiar pantalla de calculadora
    const pantalla = document.getElementById('pantalla');
    pantalla.value = ''

    //limpiar resultados

    Object.values(elementos).forEach(elemento=> {
        elemento.textContent = '';
    })
}