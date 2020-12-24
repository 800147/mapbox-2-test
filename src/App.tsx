import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./App.css";

mapboxgl.accessToken = String(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

function App() {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(5);
    const [lat, setLat] = useState(34);
    const [zoom, setZoom] = useState(1.5);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: (mapContainerRef.current as unknown) as HTMLElement,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });

        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        map.on("move", () => {
            setLng(map.getCenter().lng);
            setLat(map.getCenter().lat);
            setZoom(map.getZoom());
        });

        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="sidebarStyle">
                <div>
                    Longitude: {lng.toFixed(4)} | Latitude: {lat.toFixed(4)} | Zoom: {zoom.toFixed(2)}
                </div>
            </div>
            <div className="map-container" ref={mapContainerRef} />
        </div>
    );
}

export default App;
