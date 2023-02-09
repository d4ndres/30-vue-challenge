<template>
    <header 
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
    </header>
</template>

<script>

import IPInfo from '@/components/IPInfo.vue'


export default{
    name: 'Header',
    components: {
        IPInfo,
    },
    methods: {

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
    transition: .4s;
    z-index: 1;
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