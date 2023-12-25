module.exports = {
  '*.{rs}': ['cargo fmt --all -- --check'],
  '*.{md,json,yml,yaml}': ['prettier --write'],
};
