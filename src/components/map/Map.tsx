import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Title, Body } from './styles/styles';
import { mapEquipmentData } from '../../services/GetData';

const markerIcon = require('./img/aiko.png');


export default function Map() {
    const equipmentPositions = mapEquipmentData();

    const position: [number, number] = [equipmentPositions[0]?.lat, equipmentPositions[0]?.lon];

    return (
        <>
            <Title>Mapa de monitoração de operação</Title>
            <Body>
                <MapContainer center={position} zoom={13} style={{ height: "500px", width: "50%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {equipmentPositions.map((equipment) => (
                        equipment && (
                        <Marker 
                            key={equipment.id} 
                            position={[equipment.lat, equipment.lon]} 
                            icon={new L.Icon({
                                iconUrl: markerIcon,
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41],
                                className: `marker-${equipment.id}`
                            })}
                        >
                            <Popup>
                                <strong>{equipment.name}</strong><br />
                                Estado: {equipment.state}
                            </Popup>
                        </Marker>
                        )
                    ))}
                </MapContainer>
            </Body>
        </>
    );
}
