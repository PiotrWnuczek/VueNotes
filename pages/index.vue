<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Notes List</h1>

    <NuxtLink to="/add" class="inline-block bg-blue-500 text-white px-4 py-2 rounded">
      Add Note
    </NuxtLink>

    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div class="grid gap-2 my-2">
      <NoteCard v-for="note in notes" :key="note.id" :note="note" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNotes } from '~/composables/useNotes'

const { notes, loading, error, fetchNotes } = useNotes()

onMounted(() => {
  fetchNotes()
})
</script>
