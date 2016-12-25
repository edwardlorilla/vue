<template lang="html">


    <div>
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
        <button type="button" :class="checkedNames.length == 0 ? 'btn btn-default disabled' : 'btn btn-danger'"
                v-on:click="deleteUsers">Delete <span v-show="checkedNames">{{checkedNames.length != 0 ? checkedNames.length : ''}}</span>
        </button>
        <table class="table table-striped">
            <thead>
            <tr>
                <th></th>
                <th>Username</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>

            <tbody>
            <User v-for="user in users"
                  v-bind:user="user"
                  v-on:delete-user="deleteUser"
                  v-on:update-user="fetchUsers"
            >
                <td>
                    <input type="checkbox" :value="user" v-model="checkedNames">
                </td>
            </User>
            </tbody>
        </table>
        {{ checkedNames }}
    </div>

</template>

<script>
import User from './User.vue';

export default {

    data(){

        return {

            users: [],
            errors: [],

            user:{
                username: '',
                email: ''
            },
             checkedNames:[]
        }
    },

    components:{ User },
    created(){
        this.fetchUsers();
    },
    updated(){
        this.fetchUsers();
    },
    methods: {

        fetchUsers(){
            this.$http.get('/users').then(response => {
                this.users = response.data.users;
            });
        },

        createUser(){
            this.$http.post('/users/', this.user).then(response => {
                this.users.push(response.data.user);
                this.user = {username: '', email:''};
                if (this.errors) {
                    this.errors = [];
                }
                console.log(response.data);
            }, response => {
                this.errors = response.data;
            });
        },

        deleteUser(user){
            this.$http.delete('/users/' + user.id).then(response => {
                let index = this.users.indexOf(user);
                this.users.splice(index, 1);
                console.log(response.data);
            });
        },
         deleteUsers(){
            var t = this.checkedNames;



            for(var i = 0; i < t.length; i++){
                this.$http.delete('/users/' + t[i].id).then(response => {
                    let index = this.users.indexOf(t[i]);
                    this.users.splice(index, 1);
                    this.checkedNames.splice(index, 1);
                    console.log(response.data);
                });

            }

        }


    }
}








</script>
