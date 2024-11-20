import { ref, toRef, watch } from 'vue';
import { z } from 'zod';

const useStepManager = () => {
  const currentStep = ref(1);
  const globalSteps = ref([
    {
      id: 1,
      name: 'Step 1',
      formInputs: [
        {
          type: 'text',
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
  ]);

  const nextStep = () => {
    console.log('nextStep');
    currentStep.value++;
  };

  const previousStep = () => {
    currentStep.value--;
  };

  const getStep = (stepId = currentStep.value) => {
    let step = globalSteps.value.find((step) => step.id === stepId);
    step.zodSchema = zodGenerator(globalSteps.value[stepId - 1]);
    return step;
  };

  const handleSubmit = (data: any) => {
    console.log(data);
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

/*
const zodSchema = ref(z.object(globalSteps.value[currentStep - 1].formInputs.map((field) => {
    let schemaObject = {}

    switch (field.type) {
        case "string":
            schemaObject[field.name] = z.string()
            break;
        case "text":
            schemaObject[field.name] = z.string()
            break;
        case "password":
            schemaObject[field.name] = z.string()
            break;
        case "number":
            schemaObject[field.name] = z.number()
            break;

        default:
            break;
    }

    if (field.regex) {
        schemaObject[field.name] = schemaObject[field.name].regex(new RegExp(field.regex))
    }
    return schemaObject
})))*/

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
  //remove label
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
        default:
          return null;
      }
    })
    .filter((field) => field !== null)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  // .reduce((acc, curr) => ({ ...acc, ...curr }), {})
  console.log(listFields);
  return z.object({});
};
