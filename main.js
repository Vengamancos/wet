'use strict'

const nav = document.querySelector('.nav');
const abrir = document.querySelector('#Abrir-menu');
const cerrar = document.querySelector('#Cerrar-menu');

abrir.addEventListener('click', () => {
    nav.classList.add('visible');
});

cerrar.addEventListener('click', () => {
    nav.classList.remove('visible');
});




// Selección de platos con presión prolongada
const platos = document.querySelectorAll('.plato');




//Seccion de repositorio de codigo para el boton de pedir

// Crear el botón "Pedir" y ocultarlo inicialmente
let botonPedido = document.createElement('button');
botonPedido.textContent = 'Pedir';
botonPedido.id = 'boton-pedido';
botonPedido.style.position = 'fixed';
botonPedido.style.bottom = '30px';
botonPedido.style.right = '30px';
botonPedido.style.zIndex = '9999';
botonPedido.style.padding = '1rem 2rem';
botonPedido.style.background = '#28a745';
botonPedido.style.color = '#fff';
botonPedido.style.border = 'none';
botonPedido.style.borderRadius = '10px';
botonPedido.style.fontSize = '1.2rem';
botonPedido.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
botonPedido.style.display = 'none';
document.body.appendChild(botonPedido);

// Crear el contador de platos seleccionados :v
let contador = document.createElement('span');
contador.id = 'contador-platos';
contador.style.marginLeft = '10px';
contador.style.fontWeight = 'bold';
contador.style.fontSize = '1rem';
botonPedido.appendChild(contador);

function actualizarBotonPedido() {
    const seleccionados = document.querySelectorAll('.plato.seleccionado').length;
    if (seleccionados > 0) {
        botonPedido.style.display = 'block';
        contador.textContent = ` (${seleccionados})`;
    } else {
        botonPedido.style.display = 'none';
        contador.textContent = '';
    }
}

platos.forEach(plato => {
    let presionado = false;
    let timeoutId;

    plato.addEventListener('mousedown', () => {
        presionado = true;
        timeoutId = setTimeout(() => {
            if (presionado) {
                plato.classList.toggle('seleccionado');
                actualizarBotonPedido();
            }
        }, 250); // 250 milisegundos de presión
    });

    plato.addEventListener('mouseup', () => {
        presionado = false;
        clearTimeout(timeoutId);
    });

    plato.addEventListener('mouseleave', () => {
        presionado = false;
        clearTimeout(timeoutId);
    });
});
// Fin de seccion de repositorio de codigo para el boton de pedir

// botonPedido.addEventListener('click', () => {
//     const seleccionados = document.querySelectorAll('.plato.seleccionado');
//     const nombres = Array.from(seleccionados).map(plato => plato.dataset.nombre);
//     alert(`Platos seleccionados: ${nombres.join(', ')}`);
// });



//Repositorio de ventana emergente
// Crear el div de ventana emergente y ocultarlo inicialmente
let ventanaEmergente = document.createElement('div');
ventanaEmergente.id = 'ventana-emergente';
ventanaEmergente.style.position = 'fixed';
ventanaEmergente.style.top = '50%';
ventanaEmergente.style.left = '50%';
ventanaEmergente.style.transform = 'translate(-50%, -50%)';
ventanaEmergente.style.background = '#fff';
ventanaEmergente.style.padding = '2rem';
ventanaEmergente.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3)';
ventanaEmergente.style.borderRadius = '12px';
ventanaEmergente.style.zIndex = '10000';
ventanaEmergente.style.display = 'none';
document.body.appendChild(ventanaEmergente);

// Botón para cerrar la ventana emergente
let cerrarVentana = document.createElement('button');
cerrarVentana.textContent = 'Cerrar';
cerrarVentana.style.marginTop = '1rem';
cerrarVentana.style.background = '#dc3545';
cerrarVentana.style.color = '#fff';
cerrarVentana.style.border = 'none';
cerrarVentana.style.padding = '0.5rem 1rem';
cerrarVentana.style.borderRadius = '6px';
cerrarVentana.style.cursor = 'pointer';

// Botón "Siguiente"
let siguienteVentana = document.createElement('button');
siguienteVentana.textContent = 'Siguiente';
siguienteVentana.style.marginTop = '1rem';
siguienteVentana.style.marginLeft = '1rem';
siguienteVentana.style.background = '#007bff';
siguienteVentana.style.color = '#fff';
siguienteVentana.style.border = 'none';
siguienteVentana.style.padding = '0.5rem 1rem';
siguienteVentana.style.borderRadius = '6px';
siguienteVentana.style.cursor = 'pointer';

ventanaEmergente.appendChild(cerrarVentana);
ventanaEmergente.appendChild(siguienteVentana);



cerrarVentana.addEventListener('click', () => {
    ventanaEmergente.style.display = 'none';
    ventanaEmergente.innerHTML = '';
    ventanaEmergente.appendChild(cerrarVentana);
    ventanaEmergente.appendChild(siguienteVentana);
});

siguienteVentana.addEventListener('click', () => {
    window.location.href = 'biografia.html'; 
});



botonPedido.addEventListener('click', () => {
    const seleccionados = document.querySelectorAll('.plato.seleccionado');
    const nombres = Array.from(seleccionados).map(plato => plato.dataset.nombre);
    const precios = Array.from(seleccionados).map(plato => Number(plato.dataset.price));



    ventanaEmergente.innerHTML = '<h1>Platos seleccionados</h1>';
    if (nombres.length > 0) {
        let lista = document.createElement('ul');
        nombres.forEach((nombre, i) => {
            let item = document.createElement('li');
            item.textContent = `${nombre} - $${precios[i].toFixed(2)}`;
            item.classList.add('texto');
            lista.appendChild(item);
        });
        ventanaEmergente.appendChild(lista);


        // Mostrar el total
        const total = precios.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        let totalElem = document.createElement('p');
        totalElem.style.fontWeight = 'bold';
        totalElem.textContent = `Total: $${total.toFixed(2)}`;
        ventanaEmergente.appendChild(totalElem);
    }
    ventanaEmergente.appendChild(cerrarVentana);
    ventanaEmergente.appendChild(siguienteVentana);
    ventanaEmergente.style.display = 'block';
});


