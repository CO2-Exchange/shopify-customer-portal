let pkgs = import <nixpkgs> {};

in pkgs.mkShell rec {
  name = "shopify-customer-portal";

  buildInputs = with pkgs; [
    nodejs_20
    yarn
  ];
}
