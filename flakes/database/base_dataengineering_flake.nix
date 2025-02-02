{
  inputs = {
    systems.url = "github:nix-systems/default";
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };

  outputs =
  {
    self,
    nixpkgs,
    systems,
  }:
  let
    forEachSystem =
      f: nixpkgs.lib.genAttrs (import systems) (system: f {
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      });
  in
  {
    devShells = forEachSystem (
      { pkgs }:
      {
        default = pkgs.mkShellNoCC {
          packages = with pkgs; [
            ########################################################################################
            ########################################################################################         # Python
            ########################################################################################
            ########################################################################################
            python3
            jupyterlab # Jupyter Notebook: An interactive computing environment for data science.

            # Python Packages
            (python.withPackages (ps: with ps;
            [
              # Testing
              pytest

              # Data Science Tools
              numpy # NumPy: Fundamental package for scientific computing with Python.
              pandas # Pandas: Essential for data manipulation and analysis in Python.
              matplotlib # MatPlotLib: For data visualization with Python.
            ]))
          ];
        };
      }
    );
  };
}
