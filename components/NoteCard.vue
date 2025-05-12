<template>
  <div class="border rounded p-2 my-2">
    <h2 class="font-semibold text-lg">{{ note.title }}</h2>
    <p class="text-gray-700">{{ note.content }}</p>

    <button class="text-red-500" @click="handleDelete">
      Delete
    </button>

    <NuxtLink :to="`/${note.id}/edit`" class="text-blue-500">
      Edit
    </NuxtLink>

  </div>
</template>

<script setup lang="ts">
import type { Note } from '~/types/note'
import { useNotes } from '~/composables/useNotes'

const props = defineProps<{ note: Note }>()
const { deleteNote } = useNotes()

const handleDelete = async () => {
  const confirmDelete = confirm('Are you sure you want to delete this note?')
  if (confirmDelete) {
    await deleteNote(props.note.id)
  }
}
</script>
