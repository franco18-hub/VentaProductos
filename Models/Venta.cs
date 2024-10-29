using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class Venta
{
    public int Id { get; set; }
    public DateTime FechaVenta { get; set; }    
    public bool Finalizada { get; set; }
    public int IdCliente { get; set; }
    public Cliente? Cliente { get; set; }

    public virtual ICollection<DetalleVenta>? DetalleVenta{ get; set; }
    
}