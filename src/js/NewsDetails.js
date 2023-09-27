import axios from "axios";
import { mapGetters } from "vuex";
export default {
    name: "newsDetails",
    data () {
        return {
            postId: 0,
            postList: {},
            view: {}
        }
    },
    computed: {
        ...mapGetters(["getToken","getUserData"])
    },
    methods: {
        loadPost (id) {
            let post = {
                postId : id
            }
            axios.post("http://127.0.0.1:8000/api/post/details",post).then((response) => {

                    if(response.data.post.image == null){
                        response.data.post.image = "http://127.0.0.1:8000/storage/default.png" ;
                    } else {
                        response.data.post.image = "http://127.0.0.1:8000/storage/" + response.data.post.image;
                    }
                    
               
                this.postList = response.data.post;
               
            })
           

        },
        back(){
            history.back();
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
          }
    },
    mounted () {
        let data = {
            userId: this.getUserData.id,
            postId: this.$route.query.newsId
        }
        axios.post("http://127.0.0.1:8000/api/post/actionLog",data).then((response)=>{
            this.view = response.data.post
        })
       this.postId = this.$route.query.newsId;
       this.loadPost(this.postId);
    },
};