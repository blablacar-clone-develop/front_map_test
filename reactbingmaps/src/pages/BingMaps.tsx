import React, { useEffect } from 'react';
import styles from '../styles/bingMap.module.css';

// Типи для Bing Maps
declare const Microsoft: any;

const BingMap: React.FC = () => {
    useEffect(() => {
        const loadMap = () => {
            const map = new Microsoft.Maps.Map('#myMap', {
                credentials: 'Ваш API ключ тут',
                center: new Microsoft.Maps.Location(47.6062, -122.3321),
                mapTypeId: Microsoft.Maps.MapTypeId.road,
                zoom: 10,
            });

            // Додаткові налаштування карти, якщо потрібно
            const center = map.getCenter();
            const pin = new Microsoft.Maps.Pushpin(center, {
                title: 'Hello World',
                subTitle: 'Seattle, WA',
                text: '1',
            });
            map.entities.push(pin);
        };

        if (window.Microsoft && window.Microsoft.Maps) {
            loadMap();
        } else {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.bing.com/api/maps/mapcontrol?callback=loadMap`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            (window as any).loadMap = loadMap;
        }
    }, []);

    return <div id="myMap" className={styles.map} />;
};

export default BingMap;
