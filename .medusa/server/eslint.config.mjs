import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
export default tseslint.config({ ignores: ['.medusa/**'] }, ...tseslint.configs.recommended, prettierRecommended, {
    languageOptions: {
        globals: globals.node,
        parserOptions: {
            project: true,
        },
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNsaW50LmNvbmZpZy5tanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9lc2xpbnQuY29uZmlnLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQVEsTUFBTSxtQkFBbUIsQ0FBQTtBQUN4QyxPQUFPLG1CQUFtQixNQUFNLG9DQUFvQyxDQUFBO0FBQ3BFLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQTtBQUU3QixlQUFlLFFBQVEsQ0FBQyxNQUFNLENBQzVCLEVBQUUsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFDM0IsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFDL0IsbUJBQW1CLEVBQ25CO0lBQ0UsZUFBZSxFQUFFO1FBQ2YsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJO1FBQ3JCLGFBQWEsRUFBRTtZQUNiLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLDBDQUEwQyxFQUFFLEtBQUs7UUFDakQsa0RBQWtELEVBQUUsS0FBSztRQUN6RCxtREFBbUQsRUFBRSxLQUFLO1FBQzFELG9DQUFvQyxFQUFFLEtBQUs7S0FDNUM7Q0FDRixDQUNGLENBQUEifQ==