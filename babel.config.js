module.exports = {
    // 使用react官方规则
    // presets: [ "react-app"],
    // 解决jsx 必需引入 React 使用这个自动引入 React
    "presets": [
        "@babel/preset-env",
       ["@babel/preset-react", {"runtime": "automatic"}]
    ],
    
    
};