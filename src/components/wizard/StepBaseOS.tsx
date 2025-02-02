import React from 'react';
import { useFormContext } from 'react-hook-form';

interface BaseFlake {
  id: number;
  name: string;
  url: string;
  type: string;
}

interface StepBaseOSProps {
  osFlakes: BaseFlake[];
}

// Make navigation props optional.
type WizardStepProps = {
  nextStep?: () => void;
  previousStep?: () => void;
  currentStep?: number;
  totalSteps?: number;
};

type Props = StepBaseOSProps & WizardStepProps;

const StepBaseOS: React.FC<Props> = ({ osFlakes, nextStep, currentStep, totalSteps }) => {
  const { register } = useFormContext();

  return (
    <div className="step p-4 border rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Select Base OS</h2>
      {osFlakes.map(flake => (
        <label key={flake.id} className="block mb-2">
          <input
            type="radio"
            value={flake.id}
            {...register("baseOS", { required: true })}
            className="mr-2"
          />
          {flake.name}
        </label>
      ))}
      <div className="wizard-navigation mt-4">
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

export default StepBaseOS;
