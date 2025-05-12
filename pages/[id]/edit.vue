<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Edit Note</h1>

    <form @submit.prevent="submit">
      <input v-model="title" class="border w-full p-2 mb-4" placeholder="Title" />
      <textarea v-model="content" class="border w-full p-2 mb-4" rows="5" placeholder="Content"></textarea>
      <button class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
    </form>

    <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useNotes } from '~/composables/useNotes'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const { notes, updateNote, fetchNotes, error } = useNotes()

const title = ref('')
const content = ref('')

onMounted(async () => {
  await fetchNotes()
  const note = notes.value.find(n => n.id === id)
  if (note) {
    title.value = note.title
    content.value = note.content
  }
})

const submit = async () => {
  const updated = await updateNote(id, title.value, content.value)
  if (updated) {
    router.push('/')
  }
}
</script>
