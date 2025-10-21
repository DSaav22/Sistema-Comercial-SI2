import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrige íconos en Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export const ModalPago = ({ isOpen, onClose, onConfirmarPago }) => {
    const [direccion, setDireccion] = useState('');
    const [posicion, setPosicion] = useState(null); // Empieza sin selección
    const [error, setError] = useState('');

    const ManejadorMapa = () => {
        useMapEvents({
            click(e) {
                setPosicion(e.latlng);
            },
        });
        return null;
    };

    const handleConfirmar = () => {
        if (!direccion.trim()) {
            setError('Por favor ingresa una dirección.');
            return;
        }
        if (!posicion) {
            setError('Por favor selecciona un punto en el mapa.');
            return;
        }
        setError('');
        onConfirmarPago({ direccion, latitud: posicion.lat, longitud: posicion.lng });
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar Dirección de Entrega</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label className="form-label">Dirección:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ubicación en el Mapa:</label>
                            <MapContainer
                                center={{ lat: -17.7833, lng: -63.1821 }}
                                zoom={13}
                                style={{ height: '300px', width: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <ManejadorMapa />
                                {posicion && <Marker position={posicion} />}
                            </MapContainer>
                        </div>

                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}

                        <div className="text-center mt-3">
                            <button className="btn btn-success" onClick={handleConfirmar}>
                                Confirmar y Pagar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
