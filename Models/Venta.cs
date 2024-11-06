using System.ComponentModel.DataAnnotations;

namespace VentaProductos.Models;

public class Venta
{
    public int Id { get; set; }
    public DateTime FechaVenta { get; set; }    
    public bool Finalizada { get; set; }
    public int ClienteId { get; set; }
    public virtual Cliente? Clientes { get; set; }
    public virtual ICollection<DetalleVenta>? DetalleVentas{ get; set; }
    
}