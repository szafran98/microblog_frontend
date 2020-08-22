<template>
    <div>
        <h1 style="color: white">Account activated</h1>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "UserActivation",
        created() {
            let data = this.$route.params
            axios.post('http://127.0.0.1:8000/auth/users/activation/', data)
                .then( () => {
                    setTimeout(() => {
                        this.$router.push({ name: 'Home' })
                    }, 3000)
                })
        }
    }
</script>

<style scoped>

</style>