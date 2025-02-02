import React from 'react';
import { useFormContext } from 'react-hook-form';

interface PackageType {
  id: number;
  name: string;
  description: string;
}

interface StepPackagesProps {
  packages: PackageType[];
}

// Make navigation props optional.
type WizardStepProps = {
  previousStep?: () => void;
  currentStep?: number;
  totalSteps?: number;
};

type Props = StepPackagesProps & WizardStepProps;

const StepPackages: React.FC<Props> = ({ packages, previousStep, currentStep, totalSteps }) => {
  const { register } = useFormContext();

  return (
    <div className="step p-4 border rounded shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Step 3: Select Additional Packages</h2>
      {packages.map(pkg => (
        <label key={pkg.id} className="block mb-2">
          <input
            type="checkbox"
            value={pkg.id}
            {...register("packages")}
            className="mr-2"
          />
          {pkg.name}
        </label>
      ))}
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
        {/* No Next button on the final step */}
      </div>
    </div>
  );
};

export default StepPackages;
