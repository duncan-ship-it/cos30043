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
            this.posts = this.posts.filter(p => p.id !== index);
        }
    }
});

app.component('mymenu', {
    props: ['menu'],
    template:   `<ul>
                    <li v-for="m in menu">{{m}}</li>
                </ul>`
});

app.mount('#app');