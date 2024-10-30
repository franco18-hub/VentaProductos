function ObtenerVentas() {
    fetch('https://localhost:7248/Ventas')
    .then(response => response.json())
    .then(data => MostrarVentas(data))
    .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function MostrarVentas(data) {
    let tbody = document.getElementById('todaslasVentas');
    tbody.innerHTML = '';

    data.forEach(element => {
        let tr = tbody.insertRow();

        let td0 = tr.insertCell(0);
        let tdId = document.createTextNode(element.id);
        td0.appendChild(tdId);

        let td1 = tr.insertCell(1);
        let tdFechaVenta = document.createTextNode(element.fechaVenta);
        td1.appendChild(tdFechaVenta);

        let td2 = tr.insertCell(2);
        let tdFinalizada = document.createTextNode(element.finalizada);
        td2.appendChild(tdFinalizada);

        let td3 = tr.insertCell(3);
        let tdIdCliente = document.createTextNode(element.idCliente);
        td3.appendChild(tdIdCliente);

//BOTONES PARA EDITAR Y BORRAR
        let btnEditar = document.createElement('button');
        btnEditar.innerText = 'Modificar';
        btnEditar.setAttribute('class', 'btn btn-info');
        btnEditar.setAttribute('onclick', `BuscarVentaId(${element.id})`);
        let td4 = tr.insertCell(4);
        td4.appendChild(btnEditar);

        let btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.setAttribute('class', 'btn btn-danger');
        btnEliminar.setAttribute('onclick', `EliminarVenta(${element.id})`);
        let td5 = tr.insertCell(5);
        td5.appendChild(btnEliminar);
        
        let btnVentaProductos = document.createElement('button');
        btnVentaProductos.innerText = 'Detalles';
        btnVentaProductos.setAttribute('class', 'btn btn-success');
        btnVentaProductos.setAttribute('onclick', `BuscarDetalleProductos(${element.id})`);
        let td6 = tr.insertCell(6);
        td6.appendChild(btnVentaProductos);
    });
}

function CrearVenta() {
    var FechaVenta = document.getElementById("FechaVenta").value;
    if (FechaVenta == "" || FechaVenta == null) {
        return mensajesError('#error', null, "Por favor ingrese la fecha para la Venta.");
    }
  
  
    var IdCliente = document.getElementById("IdCliente").value;
    if (IdCliente == "" || IdCliente == null) {
        return mensajesError('#error', null, "Por favor ingrese el cliente para la venta.");
    }

    let venta = {
        fechaVenta: document.getElementById("FechaVenta").value,
        finalizada: document.getElementById("Finalizada").checked,
        idCliente: document.getElementById("IdCliente").value,
        cliente: null ,
        detalleVenta: null
    };

    fetch('https://localhost:7248/Ventas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(venta)
        }
    )
    .then(response => response.json())
    .then(data =>{
        if(data.status == undefined){
            document.getElementById("FechaVenta").value = "";
            document.getElementById("Finalizada").checked = "";
            document.getElementById("IdCliente").value = 0;

            $('#error').empty();
            $('#error').attr("hidden",true);
            $('#modalAgregarVentas').modal('hide');
            ObtenerVentas();
        } 
        else {
            mensajesError('#error', data);
        }
            
    })
    .catch(error => console.log("Hubo un error al guardar el Producto nuevo, verifique el mensaje de error: ", error))
}


function EliminarVenta(id) {
    var siElimina = confirm("¿Esta seguro de borrar este Venta?.")
    if (siElimina == true) {
        EliminarSi(id);
    }
}

