import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from '@googlemaps/js-api-loader';

const ShowPick: React.FC = () => {
    const [showMap, setShowMap] = useState(false);
    const [myLatitude, setMyLatitude] = useState<number | null>(null);
    const [myLongitude, setMyLongitude] = useState<number | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "KeyNOTfound";
    const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAPS_ID || "IdNOTfound";

    const toggleMap = () => {
        setShowMap(prevState => !prevState);
    };

    useEffect(() => {
        if (showMap) {
            const loader = new Loader({
                apiKey: API_KEY,
                version: 'weekly',
                libraries: ['places', 'marker'], // 'geocode' не потрібен тут
            });

            loader.load().then(() => {
                if (searchInputRef.current && window.google) {
                    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
                        types: ['geocode'],
                    });

                    const map = new window.google.maps.Map(mapRef.current!, {
                        zoom: 9,
                        center: { lat: 0, lng: 0 }, // Початковий центр карти
                        gestureHandling: 'greedy',
                        disableDefaultUI: true,
                        mapId: MAP_ID
                    });

                    const marker = new window.google.maps.marker.AdvancedMarkerElement({
                        map,
                        position: { lat: 0, lng: 0 }, // Початкова позиція маркера
                    });

                    autocomplete.addListener('place_changed', () => {
                        const place = autocomplete.getPlace();
                        if (place.geometry) {
                            const location = place.geometry.location!;
                            setMyLatitude(location.lat());
                            setMyLongitude(location.lng());

                            map.setCenter(location);
                            marker.position = location; // Оновлення позиції маркера

                            // Виконання reverse geocoding для отримання країни і міста
                            const geocoder = new window.google.maps.Geocoder();
                            geocoder.geocode({ location }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                                if (status === 'OK' && results[0]) {
                                    const addressComponents = results[0].address_components;
                                    const countryComponent = addressComponents.find(component => component.types.includes('country'));
                                    const cityComponent = addressComponents.find(component => component.types.includes('locality'));

                                    setCountry(countryComponent?.long_name || 'Unknown');
                                    setCity(cityComponent?.long_name || 'Unknown');
                                } else {
                                    console.error('Geocoder failed due to: ' + status);
                                }
                            });
                        }
                    });
                }
            }).catch(e => {
                console.error('Failed to load Google Maps API:', e);
            });
        }
    }, [showMap]);

    return (
        <main className="section">
            <Container>
                <Row className="mt-5">
                    <Col className="text-center">
                        <h1 className="display-4">Смотрим пик геолокации из поля</h1>
                        <p className="lead">Нижче поле для пошуку</p>

                        <Button variant="primary" onClick={toggleMap}>
                            {showMap ? 'Скрыть карту' : 'Посмотреть'}
                        </Button>

                        {showMap && (
                            <>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Пошук місцезнаходження"
                                    style={{ width: '100%', marginBottom: '10px', border: '1px solid red' }}
                                />

                                <div ref={mapRef} style={{ width: '100%', height: '500px' }} />

                                {myLatitude !== null && myLongitude !== null && (
                                    <p className="lead">
                                        Ці координати ми отримали із рядку пошуку <br />
                                        Latitude: {myLatitude}; <br />
                                        Longitude: {myLongitude} <br />
                                        Країна: {country} <br />
                                        Місто: {city}
                                    </p>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
                <Button variant="primary" href="/">Вернуться</Button>
            </Container>
        </main>
    );
};

export default ShowPick;
