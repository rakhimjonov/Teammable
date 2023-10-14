import image from "./profile .jpeg";

export default (await import('vue')).defineComponent({
name: 'App',
data() {
return {
image: image,
name: "",
email: "",
interests: "",
isEditMode: false
};
},
async created() {
const userData = await this.fetchUserProfile();
this.name = userData.name;
this.email = userData.email;
this.interests = userData.interests;
}, // when the component instance was created
methods: {
EditProfile() {
this.isEditMode = true;
},
async UpdateProfile() {
const payload = {
name: this.name,
email: this.email,
interests: this.interests
};
const resJson = await this.updateUserProfile(payload);
console.log(resJson);

this.isEditMode = false;
},
async fetchUserProfile() {
const res = await fetch('get-profile'); // method: "GET" can be ommited with headers

return await res.json();
},
async updateUserProfile(payload) {
const res = await fetch('update-profile', {
method: "POST",
headers: {
'Accept': "application/json",
'Content-Type': "application/json"
},
body: JSON.stringify(payload)
});
return await res.json();
}
}
});
