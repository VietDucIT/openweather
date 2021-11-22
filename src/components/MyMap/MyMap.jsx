import PropTypes from 'prop-types';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import city from '../../json/city';

import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// set default icon or customize icons
let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = defaultIcon;


const MyMap = ( {setMyCity} ) => {
    return (
        <MapContainer
            center = {[10.41667, 106.166672]}
            zoom = {8}
            scrollWheelZoom = {false}
            style = {{ width: '100%', height: '500px' }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributor'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            { city.map(cityItem => (
                <Marker
                    position = {[cityItem.coord.lat, cityItem.coord.lon]}
                    key = {cityItem.id}
                    eventHandlers = {{
                        click: () => {
                            setMyCity(cityItem.param ? cityItem.param : cityItem.name);
                        },
                    }}
                >
                    <Popup>
                        {cityItem.name}
                    </Popup>
                </Marker>
            )) }
        </MapContainer>
    )
}

MyMap.propTypes = {
    setMyCity: PropTypes.func,
};

export default MyMap;