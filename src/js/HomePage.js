import axios from "axios";
import { mapGetters } from "vuex";
export default {
    name : 'homePage',
    data () {
        return {
            postList: [],
            categoryList: [],
            searchKey: "",
            tokenStatus : false,
        };
    },
    computed: {
        ...mapGetters(["getToken","getUserData"])
    },
    methods : {

        getAllPost() {      
         axios.get("http://127.0.0.1:8000/api/allPost").then((response) => {
                this.postList = response.data.post ;


                for(let i = 0 ; i < this.postList.length ; i++) {
                    if(this.postList[i].image == null){
                        this.postList[i].image = "http://127.0.0.1:8000/storage/default.png" ;
                    } else {
                        this.postList[i].image = "http://127.0.0.1:8000/storage/" + response.data.post[i].image;
                    }
                    
                }
        });
       },
       loadCategory() {      
        axios.get("http://127.0.0.1:8000/api/allCategory").then((response) => {
            this.categoryList = response.data.category;


       });
      },
      search(){
        let search = {
            key : this.searchKey,
        };
        console.log("data searching....");
        axios.post("http://127.0.0.1:8000/api/post/search",search).then((response) => {

            for(let i = 0 ; i < response.data.searchData.length ; i++) {
                if(response.data.searchData[i].image == null){
                    response.data.searchData[i].image = "http://127.0.0.1:8000/storage/default.png" ;
                } else {
                    response.data.searchData[i].image = "http://127.0.0.1:8000/storage/" + response.data.searchData[i].image;
                }
                
            }
            this.postList = response.data.searchData;
        });
      },
      categorySearch(searchKey){
        let search = {
            key: searchKey
        };
        axios.post("http://127.0.0.1:8000/api/category/search",search).then((response) => {

            for(let i = 0 ; i < response.data.searchData.length ; i++) {
                if(response.data.searchData[i].image == null){
                    response.data.searchData[i].image = "http://127.0.0.1:8000/storage/default.png" ;
                } else {
                    response.data.searchData[i].image = "http://127.0.0.1:8000/storage/" + response.data.searchData[i].image;
                }
                
            }
            this.postList = response.data.searchData;
    });
      },
      news(id){

        this.$router.push({
             path: '/newsDetails',
              query: { newsId: id } 
            })
      },
      home(){
        this.$router.push({
            path: '/'
        })
      },
      login(){
        this.$router.push({
            path: '/loginPage'
        })
      },
      logout(){
        this.$store.dispatch("setToken",null);
        this.login();
      },
      checkToken(){
        if(this.getToken != null && this.getToken != undefined && this.getToken != ""){
            this.tokenStatus = true
        } else {
            this.tokenStatus = false
        }
      }
    },
    mounted () {
        this.getAllPost();
        this.loadCategory();
        this.checkToken();
        console.log(this.getToken);
        console.log(this.getUserData);
    }
}