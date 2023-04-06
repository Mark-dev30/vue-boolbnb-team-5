<script>
import { store} from '../store';
import tt from '@tomtom-international/web-sdk-maps';
/* import axios from 'axios'; */
export default {
    name: 'Map',
    props: {
        latitude: String,
        longitude: String
    },
    data(){
        return{
            store,
        }
    },
    /* setup() {
        const mapRef = ref(null);
        onMounted(() => { 
            const tt = window.tt;
            let map = tt.map({
                key: store.apikey,
                container: mapRef.value,
                style: 'tomtom://vector/1/basic-main',
                zoom: 14,
                center: [store.longitude,store.latitude]
            });
            
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl()); 
            addMarker(map);
        })
        function addMarker(map){
            const tt = window.tt;
            var location = [store.longitude,store.latitude];
            var popupOffsets = {
                top: [0, 0],
                bottom: [0, -30],
                'bottom-right': [0, -30],
                'bottom-left': [0, -30],
                left: [0, -35],
                right: [-25, -35]
            }
            var marker = new tt.Marker().setLngLat(location).addTo(map);
            var popup = new tt.Popup({offset: popupOffsets}).setHTML('Siamo qui!');
            marker.setPopup(popup).togglePopup();
        }
        return {
            mapRef,
        }
    
    }, */
    methods:{
        createMap(){
            /* var map =  */tt.map({
                key: store.apikey,
                container: "map",
            })
        },
        latLonToTileZXY(lat, lon, zoomLevel) {
            console.log(lat)
            
            console.log(lon)
            console.log(zoomLevel)


            const MIN_ZOOM_LEVEL = 0
            const MAX_ZOOM_LEVEL = 22
            const MIN_LAT = -85.051128779807
            const MAX_LAT = 85.051128779806
            const MIN_LON = -180.0
            const MAX_LON = 180.0

            if (
                zoomLevel == undefined ||
                isNaN(zoomLevel) ||
                zoomLevel < MIN_ZOOM_LEVEL ||
                zoomLevel > MAX_ZOOM_LEVEL
            ) {
                throw new Error(
                "Zoom level value is out of range [" +
                    MIN_ZOOM_LEVEL.toString() +
                    ", " +
                    MAX_ZOOM_LEVEL.toString() +
                    "]"
                )
            }

            if (lat == undefined || isNaN(lat) || lat < MIN_LAT || lat > MAX_LAT) {
                throw new Error(
                "Latitude value is out of range [" +
                    MIN_LAT.toString() +
                    ", " +
                    MAX_LAT.toString() +
                    "]"
                )
            }

            if (lon == undefined || isNaN(lon) || lon < MIN_LON || lon > MAX_LON) {
                throw new Error(
                "Longitude value is out of range [" +
                    MIN_LON.toString() +
                    ", " +
                    MAX_LON.toString() +
                    "]"
                )
            }

            let z = Math.trunc(zoomLevel)
            let xyTilesCount = Math.pow(2, z)
            let x = Math.trunc(Math.floor(((lon + 180.0) / 360.0) * xyTilesCount))
            let y = Math.trunc(
                Math.floor(
                ((1.0 -
                    Math.log(
                    Math.tan((lat * Math.PI) / 180.0) +
                        1.0 / Math.cos((lat * Math.PI) / 180.0)
                    ) /
                    Math.PI) /
                    2.0) *
                    xyTilesCount
                )
            )

            return z.toString() + "/" + x.toString() + "/" + y.toString()
        }
    },
    created(){
        this.latLonToTileZXY(Number(this.latitude),Number(this.longitude), 14);
        this.createMap();
    }
} 
    
</script>
<template lang="">
    <div>
        <div id='map'></div> 
    </div>
</template>
<style lang="scss" scoped>
    #map { 
        height: 300px; 
        width: 100%; 
        margin: 0 auto;
    } 
</style>