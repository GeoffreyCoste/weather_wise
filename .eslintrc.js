// This enables ESLint to use dependencies of this config
// (see https://github.com/eslint/eslint/issues/3458)
require('eslint-config-molindo/setupPlugins');

module.exports = {
    // Add configs based on your needs
    extends: [
        'molindo/javascript', // Or `molindo/typescript`
        'molindo/react', // Optional
        'molindo/jest', // Optional
        'molindo/cypress' // Optional
    ]
}