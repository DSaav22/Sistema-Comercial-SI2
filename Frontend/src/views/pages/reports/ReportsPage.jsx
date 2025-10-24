import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import ecommerceApi from '../../../api/ecommerceApi';

export const ReportsPage = () => {
    const [promptText, setPromptText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);

    const {
        transcript,
        resetTranscript,
        listening,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable
    } = useSpeechRecognition();

    // Ejemplos de prompts
    const examplePrompts = [
        "Quiero un reporte de ventas del mes de septiembre, agrupado por producto, en PDF",
        "Reporte en Excel del 01/10/2024 al 31/10/2024 con nombre del cliente y monto total",
        "Genera un reporte PDF de las ventas del último mes",
        "Necesito un reporte en Excel agrupado por cliente con la cantidad de compras",
    ];

    // Manejar inicio de grabación de voz
    const handleStartListening = () => {
        resetTranscript();
        SpeechRecognition.startListening({ 
            continuous: true,
            language: 'es-ES' 
        });
        setIsListening(true);
    };

    // Manejar detención de grabación
    const handleStopListening = () => {
        SpeechRecognition.stopListening();
        setIsListening(false);
        if (transcript) {
            setPromptText(transcript);
        }
    };

    // Función principal para generar el reporte
    const handleGenerateReport = async () => {
        if (!promptText.trim()) {
            toast.error('Por favor, ingrese un prompt de texto o grabe con voz');
            return;
        }

        setLoading(true);

        try {
            // Hacer la petición al backend
            const response = await ecommerceApi.post(
                '/reports/generate/',
                { prompt: promptText },
                { 
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Extraer el nombre del archivo del header Content-Disposition
            let filename = 'reporte_ventas.pdf';
            const contentDisposition = response.headers['content-disposition'];
            
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            // Descargar el archivo usando file-saver
            saveAs(response.data, filename);
            
            toast.success('¡Reporte generado exitosamente!');
            
        } catch (error) {
            console.error('Error al generar el reporte:', error);
            
            if (error.response) {
                // El servidor respondió con un error
                if (error.response.data instanceof Blob) {
                    // Convertir el blob de error a texto
                    const text = await error.response.data.text();
                    try {
                        const errorData = JSON.parse(text);
                        toast.error(errorData.error || 'Error al generar el reporte');
                    } catch {
                        toast.error('Error al generar el reporte');
                    }
                } else {
                    toast.error(error.response.data.error || 'Error al generar el reporte');
                }
            } else if (error.request) {
                toast.error('No se pudo conectar con el servidor');
            } else {
                toast.error('Error al procesar la solicitud');
            }
        } finally {
            setLoading(false);
        }
    };

    // Usar un ejemplo de prompt
    const useExample = (example) => {
        setPromptText(example);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="card shadow-lg">
                        <div className="card-header bg-primary text-white">
                            <h2 className="mb-0">
                                <i className="fa fa-file-text-o me-2"></i>
                                Generador de Reportes Dinámicos
                            </h2>
                        </div>
                        <div className="card-body p-4">
                            {/* Descripción */}
                            <div className="alert alert-info mb-4">
                                <strong>
                                    <i className="fa fa-info-circle me-2"></i>
                                    ¿Cómo funciona?
                                </strong>
                                <p className="mb-0 mt-2">
                                    Escribe o dicta lo que necesitas en lenguaje natural. Por ejemplo:
                                    "Quiero un reporte de ventas del mes de octubre en PDF" o 
                                    "Genera un Excel con las ventas agrupadas por cliente".
                                </p>
                            </div>

                            {/* Ejemplos */}
                            <div className="mb-4">
                                <h5 className="mb-3">
                                    <i className="fa fa-lightbulb-o me-2"></i>
                                    Ejemplos de prompts:
                                </h5>
                                <div className="row">
                                    {examplePrompts.map((example, index) => (
                                        <div key={index} className="col-md-6 mb-2">
                                            <div 
                                                className="alert alert-secondary mb-2 cursor-pointer"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => useExample(example)}
                                            >
                                                <small>
                                                    <i className="fa fa-hand-pointer-o me-2"></i>
                                                    {example}
                                                </small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Área de texto */}
                            <div className="mb-4">
                                <label htmlFor="promptText" className="form-label">
                                    <strong>Tu solicitud:</strong>
                                </label>
                                <textarea
                                    id="promptText"
                                    className="form-control"
                                    rows="5"
                                    placeholder="Ejemplo: Quiero un reporte en PDF de las ventas del último mes agrupado por producto"
                                    value={promptText}
                                    onChange={(e) => setPromptText(e.target.value)}
                                    disabled={loading}
                                />
                                {transcript && listening && (
                                    <div className="mt-2 p-2 bg-light border rounded">
                                        <small className="text-muted">
                                            <i className="fa fa-microphone text-danger me-2"></i>
                                            Escuchando: {transcript}
                                        </small>
                                    </div>
                                )}
                            </div>

                            {/* Botones de acción */}
                            <div className="d-flex gap-2 flex-wrap">
                                {/* Botón de voz */}
                                {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
                                    <>
                                        {!isListening ? (
                                            <button
                                                className="btn btn-success"
                                                onClick={handleStartListening}
                                                disabled={loading}
                                            >
                                                <i className="fa fa-microphone me-2"></i>
                                                Grabar con Voz
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-danger"
                                                onClick={handleStopListening}
                                            >
                                                <i className="fa fa-stop me-2"></i>
                                                Detener Grabación
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <button className="btn btn-secondary" disabled>
                                        <i className="fa fa-microphone-slash me-2"></i>
                                        Reconocimiento de voz no disponible
                                    </button>
                                )}

                                {/* Botón generar reporte */}
                                <button
                                    className="btn btn-primary"
                                    onClick={handleGenerateReport}
                                    disabled={loading || !promptText.trim()}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Generando reporte...
                                        </>
                                    ) : (
                                        <>
                                            <i className="fa fa-download me-2"></i>
                                            Generar Reporte
                                        </>
                                    )}
                                </button>

                                {/* Botón limpiar */}
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => {
                                        setPromptText('');
                                        resetTranscript();
                                    }}
                                    disabled={loading}
                                >
                                    <i className="fa fa-eraser me-2"></i>
                                    Limpiar
                                </button>
                            </div>

                            {/* Información adicional */}
                            <div className="mt-4">
                                <hr />
                                <h6 className="mb-3">
                                    <i className="fa fa-question-circle me-2"></i>
                                    Formatos soportados:
                                </h6>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="fa fa-file-pdf-o text-danger me-2 fa-2x"></i>
                                            <div>
                                                <strong>PDF</strong>
                                                <br />
                                                <small className="text-muted">
                                                    Para visualización e impresión
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center mb-2">
                                            <i className="fa fa-file-excel-o text-success me-2 fa-2x"></i>
                                            <div>
                                                <strong>Excel</strong>
                                                <br />
                                                <small className="text-muted">
                                                    Para análisis de datos
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