function EliminarSi(id) {
    fetch(`https://localhost:7248/Ventas/${id}`,
    {
        method: "DELETE"
    })
    .then(() => {
        ObtenerVentas();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function BuscarVentaId(id) {
    fetch(`https://localhost:7248/Ventas/${id}`,{
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("IdVenta").value = data.id;
        document.getElementById("FechaVentaEditar").value = data.fechaVenta;
        document.getElementById("FinalizadaEditar").checked = data.finalizada;
        document.getElementById("IdClienteEditar").value = data.idCliente;

        $('#modalEditarVentas').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error));
}


function EditarVenta() {
    let idVenta = document.getElementById("IdVenta").value;

    // var nombreProdEditar = document.getElementById("NombreEditar").value;
    // if (nombreProdEditar == "" || nombreProdEditar == null) {
    //     return mensajesError('#errorEditar', null, "Por favor ingrese un Nombre para el Producto Existente.");
    // }
    // var cantidadprod = document.getElementById("CantidadEditar").value;
    // if (cantidadprod == "" || cantidadprod == null) {
    //     return mensajesError('#errorEditar', null, "Por favor ingrese una Cantidad para el Producto Existente.");
    // }
    // var precioVentaProdEditar = document.getElementById("PrecioVentaEditar").value;
    // if (precioVentaProdEditar == "" || precioVentaProdEditar == null) {
    //     return mensajesError('#errorEditar', null, "Por favor ingrese un Precio-Venta para el Producto Existente.");
    // }
  
    // var precioCompraProdEditar = document.getElementById("PrecioCompraEditar").value;
    // if (precioCompraProdEditar == "" || precioCompraProdEditar == null) {
    //     return mensajesError('#errorEditar', null, "Por favor ingrese un Precio-Compra para el Producto Existente.");
    // }

    let editarVenta = {
        id: idVenta,
        fechaVenta: document.getElementById("FechaVentaEditar").value,
        cantidad: document.getElementById("FinalizadaEditar").checked,
        idCliente: document.getElementById("IdClienteEditar").value,
        cliente: null
    }

    fetch(`https://localhost:7248/Ventas/${idVenta}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editarVenta)
    })
    .then(data => {

            document.getElementById("IdVenta").value = 0;
            document.getElementById("FechaVentaEditar").value = "";
            document.getElementById("FinalizadaEditar").checked = "";
            document.getElementById("IdClienteEditar").value = 0;
           
            $('#errorEditar').empty();
            $('#errorEditar').attr("hidden",true);
            $('#modalEditarVentas').modal('hide');
            
            ObtenerVentas();
    })
    .catch(error => console.error("No se pudo acceder a la api, verifique el mensaje de error: ", error))
}


function mensajesError(id, data, mensaje) {
    $(id).empty();
    if (data != null) {
        $.each(data.errors, function(index, item) {
            $(id).append(
                "<ol>",
                "<li>" + item + "</li>",
                "</ol>"
            )
        })
    }
    else{
        $(id).append(
            "<ol>",
            "<li>" + mensaje + "</li>",
            "</ol>"
        )
    }
    
    $(id).attr("hidden", false);
}

// FUNCIONES PARA EL DETALLE

function BuscarDetalleProductos(id){
    fetch(`https://localhost:7248/DetallesVentas/${id}`, {
        method: "GET"
    }) 
        .then(response => response.json())
        .then(async data => {
            if(data != null || data != []){
                MostrarDetalleProductos(data);
                await ObtenerProductosDropdown();
                let todosProductos = localStorage.getItem('productos');
                await FiltrarDropdownProductos (data,todosProductos);
            }
            document.getElementById("IdDetalleVentas").value = id;
            $('modalDetalleVentas').modal('show');
        })
        .catch(error => console.error("No se pudo acceder a la api, verifique el error", error))
}

function MostrarDetalleProductos(data) {
    let tbody = document.getElementById('todosLosDetalles');
    tbody.innerHTML = '';

    data.forEach(element => {
        let filas = tbody.insertRow();

        let celda0 = filas.insertCell(0);
        let celdaProducto = document.createTextNode(element.nombreProducto);
        celda0.appendChild(celdaProducto);

        let btnModicar = document.createElement('button');
        btnModicar.innerText = 'Modificar';
        btnModicar.setAttribute('class', 'btn btn-info');
        btnModicar.setAttribute('onclick');
        let celda1 = filas.insertCell(1);
        celda1.appendChild(btnModicar);
        
        let btnBorrar = document.createElement('button');
        btnBorrar.innerText = 'Eliminar';
        btnBorrar.setAttribute('class', 'btn btn-danger');
        btnBorrar.setAttribute('onclick');
        let celda2 = filas.insertCell(2);
        celda2.appendChild(btnBorrar);

    });
}


function GuardarDetalle() {
    let IdDetalleVenta = document.getElementById("IdDetalleVentas").value;

    let guardarDetalle = {
        idProducto: document.getElementById("IdProductoDetalle").value,
        producto: null,
        idVenta: IdDetalleVenta,
        cliente: null,
    }
    console.log(guardarDetalle)

    fetch('https://localhost:7248/DetallesVentas',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(guardarDetalle)
        }
    )
        .then(response => response.json())
        .then(() => {
            document.getElementById("IdProductoDetalle").value = 0;

            $("#errorDetalle").empty();
            $("#errorDetalle").attr("hidden", true);

            BuscarDetalleProductos(IdDetalleVenta);
        })
        .catch(error => console.log("Hubo un error al guardar la Inscripcion, verifique el mensaje de error: ", error))
}
