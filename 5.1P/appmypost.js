const app = Vue.createApp({ });

app.component('app-mypost', // indicating the component tag
{
    // defining data to be used in the component
    data: function() {
        return {
            statPosts:[],
            strStatus:''
        }
    },
    // define the template for the component
    template: `<form @submit.prevent="add(strStatus)">
                    <label for="postContents">Status</label>
                    <input type="text" name="postContents" id="postContents" v-model="strStatus"><br>
                    <button type="submit">Post</button>
                    <div v-for="(p, i) in statPosts">
                        <span>{{ p }}</span><button v-on:click="remove(i)" type="button">Delete</button>
                    </div>
                </form>`,
    // defining the methods for add and remove status messages
    methods:{
        add:function(status){
            this.statPosts.push(status);
            this.strStatus = '';
        },
        remove:function(index){
            this.statPosts.splice(index, 1);
        }
    }
});

app.mount('#app');