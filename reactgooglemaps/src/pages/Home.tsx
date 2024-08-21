import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Loader } from '@googlemaps/js-api-loader';

// Объявляем глобальные типы для Google Maps API
declare global {
    interface Window {
        google: any;
    }
}

const Home: React.FC = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyCbXnh07gPUO-tprlrRUgFm_CxpHaSvlGs", // Замените на ваш API ключ
            version: "weekly",
        });

        loader.load().then(() => {
            const google = window.google;
            new google.maps.Map(mapRef.current, {
                center: { lat: 48.2479994, lng: 28.4260535},
                zoom: 6,
            });
        });
    }, []);

    return (
        <main className="section">
            <Container>
                <Row className="mt-5">
                    <Col className="text-center">
                        <h1 className="display-4">Протестируем возможности API Google maps</h1>
                        <p className="lead">
                            Просмотр возможностей гугл карт
                        </p>
                        <Button variant="primary" href="/showpick">Посмотреть</Button>
                    </Col>
                </Row>

                {/*<Row className="mt-5">*/}
                {/*    <Col>*/}
                {/*        <p className="lead text-center">*/}
                {/*            Так выглядит карта центрирована на Украине.*/}
                {/*        </p>*/}
                {/*        <div ref={mapRef} style={{height: '600px'}}></div>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </Container>
        </main>
    );
}

export default Home;
