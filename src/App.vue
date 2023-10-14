<template>
    <div v-show="!isEditMode"> 
            <h1> User Profile </h1>
            <img :src="image">
            
            <span> Name : <b id="name">{{ name }} </b></span>
            <hr />

            <span> Email : <b id="email"> {{ email }} </b></span>
            <hr />
            
            <span> Interests : <b id="interests"> {{ interests }} </b></span>
            <hr />


            <button @click="EditProfile"> Edit Profile </button>
        </div>    

        <div v-show="isEditMode" > 
            <h1> User Profile </h1>
            <img :src="image">
            
            <span> Name : <input type="text" id="input-name" v-model="name"> </span>
            <hr />

            <span> Email : <input type="text" id="input-email" v-model="email"></span>
            <hr />
            
            <span> Interests : <input type="text" id="input-interests" v-model="interests"> </span>
            <hr />

        
            

            <button @click="UpdateProfile"> Update Profile </button>
        </div> 
</template>

<script>
    import image from "./profile .jpeg"
    export default {
        name: 'App',
        data() {
            return {
                image: image,
                name: "",
                email: "",
                interests: "",
                isEditMode: false
            }
        },
        async created(){
            const userData = await this.fetchUserProfile()
            this.name = userData.name
            this.email = userData.email
            this.interests = userData.interests
        }, // when the component instance was created
        methods: {
            EditProfile () {
                this.isEditMode = true
            },
            async UpdateProfile () {
                const payload = {
                    name : this.name,
                    email : this.email,
                    interests : this.interests
                }
                const resJson = await this.updateUserProfile(payload)
                console.log(resJson)

                this.isEditMode = false
            },
            async fetchUserProfile (){
                const res = await fetch('get-profile') // method: "GET" can be ommited with headers
                    
                return await res.json()
            },
            async updateUserProfile(payload) {
                const res = await fetch('update-profile', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                return await res.json()
            }

        }

    }
</script>

<style>
body {
    margin: 0;
}
img {
    width: 270px;
    height: 300px;
    display: block;
    margin-bottom: 30px;
}

div {
    width: 80%;
    margin: 40px auto;
}
hr {
    width: 600px;
    margin-left: 0 ;
    margin: 25px 0;
}
button {
    font-size: 15px;
    border: 1px solid black;
    border-radius: 5px;
    height: 45px;
    width: 165px;
}
button:hover {
    cursor: pointer;
}
input {
    padding: 10px;
    width: 200px;
    font-size: 15px;
}

</style>