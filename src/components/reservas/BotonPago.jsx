import { useState } from 'react';
import { simularPago } from '../../services/pagoService';

function BotonPago({ reserva, alPagar }) {
    const [metodo, setMetodo] = useState('tarjeta');
    const [procesando, setProcesando] = useState(false);
    const [mensaje, setMensaje] = useState('');

    const pagar = async () => {
        setProcesando(true);
        setMensaje('');
        try {
            await simularPago(reserva, metodo);
            setMensaje('¡Pago aprobado!');
            if (alPagar) alPagar();
        } catch (error) {
            // Si el error del servidor indica que el pago fue rechazado específicamente
            if (error.message && error.message.toLowerCase().includes('rechazado')) {
                setMensaje('El pago fue rechazado, intenta de nuevo');
            } else {
                // Para errores de red, token vencido (401), etc., mostramos el mensaje real
                setMensaje(error.message || 'Ocurrió un error inesperado al procesar el pago');
            }
        } finally {
            setProcesando(false);
        }
    };

    return (
        <div className="boton-pago">
            <select
                value={metodo}
                onChange={(e) => setMetodo(e.target.value)}
                disabled={procesando}
            >
                <option value="tarjeta">Tarjeta</option>
                <option value="pse">PSE</option>
                <option value="nequi">Nequi</option>
            </select>

            <button onClick={pagar} disabled={procesando}>
                {procesando
                    ? 'Procesando pago...'
                    : `Pagar $${reserva.total.toLocaleString('es-CO')}`}
            </button>

            {mensaje && <small>{mensaje}</small>}
        </div>
    );
}

export default BotonPago;