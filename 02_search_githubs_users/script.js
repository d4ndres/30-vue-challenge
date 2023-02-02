const API = "https://api.github.com/users/"
const requestMaxTime = 30000

const { createApp } = Vue

const app = createApp({
data() {
    return {
        result: null,
        searchUser: null,
        error: null,
        favorites: new Map()
    }
},
created(){
    const savedFavorites = JSON.parse( window.localStorage.getItem("favorites") )
    if ( savedFavorites?.length ){
        const favorites = new Map( savedFavorites.map( favorite => [favorite.login, favorite]) )
        this.favorites = favorites
        
    }
},
methods: {
    async doSearch(){
        if ( !this.searchUser ) return null  
      
        const foundInFavorites = this.favorites.get( this.searchUser )

        const shouldRequestAgain = (() => {
            if (!!foundInFavorites){
                const { lastRequestTime } = foundInFavorites
                const now = Date.now()
                return (now - lastRequestTime) > requestMaxTime
            }
            return false
        })()

        if ( !!foundInFavorites && !shouldRequestAgain){
            console.log("version cached")
            return this.result = foundInFavorites
        }
        
        try{

            console.log("Not found cached user")

            const response = await fetch( API + this.searchUser)
            if( !response.ok ) throw new Error("User not found")
            
            const user = await response.json()
            this.result = user
            this.error = null
            this.result.lastRequestTime = Date.now()
        } catch(error) {
            this.error = error
            this.result = null
            setTimeout( this.reset, 2000 )
        } finally {
            this.searchUser = null
        }


    },
    addFavorite() {
        this.result.lastRequestTime = Date.now()
        this.favorites.set(this.result.login, this.result)
        this.updateStorage()
    },
    removeFavorite() {
        this.favorites.delete(this.result.login)
        this.updateStorage()
    },
    updateStorage() {
        window.localStorage.setItem("favorites", JSON.stringify(this.allFavorites))
    },
    showFavorite( favorite ){
        this.result = favorite
    },
    checkFavorite(user){
        return this.result?.login == user.login
    },
    reset(){
        this.result = null
        this.searchUser = null
        this.error = null
    }
},
computed: {
    isFavorite(){
        return this.favorites.has(this.result?.login)
    },
    allFavorites(){
        return Array.from(this.favorites.values())
    }

}
}).mount("main")
