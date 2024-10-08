module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        // "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        "no-debugger":"off",
        "react/display-name":"off",
        "react/prop-types":"off",
        
    }
}
