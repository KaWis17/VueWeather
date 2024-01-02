<template>
    <header class="sticky top-0 bg-background shadow-lg">
        <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">

            <RouterLink :to="{name: 'home'}">
                <div class="flex items-center gap-3 hover:text-black duration-150 cursor-pointer">
                    <i class="fa-solid fa-cloud text-2xl"></i>
                    <p>VueWeather</p>
                </div>
            </RouterLink>

            <div class="flex gap-3 flex-1 justify-end">
                <i 
                    class="fa-regular fa-circle-question text-2xl hover:text-black duration-150 cursor-pointer"
                    @click="toggleModal"
                ></i>
            </div>

            <BaseModal 
                :modalActive="modalActive"
                @close-modal="toggleModal"
                class="text-black">
                <h1>This project has been made following parts of John Komarnicki tutorial.</h1>
            </BaseModal>
    
        </nav>
    </header>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
    import BaseModal from './BaseModal.vue';
    import { ref } from 'vue';

    const modalActive = ref(null);
    const toggleModal = () => {
        modalActive.value = !modalActive.value;
    }

</script>
