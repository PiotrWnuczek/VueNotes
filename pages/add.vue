<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Add Note</h1>

    <form @submit.prevent="submitNote">
      <input v-model="title" class="border w-full p-2 mb-4" placeholder="Title" />

      <textarea v-model="content" class="border w-full p-2 mb-4" rows="5" placeholder="Content"></textarea>

      <button class="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>

    <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNotes } from '~/composables/useNotes'
import { useRouter } from 'vue-router'

const title = ref('')
const content = ref('')
const { addNote, error } = useNotes()
const router = useRouter()

const submitNote = async () => {
  const result = await addNote(title.value, content.value)
  if (result) {
    router.push('/')
  }
}
</script>
