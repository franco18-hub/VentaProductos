function ObtenerProductosDropdown() {
    fetch('https://localhost:7248/Productos')
        .then(response => response.json())
        .then(async data => {
            localStorage.setItem("productos", JSON.stringify(data));
        })
        .catch(error => console.log("No se pudo acceder al servicio.", error));
}



function FiltrarDropdownProductos(producto, todosProductos) {
    todosProductos = JSON.parse(todosProductos);

    if (producto != null) {
        $('#IdProductoDetalle').empty();

        const productoFiltrados = todosProductos.filter(todosProductosItem =>
            !producto.find(productoItem => productoItem.idProducto === todosProductosItem.id)
        );

        console.log("Productos filtrados: ", productoFiltrados);

        $.each(productoFiltrados, function (index, item) {
            $('#IdProductoDetalle').append(
                "<option value='" + item.id + "'>" + item.nombreProducto + "</option>"
            )
        })
    }
}








