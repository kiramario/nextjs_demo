import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        rules: {
            // 自定义规则
            '@typescript-eslint/no-explicit-any': 'off', // 禁用 no-explicit-any 规则
            'react/no-unescaped-entities': 'off',
            
            // 'no-console': 'warn', // 警告级别禁止 console
            // 'react/react-in-jsx-scope': 'off', // 禁用 JSX 范围检查
            '@typescript-eslint/no-unused-vars': 'off', // 禁用 no-unused-vars 规则
            "@typescript-eslint/no-unused-expressions": "off",
        },
    },
];

export default eslintConfig;
