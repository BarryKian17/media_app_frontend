import axios from "axios";
import { mapGetters } from "vuex";
export default {
    name: "loginPage",
    data () {
        return {
            userData: {
                email: '',
                password: '',
            },
            checkStatus: false
        }
    },
    computed: {
        ...mapGetters(["getToken","getUserData"])
    },
    methods: {
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
          acc(){
            axios.post("http://127.0.0.1:8000/api/user/login",this.userData).then((Response) => {
                if(Response.data.token == null){
                   this.checkStatus = true;
                   this.userData.password = "";
                } else {
                    this.$store.dispatch("setUserData",Response.data.user);
                    this.$store.dispatch("setToken",Response.data.token);
                    this.home();
                    this.userData.email = "";
                    this.userData.password = "";
                }
                
            })
          },
          check() {
            console.log(this.getToken);
          },
          use() {
            console.log(this.getUserData);
          }
    },

}