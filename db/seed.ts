import { db, BaseFlake, Package } from 'astro:db';

export default async function seed() {
  await db.insert(BaseFlake).values([
    {
      id: 1,
      name: "Ubuntu Desktop",
      url: "github:majordomo-systems/nix-flake-generator/flakes/system/ubuntu/desktop/base_flake.nix",
      type: "os"
	  },
	{
      id: 2,
      name: "Ubuntu Server",
      url: "github:majordomo-systems/nix-flake-generator/flakes/system/ubuntu/server/base_flake.nix",
      type: "os"
    },
    {
      id: 3,
      name: "MacOS",
      url: "github:majordomo-systems/nix-flake-generator/flakes/system/macos/base_flake.nix",
      type: "os"
    },
    // If you have your dev environment flakes in your repository,
    // update these URLs accordingly. For now, these are examples.
    {
      id: 4,
      name: "Data Engineering",
      url: "github:majordomo-systems/nix-flake-generator/flakes/database/base_dataengineering_flake.nix",
      type: "dev"
	},
    {
      id: 5,
      name: "Django",
      url: "github:majordomo-systems/nix-flake-generator/flakes/development/base_django_flake.nix",
      type: "dev"
	},
	{
      id: 6,
      name: "Go",
      url: "github:majordomo-systems/nix-flake-generator/flakes/development/base_go_flake.nix",
      type: "dev"
    },
    {
      id: 7,
      name: "Javascript",
      url: "github:majordomo-systems/nix-flake-generator/flakes/development/base_javascript_flake.nix",
      type: "dev"
    },
	{
      id: 8,
      name: "Network Security",
      url: "github:majordomo-systems/nix-flake-generator/flakes/networking/base_network_flake.nix",
      type: "dev"
	},
	{
      id: 9,
      name: "Python",
      url: "github:majordomo-systems/nix-flake-generator/flakes/development/base_python_flake.nix",
      type: "dev"
    },
  ]);

  await db.insert(Package).values([
    { id: 1, name: "zsh", description: "Zsh Shell" },
    { id: 2, name: "zsh-vi-mode", description: "Vi mode for Zsh" },
    { id: 3, name: "nushell", description: "A new shell" },
  ]);
}
