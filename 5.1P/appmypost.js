const app = Vue.createApp({
    data() {
        return {
            postContents: '',
            posts: []
        }
    },
    methods: {
        post: function() {
            this.posts.push({'id': this.posts.length, 'content': this.postContents});
        },
        deletePost: function(index) {
            this.posts.splice(id, 1);
        }
    }
});

app.component('post', {
    props: ['index', 'content'],
    template: '<span>{{ content }}</span><button v-on:click="deletePost(1)" type="button">Delete</button>'
});

app.mount('#app');