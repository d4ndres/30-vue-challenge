const matterComponent = {
    props: ['title', 'timeframes', 'chronology'],
    template: `#matter-template`,
    methods:{
        clearUrlImg( title ){
            const splitTitle = title.split(" ").map( e => e.toLowerCase() )
            return splitTitle.join('-')
        }
 
    }
}


const {createApp} = Vue;

const app = createApp({
    data() {
        return {
            userName: '',
            timeFrame: 'weekly',
            timeTracking: []
        }
    },
    created() {
        
        fetch("./data.json")
        .then( response => response.json())
        .then( json => this.timeTracking = json)
        // .catch( error => console.log(error))

        this.userName = 'Jeremy Robson'
    },
    components:{
        matterComponent
    }

})



const mountedApp = app.mount("main")