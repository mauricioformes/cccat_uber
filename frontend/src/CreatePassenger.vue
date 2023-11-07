<script setup lang="ts">
import { inject, ref } from 'vue';
import PassengerGateway from './infra/gateway/PassengerGateway';

const name = ref("");
const email = ref("");
const document = ref("");
const passengerId = ref("");

const passengerGateway = inject("passengerGateway") as PassengerGateway;

async function createPassenger() {
  const input = {
    name: name.value,
    email: email.value,
    document: document.value
  };
  const output = await passengerGateway.save(input);
  passengerId.value = output.passengerId;
}
</script>

<template>
  <div class="url">
    <input class="passenger-name" v-model="name" />
    <input class="passenger-email" v-model="email" />
    <input class="passenger-document" v-model="document" />
    <button class="create-passenger-button" @click="createPassenger()">criar passageiro</button>
    <div class="passenger-id">{{ passengerId }}</div>
  </div>
</template>

<style scoped></style>
