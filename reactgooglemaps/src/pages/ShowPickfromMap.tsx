import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from '@googlemaps/js-api-loader';

const ShowPickFromMap: React.FC = () => {
    const [showMap, setShowMap] = useState(false);
    const [myLatitude, setMyLatitude] = useState<number | null>(null);
    const [myLongitude, setMyLongitude] = useState<number | null>(null);
    const [fullAddress, setFullAddress] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [city, setCity] = useState<string | null>(null);
    const [street, setStreet] = useState<string | null>(null);
    const [postalCode, setPostalCode] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);
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
                libraries: ['places', 'marker'],
            });

            loader.load().then(() => {
                if (window.google) {
                    const map = new window.google.maps.Map(mapRef.current!, {
                        zoom: 9,
                        center: { lat: 50, lng: 30 }, // Початковий центр карти (Київ)
                        gestureHandling: 'greedy',
                        disableDefaultUI: true,
                        mapId: MAP_ID
                    });

                    const marker = new window.google.maps.Marker({
                        map,
                        position: { lat: 50, lng: 30 }, // Початкова позиція маркера (Київ)
                        draggable: true, // Дозволяє перетягування маркера
                    });

                    const geocoder = new window.google.maps.Geocoder();

                    const updateLocationInfo = (location: google.maps.LatLng) => {
                        setMyLatitude(location.lat());
                        setMyLongitude(location.lng());

                        geocoder.geocode({ location }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                            if (status === 'OK' && results[0]) {
                                const addressComponents = results[0].address_components;

                                // Отримання різних частин адреси
                                const countryComponent = addressComponents.find(component => component.types.includes('country'));
                                const cityComponent = addressComponents.find(component => component.types.includes('locality') || component.types.includes('administrative_area_level_1'));
                                const streetComponent = addressComponents.find(component => component.types.includes('route'));
                                const postalCodeComponent = addressComponents.find(component => component.types.includes('postal_code'));

                                setFullAddress(results[0].formatted_address);
                                setCountry(countryComponent?.long_name || 'Unknown');
                                setCity(cityComponent?.long_name || 'Unknown');
                                setStreet(streetComponent?.long_name || 'Unknown');
                                setPostalCode(postalCodeComponent?.long_name || 'Unknown');
                            } else {
                                console.error('Geocoder failed due to: ' + status);
                            }
                        });
                    };

                    // Оновлення локації при перетягуванні маркера
                    marker.addListener('dragend', () => {
                        const location = marker.getPosition();
                        if (location) {
                            updateLocationInfo(location);
                        }
                    });

                    // Оновлення локації при кліку на карту
                    map.addListener('click', (event: google.maps.MapMouseEvent) => {
                        if (event.latLng) {
                            marker.setPosition(event.latLng);
                            updateLocationInfo(event.latLng);
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
                        <h1 className="display-4">Демо роботи вибору геолокації на карті та переведення у формат країна і місто</h1>

                        <Button variant="primary" onClick={toggleMap}>
                            {showMap ? 'Сховати' : 'Дивитись'}
                        </Button>

                        {showMap && (
                            <>
                                <div ref={mapRef} style={{ width: '100%', height: '500px' }} />

                                {myLatitude !== null && myLongitude !== null && (
                                    <p className="lead mt-3">
                                        Вибрані координати: <br />
                                        Latitude: {myLatitude} <br />
                                        Longitude: {myLongitude} <br />
                                        Повна адреса: {fullAddress} <br />
                                        Країна: {country} <br />
                                        Місто: {city} <br />
                                        Вулиця: {street} <br />
                                        Поштовий індекс: {postalCode}
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

export default ShowPickFromMap;
