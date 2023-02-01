const notifications = [
    {read: false, userName: 'Mark Webber',       date: '1m ago',         business: { title: 'reacted to your recent post', subject: 'My first tournament today!',  message: '', imgURL: ''}},
    {read: false, userName: 'Angela Gray',       date: '5m ago',         business: { title: 'followed you',                subject: '',  message: '', imgURL: ''}},
    {read: false, userName: 'Jacob Thompson',    date: '1 day ago',      business: { title: 'has joined your group',       subject: 'Chess Club',  message: '', imgURL: ''}},
    {read: true, userName: 'Rizky Hasanuddin',  date: '5 days ago',     business: { title: 'sent you a private message',  subject: '',  message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.", imgURL: ''}},
    {read: true, userName: 'Kimberly Smith',    date: '1 week ago',     business: { title: 'commented on your picture',   subject: '',  message: '', imgURL: 'image-chess'}},
    {read: true, userName: 'Nathan Peterson',   date: '2 weeks ago',    business: { title: 'reacted to your recent post', subject: '5 end-game strategies to increase your win rate',  message: '', imgURL: ''}},
    {read: true, userName: 'Anna Kim',          date: '2 weeks ago',    business: { title: 'left the group',              subject: 'Chess Club',  message: '', imgURL: ''}},          
              
]





const notificationComponent = {
    props: ['name', 'date', 'read', 'business'],
    template: '#notification-template',
    methods:{
        getUrlImg( name ){
            const splitName = name.split(" ").map( name => name.toLowerCase() )
            return splitName.join("-")
        },
    }
}


const { createApp } = Vue

const app = createApp({
    data(){
        return {
            notifications: notifications
        }
    },
    computed:{
        notificationsRead(){
            return this.notifications.filter( notification => notification.read == false).length
        }
    },
    methods:{
        markAllAsRead() {
            this.notifications = this.notifications.map( notification => {
                notification.read = true
                return notification
            })
            
        },
        readNotification( userName ) {
            this.notifications = this.notifications.map( notification => {
                if ( userName == notification.userName )
                    notification.read = true
                return notification
            })            
        }
    },
    components:{
        notificationComponent
    }
})



const mountedApp = app.mount('main')

const gui = new dat.GUI();
for( let notification of mountedApp.notifications ){
    gui.add( notification, 'read', true, false)
}
gui.close()