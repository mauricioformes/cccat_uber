<script setup lang="ts">
import { inject, ref } from 'vue';
import PassengerGateway from './infra/gateway/PassengerGateway';
import PassengerBuilder from './infra/domain/passenger/PassengerBuilder';

const passenger = ref(new PassengerBuilder());
const passengerId = ref("");

const passengerGateway = inject("passengerGateway") as PassengerGateway;

async function createPassenger() {
  const output = await passengerGateway.save(passenger.value.build());
  passengerId.value = output.passengerId;
}
</script>

<template>
  <div class="url">
    <input class="passenger-name" v-model="passenger.name" />
    <input class="passenger-email" v-model="passenger.email" />
    <input class="passenger-document" v-model="passenger.document" />
    <button class="create-passenger-button" @click="createPassenger()">criar passageiro</button>
    <div class="passenger-id">{{ passengerId }}</div>
  </div>
</template>

<style scoped></style>
