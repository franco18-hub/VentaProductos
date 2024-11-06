using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class DetalleVenta
{
    public int Id { get; set; }
    public int ProductoId { get; set; }    
    public virtual Producto? Productos { get; set; }
    public int VentaId { get; set; }
    public virtual Venta? Ventas { get; set; }
}