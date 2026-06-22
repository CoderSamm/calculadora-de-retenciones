function obtenerTotalDesdePantalla() {
    const pantalla = document.getElementById('pantalla');
    const valorPantalla = pantalla.value;

    // validar vacío
    if (!valorPantalla || valorPantalla.trim() === '') {
        return null; // 👈 NO forzamos a cero
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


//Añadimos acumulables en caso queramos sacar retenciones una a una 

let estadoCalculo = {
    total: null,
    subtotal: 0,
    iva: 0,
    retefuente: 0,
    reteiva: 0,
    reteica: 0
}

//memoria de resultados
function inicializarEstado(){
    const total = obtenerTotalDesdePantalla()
    if(total === null) return;

    if(estadoCalculo.total !== total){
        const {subtotal, iva} = calcularBase(total);

        estadoCalculo = {
            total: total,
            subtotal: subtotal,
            iva: iva,
            retefuente: 0,
            reteiva: 0,
            reteica: 0
        }
    }
    return estadoCalculo;
}

//Funcion para mostrar resultados en pantalla

function renderizarEstado(){
    const totalRetenciones = 
    estadoCalculo.retefuente +
    estadoCalculo.reteiva +
    estadoCalculo.reteica;

    const totalNeto = estadoCalculo.total - totalRetenciones;

    const datos = crearDatosBase({
        total: estadoCalculo.total,
        subtotal: estadoCalculo.subtotal,
        iva: estadoCalculo.iva
    })

    
    if (estadoCalculo.retefuente > 0) {
        datos.push({
            id: 'valor-retefuente',
            etiqueta: 'ReteFuente',
            valor: estadoCalculo.retefuente
        });
    }

    if(estadoCalculo.reteiva > 0){
        datos.push({
            id: 'valor-reteiva',
            etiqueta: 'ReteIva',
            valor: estadoCalculo.reteiva
        });
    }
    if(estadoCalculo.reteica > 0){
        datos.push({
            id: 'valor-reteica',
            etiqueta: 'ReteIca',
            valor: estadoCalculo.reteica
        });
    }

    datos.push({
        id: 'valor-total-neto',
        etiqueta: 'Total Neto',
        valor: totalNeto
    })

    renderizarResultados(datos)

}

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
    limpiarCamposResultados(); // 👈 LIMPIA ANTES
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

//agregamos la opcion para guardarla en memoria
function reteFuente(){
    const estado = inicializarEstado();

    if(!estado) return;

    const {retefuente} = calcularRetenciones(estado.total)

    estadoCalculo.retefuente = retefuente
    renderizarEstado(); // 👈 CLAVE 
}

function reteIva() {
    const estado = inicializarEstado();
    if(!estado) return;

    const {reteiva} = calcularRetenciones(estado.total)

    estadoCalculo.reteiva = reteiva
    renderizarEstado()

}

function reteIca() {
    const estado = inicializarEstado();
    if(!estado) return;

    const {reteica} = calcularRetenciones(estado.total);

    estadoCalculo.reteica = reteica
    renderizarEstado();
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

function limpiarCamposResultados() {
    Object.values(elementos).forEach(elemento => {
        if (elemento) {
            elemento.textContent = '';
        }
    });
}

function limpiarTodo(){

    const pantalla = document.getElementById('pantalla');
    pantalla.value = '';

    estadoCalculo = {
        total: null,
        subtotal: 0,
        iva: 0,
        retefuente: 0,
        reteiva: 0,
        reteica: 0
    };

    limpiarCamposResultados(); // 👈 aseguras que todo quede limpio
}
