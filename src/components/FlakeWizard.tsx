import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import StepWizard from 'react-step-wizard';
import StepBaseOS from './wizard/StepBaseOS';
import StepDevEnv from './wizard/StepDevEnv';
import StepPackages from './wizard/StepPackages';
import FlakePreview from './FlakePreview';

interface BaseFlake {
  id: number;
  name: string;
  url: string;
  type: string;
}

interface PackageType {
  id: number;
  name: string;
  description: string;
}

interface FlakeWizardProps {
  osFlakes: BaseFlake[];
  devFlakes: BaseFlake[];
  packages: PackageType[];
}

interface FormData {
  baseOS: string;       // selected OS flake id as string
  devEnv: string;       // selected dev flake id or "none"
  packages: string[];   // array of selected package ids as strings
}

const FlakeWizard: React.FC<FlakeWizardProps> = ({ osFlakes, devFlakes, packages }) => {
  const methods = useForm<FormData>({
    defaultValues: {
      baseOS: osFlakes[0]?.id.toString() || '',
      devEnv: 'none',
      packages: [],
    },
  });

  // Watch form state.
  const formData = methods.watch();

  // Convert selected string IDs to numbers.
  const selectedOS = osFlakes.find(os => os.id === Number(formData.baseOS));
  const selectedDev = devFlakes.find(dev => dev.id === Number(formData.devEnv));
  const selectedPackageIds = (formData.packages || []).map(id => Number(id));
  const selectedPackages = packages.filter(pkg => selectedPackageIds.includes(pkg.id));

  // Generate the Nix flake based on current form selections.
  const generateFlake = (): string => {
    let content = `{
  description = "Generated Nix Flake";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";\n`;
    
    if (selectedOS) {
      content += `    baseFlake = { url = "${selectedOS.url}"; };\n`;
    }
    
    if (selectedDev && formData.devEnv !== 'none') {
      content += `    devEnv = { url = "${selectedDev.url}"; };\n`;
    }
    content += `  };\n\n`;
    
    content += `  outputs = { self, nixpkgs, baseFlake${(selectedDev && formData.devEnv !== 'none') ? ', devEnv' : ''}, ... }:
  let
    system = "x86_64-linux";
    packages = [ baseFlake${(selectedDev && formData.devEnv !== 'none') ? ', devEnv' : ''}${
      selectedPackages.length > 0
        ? selectedPackages.map(pkg => `, ${pkg.name}`).join('')
        : ''
    } ];
  in {
    packages.\${system}.myflake = nixpkgs.lib.mkDerivation {
      name = "myflake";
      src = ./.;
      buildInputs = packages;
    };
  };
}`;
    return content;
  };

  const flakeContent = generateFlake();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(data => console.log("Submitted configuration:", data))}>
        <div className="flex flex-col md:flex-row">
          {/* Wizard Column */}
          <div className="flex-1 p-4">
            <StepWizard>
              <StepBaseOS osFlakes={osFlakes} />
              <StepDevEnv devFlakes={devFlakes} />
              <StepPackages packages={packages} />
            </StepWizard>
          </div>
          {/* Preview Column */}
          <div className="flex-1 p-4 bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">Flake Preview</h2>
            <FlakePreview flakeContent={flakeContent} />
          </div>
        </div>
        <div className="p-4 text-center">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit Configuration
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FlakeWizard;
