const emailPattern = /([a-z0-9][-a-z0-9_\+\.]*[a-z0-9])@([a-z0-9][-a-z0-9\.]*[a-z0-9]\.(arpa|root|aero|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)|([0-9]{1,3}\.{3}[0-9]{1,3}))/;

const app = Vue.createApp({
    data: () => ({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirm: '',
        email: '',
        addy: '',
        suburb: '',
        postcode: '',
        mobile: '',
        nameRules: [
            v => !!v || 'Name Required',
            v => (v && /^[A-z]*$/.test(v)) || 'Name must be letters only'
        ],
        userNameRules: [
            v => !!v || 'User Name required',
            v => (v && v.length >= 3) || 'User Name must be at least 3 characters'
        ],
        passwordRules: [
            v => !!v || 'Password required',
            v => (v && v.length >= 8) || 'Password must be at least 8 characters',
            v => (v && /[$%^&*]/.test(v)) || 'Password must contain one of the following characters: $, %, ^, &, or *'
        ],
        emailRules: [
            v => !!v || 'Email required',
            v => (v && emailPattern.test(v)) || 'Email must be a valid address'
        ],
        addyRules: [
            v => (!v || v.length <= 40) || 'Street Address is optional but must be 40 characters maximum if specified'
        ],
        suburbRules: [
            v => (!v || v.length <= 20) || 'Suburb is optional but must be 20 characters maximum if specified'
        ],
        postcodeRules: [
            v => !!v || 'Postcode is required',
            v => (v && v.length === 4) || 'Postcode must be 4 digits',
        ],
        mobileRules: [
            v => !!v || 'Mobile is required',
            v => v && /^04/.test(v) || 'Mobile must start with digits 04'
        ],
        termsVisible: false
    }),
    methods: {
        toggleTerms: function() {
            this.termsVisible = !this.termsVisible;
        }
    },
    computed: {
        confirmRule() {
            return () => this.confirm === this.password || 'Passwords must match'
        }
    }
});

app.use(Vuetify.createVuetify()).mount('#app');