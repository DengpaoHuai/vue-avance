import httpClient from '@/modules/http-client';
import { ref, toRef, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { z } from 'zod';

const useStepManager = () => {
  const currentStep = ref(1);
  const router = useRouter();
  const route = useRoute();

  const globalSteps = ref([
    {
      id: 1,
      name: 'Step 1',
      formInputs: [
        {
          type: 'email',
          name: 'email',
          label: 'Your email',
        },
        {
          type: 'text',
          name: 'firstname',
          label: 'Your firstname',
        },
        {
          type: 'text',
          name: 'lastname',
          label: 'Your lastname',
        },
      ],
    },
    {
      id: 2,
      name: 'Step 2',
      formInputs: [
        {
          type: 'text',
          name: 'cuID',
          label: 'Your cuID',
          regex: '^[0-9]{8}$',
        },
      ],
    },
    {
      id: 3,
      name: 'Step 3',
      formInputs: [
        {
          type: 'text',
          name: 'identity_entreprise',
          label: 'Your identity_entreprise',
        },
      ],
    },
    {
      id: 4,
      name: 'Step 4',
      formInputs: [
        {
          type: 'text',
          name: 'demo',
          label: 'Your demo',
        },
      ],
    },
  ]);

  watch(
    () => route.params.step,
    (value) => {
      console.log('value1');
      currentStep.value = parseInt(value as string);
    },
    {
      immediate: true,
    },
  );

  const nextStep = () => {
    console.log('nextStep');
    router.push({
      name: 'create_user',
      params: { id: '1', step: currentStep.value + 1 },
    });
    currentStep.value++;
  };

  const previousStep = () => {
    console.log('previousStep');
    router.push({
      name: 'create_user',
      params: { id: '1', step: currentStep.value - 1 },
    });
    currentStep.value--;
  };

  const getStep = (stepId = currentStep.value) => {
    return {
      ...globalSteps.value.find((step) => step.id === stepId),
      zodSchema: zodGenerator(globalSteps.value[stepId - 1]),
    };
  };

  const handleSubmit = (data: any) => {
    /* httpClient.post('/users', {
      ...data,
      currentStep: currentStep.value,
    });*/
  };

  watch(currentStep, (newVal) => {
    console.log('currentStep', newVal);
  });

  return {
    currentStep: currentStep,
    globalSteps,
    nextStep,
    previousStep,
    getStep,
    handleSubmit,
  };
};

export default useStepManager;

type FormInput = {
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'radio' | 'checkbox' | 'number';
  name: string;
};

type GlobalSteps = {
  id: number;
  name: string;
  formInputs: FormInput[];
};

export const zodGenerator = (akData: GlobalSteps) => {
  let cleanFields = akData.formInputs;

  let listFields = cleanFields
    .map((input) => {
      const field = input;
      switch (field.type) {
        case 'select':
          return {
            [field.name]: z.string(),
          };
        case 'number':
          return {
            [field.name]: z.coerce.number(),
          };
        case 'checkbox':
          return {
            [field.name]: z.boolean(),
          };
        case 'text':
          return {
            [field.name]: z.string(),
          };
        case 'email':
          return {
            [field.name]: z.string().email(),
          };
        default:
          return null;
      }
    })
    .filter((field) => field !== null)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  console.log(listFields);
  return z.object(listFields);
};
