<script setup lang="ts">
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider"

const config = useRuntimeConfig().public

const email = ref('')
const password = ref('')
const message = ref('')

const login = async () => {
  const client = new CognitoIdentityProviderClient({ region: config.cognitoRegion })

  try {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: config.cognitoClientId,
      AuthParameters: {
        USERNAME: email.value,
        PASSWORD: password.value,
      },
    })

    const response = await client.send(command)
    const token = response.AuthenticationResult?.IdToken

    if (token) {
      localStorage.setItem('token', token)
      message.value = 'You have logged in!'
    } else {
      message.value = 'Token not found!'
    }
  } catch (err: any) {
    message.value = err.message
  }
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <form @submit.prevent="login" class="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
      <h2 class="text-xl font-bold text-center">Login</h2>

      <input v-model="email" type="email" placeholder="Email"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <input v-model="password" type="password" placeholder="Password"
        class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
        Login
      </button>

      <p class="text-sm text-center text-red-500">{{ message }}</p>
    </form>
  </div>
</template>
