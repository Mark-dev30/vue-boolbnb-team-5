<script>
import { store} from '../store';
import { onMounted,  ref } from 'vue';
/* import axios from 'axios'; */
export default {
    name: 'Map',
/*     props: {
        latitude: String,
        longitude: String
    },
 */    data(){
        return{
            store,
        }
    },
    setup() {
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
    
    }
} 
    
</script>
<template lang="">
    <div>
        <div id='map' ref="mapRef"></div> 
    </div>
</template>
<style lang="scss" scoped>
    #map { 
        height: 500px; 
        width: 70vw; 
        margin: 0 auto;
    } 
</style>