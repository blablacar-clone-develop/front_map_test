import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/OpenStreetMap.css';

const OpenStreetMap: React.FC = () => {
    useEffect(() => {
        // Перевірка наявності попередньої ініціалізації карти
        if (L.DomUtil.get('osmMap')?.hasChildNodes()) {
            const mapContainer = L.DomUtil.get('osmMap');
            if (mapContainer) {
                mapContainer._leaflet_id = null;
            }
        }

        const map = L.map('osmMap').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Кастомний маркер з простим спливаючим вікном
        const marker = L.marker([51.505, -0.09]).addTo(map);

        marker.bindPopup(
            `<div style="text-align:center;">
        <strong>HIIIIII</strong><br>
      </div>`,
            { closeButton: false, minWidth: 150 }
        );

        // Відкрити спливаюче вікно автоматично при завантаженні карти
        marker.openPopup();

        // Очистка карти при розмонтуванні компонента
        return () => {
            map.remove();
        };
    }, []);

    return <div id="osmMap" className="map"></div>;
};

export default OpenStreetMap;
