<template>
    <div>
        <h1>{{msg}}</h1>
        <form v-on:submit.prevent="createUser" method="post">

            <div v-bind:class="{'form-group': true, 'has-error': errors.username}">
                <label>Username:</label>
                <input type="text" v-model="user.username" class="form-control">
                <span class="help-block" v-for="error in errors.username">{{ error }}</span>
            </div>

            <div v-bind:class="{'form-group': true, 'has-error': errors.email}">
                <label>Email:</label>
                <input type="email" v-model="user.email" class="form-control">
                <span class="help-block" v-for="error in errors.email">{{ error }}</span>
            </div>

            <div class="form-group">
                <button type="submit" class="btn btn-primary">Create New User</button>
            </div>
        </form>
    </div>
</template>
<script>

    export default{
        data(){
            return{
                msg:'Add User',
                errors:[],
                user:{
                    username: '',
                    email: ''
                },
            }
        },
        methods:{

            createUser(){
                this.$http.post('/users/', this.user).then(response => {

                this.user = {username: '', email:''};
                if (this.errors) {
                    this.errors = [];
                }

                this.$router.push({path:'/user/User'});
                console.log(response.data);

            }, response => {
                this.errors = response.data;
            });
            }
        }
    }


</script>
