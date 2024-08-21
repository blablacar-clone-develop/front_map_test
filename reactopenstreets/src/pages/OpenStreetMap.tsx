import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/OpenStreetMap.css';

const OpenStreetMap: React.FC = () => {
    useEffect(() => {
        if (L.DomUtil.get('osmMap')?.hasChildNodes()) {
            const mapContainer = L.DomUtil.get('osmMap');
            if (mapContainer) {
                mapContainer._leaflet_id = null;
            }
        }

        const map = L.map('osmMap').setView([51.505, -0.09], 13);

        // Темна тема CartoDB Dark Matter
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

        const marker = L.marker([51.505, -0.09]).addTo(map);
        marker.bindPopup(
            `<div style="text-align:center;">
        <strong>Dark theme</strong><br>
       
      </div>`,
            { closeButton: false, minWidth: 150 }
        );

        marker.openPopup();

        setTimeout(() => {
            marker.setLatLng([51.51, -0.1]);
            marker.openPopup();
        }, 2000);

        return () => {
            map.remove();
        };
    }, []);

    return <div id="osmMap" className="map"></div>;
};

export default OpenStreetMap;
