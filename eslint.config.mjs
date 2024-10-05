module.exports = {
  // Définir les fichiers JavaScript
  overrides: [
    {
      files: ["**/*.js", "**/*.jsx"],
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        // Ajouter d'autres variables globales ici si nécessaire
      },
      plugins: [
        'sonarjs',
        'unicorn',
        'complexity',
        'no-loops'
      ],
      rules: {
        // Bad Smell : Duplicated code
        'sonarjs/no-duplicate-string': 'warn',
        'sonarjs/no-identical-functions': 'warn',

        // Bad Smell : Long functions
        'max-lines-per-function': ['warn', { max: 20, skipComments: true, skipBlankLines: true }],

        // Bad Smell : Too many parameters
        'max-params': ['warn', 3],

        // Bad Smell : Long files
        'max-lines': ['warn', { max: 300, skipComments: true }],

        // Bad Smell : Magic numbers
        'no-magic-numbers': ['warn', { ignore: [0, 1], ignoreArrayIndexes: true, enforceConst: true }],

        // Bad Smell : Variable names
        'unicorn/prevent-abbreviations': 'warn',

        // Bad Smell : Global variables
        'no-undef': 'error',
        'no-global-assign': 'error',

        // Bad Smell : Cyclomatic complexity
        'complexity': ['warn', 5],

        // Bad Smell : Switch cases
        'sonarjs/no-small-switch': 'warn',
        'sonarjs/prefer-object-literal': 'warn',

        // Good Practice : Avoid using loops
        'no-loops/no-loops': 'warn',

        // Autres bonnes pratiques
        'eqeqeq': ['error', 'always'],
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'unicorn/consistent-function-scoping': 'warn'
      }
    }
  ]
};
