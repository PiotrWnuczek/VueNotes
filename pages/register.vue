<script setup lang="ts">
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"

const config = useRuntimeConfig().public

const email = ref('')
const password = ref('')
const message = ref('')

const register = async () => {
  const client = new CognitoIdentityProviderClient({ region: config.cognitoRegion })

  try {
    const command = new SignUpCommand({
      ClientId: config.cognitoClientId,
      Username: email.value,
      Password: password.value,
    })
    await client.send(command)
    message.value = 'Registered! Check email!'
  } catch (error: any) {
    message.value = error.message
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form @submit.prevent="register" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold text-center">Register</h2>

      <input v-model="email" type="email" placeholder="Email"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <input v-model="password" type="password" placeholder="Password"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Register
      </button>

      <p class="text-sm text-center text-red-500">{{ message }}</p>
    </form>
  </div>
</template>
