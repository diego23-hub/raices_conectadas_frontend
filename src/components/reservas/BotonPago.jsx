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
            setMensaje('El pago fue rechazado, intenta de nuevo');
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