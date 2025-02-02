# ---------------------------------------------------------------------------------
# To rebuild after making changes to flake:
#   darwin-rebuild switch --flake ~/.config/nix
# ---------------------------------------------------------------------------------

{
  description = "Nix-Darwin System Flake with Home Manager";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    nix-darwin.url = "github:LnL7/nix-darwin";
    nix-darwin.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = inputs@{ self, nix-darwin, nixpkgs }:
  let
    configuration = { pkgs, config, ... }: {
      # ##################################################################################### #
      # Allow UnFree Packages
      # ##################################################################################### #
      # List packages installed in system profile
      environment.systemPackages = with pkgs; [

        # OS Specific
        mkalias
      ];
      # ##################################################################################### #
      # Activation script to add nix GUI Apps to Spotlight
      system.activationScripts.applications.text = let
        env = pkgs.buildEnv {
          name = "system-applications";
          paths = config.environment.systemPackages;
          pathsToLink = "/Applications";
        };
      in
        pkgs.lib.mkForce ''
          # Set up applications.
          echo "setting up /Applications..." >&2
          rm -rf /Applications/Nix\ Apps
          mkdir -p /Applications/Nix\ Apps
          find ${env}/Applications -maxdepth 1 -type l -exec readlink '{}' + |
          while read -r src; do
            app_name=$(basename "$src")
            echo "copying $src" >&2
            ${pkgs.mkalias}/bin/mkalias "$src" "/Applications/Nix Apps/$app_name"
          done
        '';
      # ##################################################################################### #
      # Necessary for using flakes on this system.
      nix.settings.experimental-features = "nix-command flakes";
      # ##################################################################################### #
      # Enable direnv
      programs.direnv.enable = true;
      # ##################################################################################### #
      # Ensure Zsh is listed in /etc/shells
      # programs.zsh.enable = true;
      programs = {
        zsh = {
          enable = true;
          enableCompletion = true;
          # ZVM - A better and friendly vi(vim) mode plugin for ZSH.
          # https://github.com/jeffreytse/zsh-vi-mode
          interactiveShellInit = ''
            source ${pkgs.zsh-vi-mode}/share/zsh-vi-mode/zsh-vi-mode.plugin.zsh
          '';
        };
      };
      # ##################################################################################### #
      # Set Git commit hash for darwin-version.
      system.configurationRevision = self.rev or self.dirtyRev or null;
      # ##################################################################################### #
      # Used for backwards compatibility, please read the changelog before changing.
      system.stateVersion = 5;
      # ##################################################################################### #
      # The platform the configuration will be used on.
      nixpkgs.hostPlatform = "aarch64-darwin";
    };
  in
  {
    # Build darwin flake using:
    # $ darwin-rebuild build --flake .#MacBook-Pro-M3-Max
    darwinConfigurations."MacBook-Pro-M3-Max" = nix-darwin.lib.darwinSystem {
      modules = [
        configuration
      ];
    };
  };
}
  