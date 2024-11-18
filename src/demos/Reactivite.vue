<template>
    <div>
        <h1>Comparaison entre ref et reactive</h1>

        <div>
            <h2>Avec reactive</h2>
            <p>Nom : {{ userReactive.name }}</p>
            <p>Prénom : {{ firstNameReactive }}</p>
            <button @click="updateReactiveName">Changer le nom (Michael -> Jim)</button>
            <button @click="replaceReactiveUser">Remplacer l'utilisateur (Reactive)</button>
        </div>

        <hr />

        <div>
            <h2>Avec ref</h2>
            <p>Nom : {{ userRef.name }}</p>
            <p>Prénom : {{ firstNameRef }}</p>
            <button @click="updateRefName">Changer le nom (Michael -> Jim)</button>
            <button @click="replaceRefUser">Remplacer l'utilisateur (Ref)</button>
        </div>

        <hr />

        <div>
            <h2>Perte de réactivité avec une fonction externe</h2>
            <p>Valeur actuelle : {{ reactiveObj.myNumber }}</p>
            <p>Double : {{ doubleReactive }}</p>
            <button @click="incrementReactiveNumber">Incrémenter (Reactive)</button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, toRefs } from "vue";

// Exemple 1 : reactive
const userReactive = reactive({ name: "Michael Scott" });
const firstNameReactive = computed(() => userReactive.name.split(" ")[0]);

const updateReactiveName = () => {
    userReactive.name = "Jim Halpert"; // Fonctionne, Vue suit les propriétés
};

const replaceReactiveUser = () => {
    userReactive.name = "Michael Scott"; // OK
    // Remplacer l'objet entier casse la réactivité pour le computed
    // (Si un computed ou un watcher dépend de l'objet original)
};

// Exemple 2 : ref
const userRef = ref({ name: "Michael Scott" });
const firstNameRef = computed(() => userRef.value.name.split(" ")[0]);

const updateRefName = () => {
    userRef.value.name = "Jim Halpert"; // Fonctionne, Vue suit avec .value
};

const replaceRefUser = () => {
    userRef.value = { name: "Michael Scott" }; // Fonctionne, car ref remplace l'objet
};

// Exemple 3 : Perte de réactivité avec une fonction externe
const reactiveObj = reactive({ myNumber: 1 });

const useNumber = (number) => {
    const double = computed(() => number.value * 2); // Nécessite un ref
    return { double };
};

// Perte de réactivité si on ne passe pas un ref
const { double: doubleReactive } = useNumber(toRefs(reactiveObj).myNumber);

const incrementReactiveNumber = () => {
    reactiveObj.myNumber++;
};
</script>