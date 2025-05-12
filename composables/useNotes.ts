import { ref } from "vue";
import type { Note } from "~/types/note";

export const useNotes = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.API_URL;

  const notes = ref<Note[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchNotes = async () => {
    loading.value = true;
    try {
      const res = await fetch(API_URL);
      notes.value = await res.json();
    } catch (e) {
      error.value = "Error downloading notes";
    } finally {
      loading.value = false;
    }
  };

  const addNote = async (
    title: string,
    content: string
  ): Promise<Note | null> => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      const newNote: Note = await res.json();
      return newNote;
    } catch (e) {
      error.value = "Error adding note";
      return null;
    }
  };

  const updateNote = async (
    id: string,
    title: string,
    content: string
  ): Promise<Note | null> => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      const updatedNote: Note = await res.json();
      const index = notes.value.findIndex((n) => n.id === id);
      if (index !== -1) notes.value[index] = updatedNote;
      return updatedNote;
    } catch (e) {
      error.value = "Error while editing note";
      return null;
    }
  };

  const deleteNote = async (id: string): Promise<boolean> => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      notes.value = notes.value.filter((note) => note.id !== id);
      return true;
    } catch (e) {
      error.value = "Error deleting note";
      return false;
    }
  };

  return {
    notes,
    loading,
    error,
    fetchNotes,
    addNote,
    updateNote,
    deleteNote,
  };
};
