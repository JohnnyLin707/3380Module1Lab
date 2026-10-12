# 3380Module1Lab · JS Refresher Review

**Module 1 — JavaScript Refresher 复习题库网页**
中英双语题目 + 逐级提示 + 填空自测 + 一键查看完整原文答案（英文原文 / 中文对照讲解）

🌐 在线地址（GitHub Pages）：https://johnnylin707.github.io/3380Module1Lab/

---

## 功能 Features

| 功能 | 说明 |
| --- | --- |
| 中英双语题目 | 每题同时显示 English 题干与中文题干 |
| 逐级提示 Hint | 点击「💡 提示」逐条解锁线索，避免直接看到答案 |
| 填空自测 Fill-in-the-blank | 代码块中 `____` 处可直接输入，点「✅ 检查」即时判对错（绿/红标记） |
| 隐藏答案 | 答案默认隐藏，点「📖 显示答案」才展开，可再次收起 |
| 中英对照答案 | 答案区为「英文原文 \| 中文讲解」双栏对照 + 完整原文代码块（支持一键复制） |
| 学习进度 | 「★ 标记已掌握」记录掌握情况，顶部进度条实时更新，进度保存在浏览器本地 |
| 全局操作 | 显示全部答案 / 全部隐藏 / 重置练习 |
| 检索过滤 | 关键词搜索题目；按「全部 / 未掌握 / 已掌握」筛选 |
| 夜间模式 | 一键切换深色 / 浅色，自动记忆偏好 |

## 题目范围 Topics（9 个章节 · 23 题）

1. Statements vs. Expressions 语句 vs. 表达式
2. const, let, var & Immutability 变量声明与不可变性
3. Template Literals 模板字符串
4. Arrow Functions 箭头函数
5. Ternary Operator 三元运算符
6. Spread & Destructuring 展开运算符与解构赋值
7. Array Methods: `.map()` / `.filter()` / `.reduce()`
8. Callback Functions 回调函数
9. Object Literals 对象字面量

## 本地运行 Run locally

纯静态页面，无需构建工具：

```bash
# 方式一：直接双击打开 index.html
# 方式二：起一个本地静态服务器
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 目录结构

```
3380Module1Lab/
├── index.html              # 页面结构
├── assets/
│   ├── styles.css          # 样式（含深色模式）
│   ├── questions.js        # 题库数据（中英双语题目、提示、答案对照）
│   └── app.js              # 交互逻辑（渲染、填空、提示、答案、进度）
├── references/
│   └── lab1-original.js    # 原始 lab1.js 参考答案
└── README.md

> 发布方式：GitHub 仓库 Settings → Pages → Source 选择 `Deploy from a branch`，Branch 选 `main` / `/(root)`，保存后即可访问
> https://johnnylin707.github.io/3380Module1Lab/
```

## 修改题库 Edit questions

所有内容集中在 `assets/questions.js`，按下面的格式追加即可，页面会自动渲染：

```js
{
  id: '10-1',
  qEn: 'English question text',
  qZh: '中文题目',
  template: 'const x = ___;',        // ___ 会渲染成填空输入框
  blanks: ['1'],                     // 与 ___ 一一对应，可用 | 分隔多种可接受答案
  hints: ['提示1', '提示2'],          // 逐级解锁
  answer: {
    code: 'const x = 1;',            // 完整原文答案
    rows: [ { en: 'const x = 1;', zh: '声明常量 x 并赋值 1' } ],   // 逐句中英对照
    note: '补充说明'
  }
}
```
