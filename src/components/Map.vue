<script>
import { store} from '../store';
import { onMounted,  ref } from 'vue';
export default {
    name: 'Map',
    setup() {
    const mapRef = ref(null);
    onMounted(() => { 
        const tt = window.tt;
        let map = tt.map({
            key: store.apikey,
            container: mapRef.value,
            style: 'tomtom://vector/1/basic-main',
            zoom: 12,
            center: [12.4963655, 41.9027835]
        });
        console.log(map.options);
        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl()); 
        addMarker(map);
    })
    function addMarker(map){
        const tt = window.tt;
        var location = [12.4963655, 41.9027835];
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
    /* data() {
        return {
            store,
        }
    },
    mounted() {
        this.setup();
        this.addMarker(this.map);
        this.consoleLog();
    },
    methods: {
        consoleLog(){
            console.log(this.map)
        },
        setup() { 
            const mapRef = ref(null); 
            onMounted(() => { 
            
                    const tt = window.tt; 
                    let map = tt.map({ 
                    key: this.store.apikey, 
                    container: mapRef.value, 
                    style: 'tomtom://vector/1/basic-main', 
                }); 
                map.addControl(new tt.FullscreenControl()); 
                map.addControl(new tt.NavigationControl());  
            }) 
            console.log(map)
            return { 
                mapRef,
                map 
            }; 
        },
        addMarker(map) { 
            const tt = window.tt; 
            var location = [-121.91595, 37.36729]; 
            var popupOffset = 25; 
        
            var marker = new tt.Marker().setLngLat(location).addTo(map); 
            var popup = new tt.Popup({ offset: popupOffset }).setHTML("Your address!"); 
            marker.setPopup(popup).togglePopup(); 
        }       
    },  */  
    
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