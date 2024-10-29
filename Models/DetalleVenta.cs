using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class DetalleVenta
{
    public int Id { get; set; }
    public int IdProducto { get; set; }    
    public ICollection <Producto>? Producto { get; set; }
    public int IdVenta { get; set; }
    public Venta? Venta { get; set; }
}