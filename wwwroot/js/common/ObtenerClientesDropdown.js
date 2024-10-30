function ObtenerClientesDropdown() {
    fetch("https://localhost:7248/Clientes")
        .then(response => response.json())
        .then(data => CompletarDropdown(data))
        .catch(error => console.log("No se pudo acceder al servicio.", error));
}

function CompletarDropdown(data) {
    let bodySelect = document.getElementById('IdCliente');
    bodySelect.innerHTML = '';
    let bodySelect2 = document.getElementById('IdClienteEditar');
    bodySelect2.innerHTML = '';

    data.forEach(element => {
        opt = document.createElement("option");
        opt.value = element.id;
        opt.text = element.nombreCliente
        opt.dataset.tieneVentaActiva = element.tieneVentaActiva;

        bodySelect.add(opt);


        opt2 = document.createElement("option");
        opt2.value = element.id;
        opt2.text = element.nombreCliente
        opt2.dataset.tieneVentaActiva = element.tieneVentaActiva;

        bodySelect2.add(opt2);
    });
}

