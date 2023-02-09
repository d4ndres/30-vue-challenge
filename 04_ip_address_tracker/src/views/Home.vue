<template>
    <main>
        <!-- Search / REsults -->
        <article 
            class="hero"
            :class="{ hero__found : getQueryIP.ip }"
            >
            <!-- Search Input -->
            <div class="search">
                <h1 class="title">IP Address Tracker</h1>
                <label 
                    class="search__form" 
                    >
                    <input
                        @keyup.enter="getIpInfo"
                        v-model="getQueryIP.value"
                        class="search__input"
                        type="text" 
                        placeholder="Search for any IP or leave empty to get your IP info">
                    <i 
                        @click="getIpInfo"
                        class="fa-solid fa-chevron-right search__btn"></i>
                </label>
            </div>
            <!-- IP Info -->
            <Transition>

                <IPInfo
                    v-if="getQueryIP.ip" 
                    class="IPInfo" 
                    :ipInfo="getQueryIP"
                    ></IPInfo>
            </Transition>
        </article>
        <!-- Map -->
        <div 
            id="map" 
            class="map"
            :class="{ map__found : getQueryIP.ip }"
            ></div>
    </main>
</template>

<script>
import IPInfo from '@/components/IPInfo.vue'
import leaflet from 'leaflet'
import store from '@/store/index'
import axios from 'axios'

export default{
    name: 'Home',

    data(){
        return {
            mymap: undefined,
        }
    },

    components: {
        IPInfo,
        
    },
    methods: {
        async getIpInfo(){
            try{
                const data = await axios.get(
                    `https://geo.ipify.org/api/v2/country,city?apiKey=at_sSNWKWCXCIZTbvESPcTI7z22Hj60I&ipAddress=${this.$store.state.queryIP.value}`
                );
                const result = data.data
                leaflet.marker( [result.location.lat, result.location.lng]).addTo(this.mymap)
                this.mymap.setView([result.location.lat, result.location.lng], 13);
                this.$store.commit('setQueryIP', result)
            } catch( error ){
                alert( error.message )
            }
        }
    },
    computed:{
        getQueryIP: {
            get(){
                return this.$store.getters.getQueryIP
            },
            set(value){
                this.$store.commit('setQueryIP', {value})
            }
            
        }
    },
    mounted(){
        
        this.mymap = leaflet.map('map', {
            zoomControl: false
        })
        this.mymap.setView([51.505, -0.09], 13);
        store.commit('setQueryIP', "")

    
        leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.mymap)

        leaflet.control.zoom({ position: 'bottomleft'}).addTo(this.mymap)
        
    }
}

</script>

<style scoped>
@import url('@/assets/main.css');


main {
    min-width: 100vw;
    min-height: 100vh;
}
.hero {
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    position: relative;
    text-align: center;
    background-image: url('@/assets/images/pattern-bg.png');
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    height: 25vh;
    transition: .4s;
    z-index: 1;
}

.map {
    width: 100vw;
    z-index: 0;
    transition: .4s;
    height: 75vh;
    overflow: hidden;
}

.search {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.hero__found{
    height: 35vh;
}
.map__found {
    height: 65vh;
} 
.title {
    color: #fff;
    font-size: 1.8rem;
    padding: .5rem;
}
.search__form {
    background-color: #fff;
    width: min(90vw, 500px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 11px;
    overflow: hidden;
    
}
.search__input{
    font-size: 1rem;
    width: 90%;
    padding-left: .5rem;
    border: none;
}
.search__btn {
    font-size: 1rem;
    background: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    height: 100%;
    padding: 15px;
    cursor: pointer;
    
}
@media ( max-width: 400px ){
    .search{
       height: 60%;
       justify-content: space-evenly;

    }
    .title {
        color: #fff;
        font-size: 1.5rem;
        padding: .5rem;
        font-weight: 500;
        
    }

    .search__input{
        width: 85%;
        font-size: .9rem;
    }
    .search__btn{   
        width: 15%;
    
    }
}
</style>