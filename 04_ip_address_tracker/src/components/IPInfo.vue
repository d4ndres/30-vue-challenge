<template>
    <div class=info>
        <div class="info__item info__item--1">
            <h3 >IP Address</h3>
            <span >{{ ipInfo.ip }}</span>
        </div>
        <div class="info__item info__item--2">
            <h3 >Location</h3>
            <span >{{ ipInfo.location.region }}</span>
        </div>
        <div class="info__item info__item--3">
            <h3 >Timezone</h3>
            <span >UTC{{ ipInfo.location.timezone }}</span>
        </div>
        <div class="info__item info__item--4">
            <h3 >Isp</h3>
            <span >{{ ipInfo.isp }}</span>
        </div>
    </div>
</template>

<script>
    
    export default {
        name: 'IPInfo',
        props: ['ipInfo']

    }
</script>

<style scoped>

.info {
    position: absolute;
    right: 50%; top: 100%;
    transform: translate( 50%, -50%);
    background-color: #fff;
    padding: 1rem 0;
    border-radius: 11px;
    width: min(90vw, 768px);
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(180px, 1fr));
    z-index: 1;
}
.info__item{
    border-right: rgba(0,0,0,.4) 1px solid;
    padding: 0 1.5rem;
    text-align: left;
    text-transform: uppercase;

}
.info__item:last-child{
    border-right: none;
}
.info__item h3{
    color: rgba(0,0,0,.4);
    font-size: .8rem;
}
.info__item span {
    font-weight: 800;
}
@media ( max-width: 400px ){
    .info__item{
        padding: .5rem;
        text-align: center;
        border-right: none;
        font-size: .9rem;
    }
    .info__item:last-child{
    }
    .info{
        padding: 0px;
    }
}

</style>