import React from 'react';
import { useFormContext } from 'react-hook-form';

interface BaseFlake {
  id: number;
  name: string;
  url: string;
  type: string;
}

interface StepDevEnvProps {
  devFlakes: BaseFlake[];
}

// Make navigation props optional.
type WizardStepProps = {
  nextStep?: () => void;
  previousStep?: () => void;
  currentStep?: number;
  totalSteps?: number;
};

type Props = StepDevEnvProps & WizardStepProps;

const StepDevEnv: React.FC<Props> = ({ devFlakes, nextStep, previousStep, currentStep, totalSteps }) => {
  const { register } = useFormContext();

  return (
    <div className="step p-4 border rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Step 2: Select Development Environment</h2>
      {devFlakes.map(flake => (
        <label key={flake.id} className="block mb-2">
          <input
            type="radio"
            value={flake.id}
            {...register("devEnv")}
            className="mr-2"
          />
          {flake.name}
        </label>
      ))}
      <label className="block mb-2">
        <input
          type="radio"
          value="none"
          {...register("devEnv")}
          className="mr-2"
        />
        None
      </label>
      <div className="wizard-navigation mt-4">
        {previousStep && (
          <button
            type="button"
            onClick={previousStep}
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
          >
            Previous
          </button>
        )}
        {currentStep !== undefined &&
          totalSteps !== undefined &&
          currentStep < totalSteps &&
          nextStep && (
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Next
            </button>
          )}
      </div>
    </div>
  );
};

export default StepDevEnv;
