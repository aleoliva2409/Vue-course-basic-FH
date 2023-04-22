module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  // ?? eliminar la linea si se va a usar el mock-router en cada archivo individual
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
