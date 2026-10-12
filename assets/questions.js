/* ============================================================
 * 3380 Module 1 — JS Refresher Review (复习题库)
 * 每个题目包含：
 *   qEn / qZh        题目（英文 / 中文）
 *   template         带 ___ 占位符的代码（会被渲染成填空输入框）
 *   blanks           每个空的参考答案（可用 | 分隔多个可接受的写法）
 *   hints            逐级提示（点击一次出现一条）
 *   answer.code      完整原文答案
 *   answer.rows      逐句中英对照讲解
 *   answer.note      补充说明
 * ============================================================ */
window.SECTIONS = [
  {
    id: 'sec-1',
    no: 1,
    titleEn: 'Statements vs. Expressions',
    titleZh: '语句 vs. 表达式',
    lead: '语句（statement）用来“执行一个动作”；表达式（expression）会“算出一个值”。',
    questions: [
      {
        id: '1-1',
        qEn: 'Write a statement that declares a variable `city` and assigns it the string "Paris".',
        qZh: '写一条语句：声明变量 `city`，并把字符串 `"Paris"` 赋给它。',
        template: '___ city = ___;',
        blanks: ['let', '"Paris"'],
        hints: [
          '需要两个东西：声明变量的关键字 + 要赋的值。',
          '值以后可能改变时用 let；字符串字面量必须带引号。',
          '完整写法：let city = "Paris";'
        ],
        answer: {
          code: 'let city = "Paris";',
          rows: [
            { en: 'let city', zh: '用 let 声明变量 city（块级作用域，允许后续重新赋值）' },
            { en: '"Paris"', zh: '把字符串字面量 "Paris" 作为初始值赋给 city' }
          ],
          note: '整行是一条语句：它执行了“声明变量并赋值”这个动作。'
        }
      },
      {
        id: '1-2',
        qEn: 'Write an expression that concatenates `city` with " is beautiful" and logs it.',
        qZh: '写一个表达式：把 `city` 与 `" is beautiful"` 拼接后输出（log）到控制台。',
        template: 'console.log(city ___ " is beautiful");',
        blanks: ['+'],
        hints: [
          '想想字符串拼接用的是哪个运算符？',
          'city 本身已经是字符串，直接用加号连接两段文本即可。',
          '完整写法：console.log(city + " is beautiful");  // Paris is beautiful'
        ],
        answer: {
          code: 'console.log(city + " is beautiful");',
          rows: [
            { en: 'city + " is beautiful"', zh: '表达式：用 + 拼接变量与字符串，得到 "Paris is beautiful"' },
            { en: 'console.log( ... )', zh: '把拼接结果输出到控制台' }
          ],
          note: '注意区分：city + " is beautiful" 这部分是表达式（产生一个值），console.log(...) 整行是语句。'
        }
      }
    ]
  },

  {
    id: 'sec-2',
    no: 2,
    titleEn: 'const, let, var & Immutability',
    titleZh: 'const / let / var 与不可变性',
    lead: 'const 锁定的是“变量指向的地址”，不等于对象内容不可改；Object.freeze() 才是浅层冻结。',
    questions: [
      {
        id: '2-1',
        qEn: 'Create an array `numbers = [1, 2, 3]` using const, then add a new number to it.',
        qZh: '用 `const` 创建数组 `numbers = [1, 2, 3]`，然后往里面添加一个新数字。',
        template: 'const numbers = [1, 2, 3];\nnumbers.___(4);',
        blanks: ['push'],
        hints: [
          'const 不能重新赋值，但数组是引用类型，内容仍然可以改。',
          '往数组末尾追加元素的方法名是 p 开头。',
          '完整写法：numbers.push(4);  // [1, 2, 3, 4]'
        ],
        answer: {
          code: 'const numbers = [1, 2, 3];\nnumbers.push(4);',
          rows: [
            { en: 'const numbers = [1, 2, 3];', zh: 'const 声明数组：不能再把 numbers 指向别的数组' },
            { en: 'numbers.push(4);', zh: 'push() 在末尾追加元素 4，数组内容被修改是允许的' }
          ],
          note: '这正是 const 的关键点：禁止“重新赋值”，但不禁止“修改内部内容”。'
        }
      },
      {
        id: '2-2',
        qEn: 'Create an object `settings` with the property `{ theme: "light" }`. Freeze the object, then try to change the theme.',
        qZh: '创建对象 `settings`，属性为 `{ theme: "light" }`；冻结该对象，然后尝试修改 theme。',
        template: 'const settings = { theme: "___" };\nObject.___(settings);\nsettings.theme = "___";',
        blanks: ['light', 'freeze', 'dark'],
        hints: [
          '初始属性值写在第一行：{ theme: "light" }。',
          '冻结对象使用 Object.freeze(obj)。',
          '尝试修改：settings.theme = "dark"; —— 非严格模式下静默失败，严格模式下抛 TypeError。'
        ],
        answer: {
          code: 'const settings = { theme: "light" };\nObject.freeze(settings);\nsettings.theme = "dark";',
          rows: [
            { en: 'const settings = { theme: "light" };', zh: '创建一个包含 theme 属性的对象字面量' },
            { en: 'Object.freeze(settings);', zh: '冻结对象：属性不可增删改（浅层冻结，嵌套对象不受影响）' },
            { en: 'settings.theme = "dark";', zh: '尝试修改无效：读取 settings.theme 仍然得到 "light"' }
          ],
          note: '冻结后赋值在非严格模式会被忽略；若文件顶部写了 "use strict"，则会抛出 TypeError。'
        }
      },
      {
        id: '2-3',
        qEn: 'Explain when you would use let instead of const.',
        qZh: '说明什么时候应该用 `let` 而不是 `const`。',
        template: 'Use ___ when the variable\'s value will be ___ later.',
        blanks: ['let', 'reassigned'],
        hints: [
          '默认优先用 const，只有一种情况才换成 let。',
          '关键词是“值会被再次赋值”。',
          '完整句子：Use let when the variable\'s value will be reassigned.'
        ],
        answer: {
          code: 'Use let when the variable\'s value will be reassigned.',
          rows: [
            { en: "Use 'let'", zh: '使用 let（块级作用域，可重新赋值）' },
            { en: "when the variable's value will be reassigned", zh: '当这个变量的值后续还会被重新赋值时' }
          ],
          note: '经验法则：默认 const；需要重新赋值（如计数器 i、循环中变化的值）才用 let；新代码避免使用 var（函数作用域、存在变量提升）。'
        }
      }
    ]
  },

  {
    id: 'sec-3',
    no: 3,
    titleEn: 'Template Literals',
    titleZh: '模板字符串',
    lead: '用反引号 ` 包裹，${} 插值，还能原生保留换行。',
    questions: [
      {
        id: '3-1',
        qEn: 'Use a template literal to log a greeting with a name and a day.',
        qZh: '用模板字符串输出一句问候语，内容包含姓名和星期。',
        template: 'const userName = "Johnny";\nconst day = "Monday";\nconsole.log(`Hello ${___}, happy ${___}!`);',
        blanks: ['userName', 'day'],
        hints: [
          '模板字符串用反引号（backtick ` ）而不是单双引号。',
          '插值（把变量塞进字符串）的语法是 ${变量名}。',
          '完整写法：console.log(`Hello ${userName}, happy ${day}!`);'
        ],
        answer: {
          code: 'const userName = "Johnny";\nconst day = "Monday";\nconsole.log(`Hello ${userName}, happy ${day}!`);',
          rows: [
            { en: 'const userName = "Johnny";', zh: '定义姓名变量，值不会变所以用 const' },
            { en: 'const day = "Monday";', zh: '定义星期变量' },
            { en: '`Hello ${userName}, happy ${day}!`', zh: '模板字符串：${userName} 与 ${day} 会被替换成变量的值' }
          ],
          note: '输出结果：Hello Johnny, happy Monday!'
        }
      },
      {
        id: '3-2',
        qEn: 'Create a multiline message using a template literal.',
        qZh: '用模板字符串创建一段多行文本，并输出它。',
        template: 'const ___ = `This is line 1.\nThis is line 2.\nThis is line 3.`;\n___(___);',
        blanks: ['multilineMessage', 'console.log', 'multilineMessage'],
        hints: [
          '模板字符串可以直接换行书写，不需要 \\n 转义。',
          '把整段多行文本保存到变量里，变量命名要有意义。',
          '完整写法：const multilineMessage = `This is line 1. …`; console.log(multilineMessage);'
        ],
        answer: {
          code: 'const multilineMessage = `This is line 1.\nThis is line 2.\nThis is line 3.`;\nconsole.log(multilineMessage);',
          rows: [
            { en: 'const multilineMessage = `…`', zh: '用反引号定义多行字符串，换行会被原样保留' },
            { en: 'console.log(multilineMessage);', zh: '输出时会显示为三行文本' }
          ],
          note: '如果用普通引号写多行需要拼接字符串或写 \\n，而模板字符串天然支持多行。'
        }
      }
    ]
  },

  {
    id: 'sec-4',
    no: 4,
    titleEn: 'Arrow Functions',
    titleZh: '箭头函数',
    lead: '(参数) => 返回值；单参数可省括号，单表达式可省 return 与大括号。',
    questions: [
      {
        id: '4-1',
        qEn: 'Write an arrow function `double` that doubles a number.',
        qZh: '写一个箭头函数 `double`，返回参数的 2 倍。',
        template: 'const double = (___) => ___ * 2;',
        blanks: ['num', 'num'],
        hints: [
          '箭头函数的写法：const 名字 = (参数) => 返回值;',
          '只有一个表达式时可以同时省略 return 和 {}（隐式返回）。',
          '完整写法：const double = (num) => num * 2;'
        ],
        answer: {
          code: 'const double = (num) => num * 2;',
          rows: [
            { en: 'const double =', zh: '把箭头函数赋值给常量 double' },
            { en: '(num) =>', zh: '参数只有一个，括号可写可不写（num => 也可以）' },
            { en: 'num * 2;', zh: '隐式返回：无需 return，表达式结果即返回值' }
          ],
          note: '调用：double(5) → 10。如果需要写多条语句，则必须用 {} 并显式 return。'
        }
      },
      {
        id: '4-2',
        qEn: 'Write an arrow function `sayHello` with no parameters that logs "Hello World!".',
        qZh: '写一个无参数的箭头函数 `sayHello`，输出 `"Hello World!"`。',
        template: 'const sayHello = () => ___("Hello, World!");',
        blanks: ['console.log'],
        hints: [
          '没有参数时，箭头前必须保留一对空括号 ()。',
          '函数体要“打印”内容，调用谁？',
          '完整写法：const sayHello = () => console.log("Hello, World!");'
        ],
        answer: {
          code: 'const sayHello = () => console.log("Hello, World!");',
          rows: [
            { en: 'const sayHello = () =>', zh: '空括号表示没有参数（不能省略）' },
            { en: 'console.log("Hello, World!");', zh: '函数体是一句输出语句' }
          ],
          note: '调用 sayHello() 后控制台打印 Hello, World!'
        }
      },
      {
        id: '4-3',
        qEn: 'Document your `double` function using JSDoc.',
        qZh: '用 JSDoc 为 `double` 函数写注释文档。',
        template: '/**\n * @param {___} num\n * @returns {___}\n */\nconst double = (num) => num * 2;',
        blanks: ['number', 'number'],
        hints: [
          'JSDoc 注释以 /** 开头（注意是两个星号）。',
          '@param {类型} 参数名 描述参数；@returns {类型} 描述返回值。',
          'num 和返回值都是什么类型？都是 number。'
        ],
        answer: {
          code: '/**\n * @param {number} num\n * @returns {number}\n */\nconst double = (num) => num * 2;',
          rows: [
            { en: '/** … */', zh: 'JSDoc 块注释，编辑器会据此给出类型提示' },
            { en: '@param {number} num', zh: '参数 num 的类型是 number' },
            { en: '@returns {number}', zh: '返回值类型也是 number' }
          ],
          note: 'VS Code 支持 JSDoc：鼠标悬停函数时会显示这里写的类型与说明。'
        }
      }
    ]
  },

  {
    id: 'sec-5',
    no: 5,
    titleEn: 'Ternary Operator',
    titleZh: '三元运算符',
    lead: 'condition ? 值A : 值B —— if/else 的表达式写法，本身会产生一个值。',
    questions: [
      {
        id: '5-1',
        qEn: 'Write a ternary expression that checks if a user is logged in.',
        qZh: '用三元表达式判断用户是否已登录并输出对应信息。',
        template: 'const isLoggedIn = true;\nisLoggedIn ___ console.log("Welcome back!") ___ console.log("Please log in.");',
        blanks: ['?', ':'],
        hints: [
          '三元运算符由两个符号把表达式分成三段。',
          '问号前面是条件，问号和冒号之间是“条件为真时”的执行内容。',
          '完整写法：isLoggedIn ? console.log("Welcome back!") : console.log("Please log in.");'
        ],
        answer: {
          code: 'const isLoggedIn = true;\nisLoggedIn ? console.log("Welcome back!") : console.log("Please log in.");',
          rows: [
            { en: 'const isLoggedIn = true;', zh: '布尔状态变量' },
            { en: 'isLoggedIn ?', zh: '条件为真时执行冒号左侧' },
            { en: ': console.log("Please log in.");', zh: '条件为假时执行冒号右侧' }
          ],
          note: '输出：Welcome back!'
        }
      },
      {
        id: '5-2',
        qEn: 'Extend the ternary to assign the message to a variable instead of logging directly.',
        qZh: '改造上面的三元表达式：不再直接输出，而是把结果信息赋给一个变量。',
        template: 'const userStatusMessage = isLoggedIn ___ "Welcome back!" ___ "Please log in.";\nconsole.log(userStatusMessage);',
        blanks: ['?', ':'],
        hints: [
          '三元运算符是一个表达式，所以它可以直接放在 = 右边。',
          '两个分支现在都只是字符串，不再调用 console.log。',
          '完整写法：const userStatusMessage = isLoggedIn ? "Welcome back!" : "Please log in.";'
        ],
        answer: {
          code: 'const userStatusMessage = isLoggedIn ? "Welcome back!" : "Please log in.";\nconsole.log(userStatusMessage);',
          rows: [
            { en: 'const userStatusMessage =', zh: '声明变量接收三元表达式的结果' },
            { en: 'isLoggedIn ? "Welcome back!" : "Please log in."', zh: '表达式的值取决于条件真假' },
            { en: 'console.log(userStatusMessage);', zh: '统一在后面输出' }
          ],
          note: '这是三元的典型用法：根据条件“产生一个值”，而不是执行两条互斥语句。'
        }
      }
    ]
  },

  {
    id: 'sec-6',
    no: 6,
    titleEn: 'Spread & Destructuring',
    titleZh: '展开运算符与解构赋值',
    lead: '... 把数组/对象“摊开”；解构可以把属性一次性取出来并重命名为局部变量。',
    questions: [
      {
        id: '6-1',
        qEn: 'Merge two arrays using spread.',
        qZh: '用展开运算符合并两个数组。',
        template: 'const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combinedArray = [___arr1, ___arr2];\nconsole.log(combinedArray);',
        blanks: ['...', '...'],
        hints: [
          '展开运算符是三个连续的点。',
          '它写在这里：把数组元素逐个摊开放进新数组里。',
          '完整写法：const combinedArray = [...arr1, ...arr2];  // [1,2,3,4,5,6]'
        ],
        answer: {
          code: 'const arr1 = [1, 2, 3];\nconst arr2 = [4, 5, 6];\nconst combinedArray = [...arr1, ...arr2];\nconsole.log(combinedArray);',
          rows: [
            { en: 'const arr1 = [1, 2, 3];', zh: '第一个数组' },
            { en: 'const arr2 = [4, 5, 6];', zh: '第二个数组' },
            { en: '[...arr1, ...arr2]', zh: '展开两个数组的元素，生成全新的数组（不修改原数组）' }
          ],
          note: '输出：[1, 2, 3, 4, 5, 6]。用 [...arr1] 还可以快速复制数组。'
        }
      },
      {
        id: '6-2',
        qEn: 'Use destructuring to extract `firstName` from `person`.',
        qZh: '用解构赋值从 `person` 中取出 `firstName`。',
        template: 'const person = { firstName: "Johnny", lastName: "Lin", age: 27 };\nconst { ___ } = person;\nconsole.log(firstName);',
        blanks: ['firstName'],
        hints: [
          '对象解构：const { 属性名 } = 对象;',
          '属性名必须和对象里的 key 完全一致才取得到。',
          '完整写法：const { firstName } = person;'
        ],
        answer: {
          code: 'const person = { firstName: "Johnny", lastName: "Lin", age: 27 };\nconst { firstName } = person;\nconsole.log(firstName);',
          rows: [
            { en: 'const person = {…}', zh: '定义一个包含三个属性的对象' },
            { en: 'const { firstName } = person;', zh: '按属性名取值，创建同名局部变量 firstName' }
          ],
          note: '输出：Johnny'
        }
      },
      {
        id: '6-3',
        qEn: 'Rename `lastName` to `surname` during destructuring.',
        qZh: '解构时把 `lastName` 重命名为 `surname`。',
        template: 'const { firstName, ___: ___ } = person;\nconsole.log(firstName);\nconsole.log(surname);',
        blanks: ['lastName', 'surname'],
        hints: [
          '重命名语法：{ 原属性名: 新变量名 }。',
          '冒号左边是对象里原有的 key，右边是你想用的新名字。',
          '完整写法：const { firstName, lastName: surname } = person;'
        ],
        answer: {
          code: 'const { firstName, lastName: surname } = person;\nconsole.log(firstName);\nconsole.log(surname);',
          rows: [
            { en: 'lastName: surname', zh: '取 person.lastName 的值，赋给名叫 surname 的变量' },
            { en: 'console.log(surname);', zh: '输出 Lin（原来的 lastName 变量并不存在）' }
          ],
          note: '输出：Johnny / Lin。'
        }
      }
    ]
  },

  {
    id: 'sec-7',
    no: 7,
    titleEn: 'Array Methods: .map() / .filter() / .reduce()',
    titleZh: '数组方法：map / filter / reduce',
    lead: 'map 映射出新数组；filter 按条件筛选子集；reduce 累积成一个值。三者都不改变原数组。',
    questions: [
      {
        id: '7-1',
        qEn: 'Use .map() to square the numbers.',
        qZh: '用 `.map()` 求出数组中每个数字的平方。',
        template: 'const nums = [1, 2, 3, 4, 5];\nconst squaredNums = nums.___(___ => ___ ** 2);\nconsole.log(squaredNums);',
        blanks: ['map', 'n', 'n'],
        hints: [
          '要得到一个“长度相同、值被加工过”的新数组 → map。',
          'map 接收回调函数，参数是每个元素（这里可以叫 n）。',
          '完整写法：nums.map(n => n ** 2)'
        ],
        answer: {
          code: 'const nums = [1, 2, 3, 4, 5];\nconst squaredNums = nums.map(n => n ** 2);\nconsole.log(squaredNums);',
          rows: [
            { en: 'nums.map(…)', zh: '遍历每个元素，返回一个新数组' },
            { en: 'n => n ** 2', zh: '回调：n 是当前元素，** 是幂运算符，等价于 n * n' }
          ],
          note: '输出：[1, 4, 9, 16, 25]'
        }
      },
      {
        id: '7-2',
        qEn: "Filter posts whose title contains 'React'.",
        qZh: "筛选出标题中包含 `'React'` 的文章。",
        template: 'const reactPosts = posts.___(post => post.title.___("React"));\nconsole.log(reactPosts);',
        blanks: ['filter', 'includes'],
        hints: [
          '要按条件挑出一部分元素 → filter（回调返回 true 才保留）。',
          '判断字符串是否包含某子串的方法名是 i 开头。',
          '完整写法：posts.filter(post => post.title.includes("React"))'
        ],
        answer: {
          code: 'const posts = [\n  { id: 1, title: "HTML and CSS" },\n  { id: 2, title: "JavaScript" },\n  { id: 3, title: "Learning React Basics" },\n  { id: 4, title: "Advanced React" }\n];\nconst reactPosts = posts.filter(post => post.title.includes("React"));\nconsole.log(reactPosts);',
          rows: [
            { en: 'posts.filter(post => …)', zh: '遍历数组，回调返回 true 的元素进入结果数组' },
            { en: 'post.title.includes("React")', zh: 'includes 判断字符串是否包含子串，返回布尔值' }
          ],
          note: '输出：id 3 "Learning React Basics" 和 id 4 "Advanced React" 两个对象。'
        }
      },
      {
        id: '7-3',
        qEn: 'Use .reduce() to calculate the sum of numbers.',
        qZh: '用 `.reduce()` 计算所有数字之和。',
        template: 'const totalSum = nums.___((accumulator, currentValue) => accumulator + currentValue, ___);\nconsole.log(totalSum);',
        blanks: ['reduce', '0'],
        hints: [
          '把一堆值“累积”成一个值 → reduce。',
          'reduce 的第二个参数是累加器的初始值。',
          '完整写法：nums.reduce((acc, cur) => acc + cur, 0)'
        ],
        answer: {
          code: 'const totalSum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);\nconsole.log(totalSum);',
          rows: [
            { en: 'nums.reduce(callback, 0)', zh: '0 是 accumulator 的初始值（不写则默认用第一个元素）' },
            { en: '(accumulator, currentValue) => accumulator + currentValue', zh: '把当前值加到累加器上，返回新的累加器' }
          ],
          note: '输出：15。省略初始值时若数组为空会报错，建议总是写初始值。'
        }
      }
    ]
  },

  {
    id: 'sec-8',
    no: 8,
    titleEn: 'Callback Functions',
    titleZh: '回调函数',
    lead: '函数可以像普通值一样被当作参数传入，在合适的时机被调用 —— 这就是回调。',
    questions: [
      {
        id: '8-1',
        qEn: 'Write a function `processUserInput` that takes a callback.',
        qZh: '写一个接收回调函数的 `processUserInput` 函数。',
        template: 'function greetUser(name) {\n  console.log(`Hello, ${name}!`);\n}\nfunction processUserInput(username, callback) {\n  ___(___);\n}',
        blanks: ['callback', 'username'],
        hints: [
          '回调就是一个“被传进来的函数”，调用它的方式和普通函数一样。',
          '要把收到的 username 再交给这个回调函数处理。',
          '完整写法：callback(username);'
        ],
        answer: {
          code: 'function greetUser(name) {\n  console.log(`Hello, ${name}!`);\n}\nfunction processUserInput(username, callback) {\n  if (username && username.trim() !== "") {\n    callback(username);\n  } else {\n    console.log("Error: Username cannot be empty.");\n  }\n}',
          rows: [
            { en: 'function greetUser(name) {…}', zh: '普通函数：负责打招呼（这就是将来要传入的回调）' },
            { en: 'function processUserInput(username, callback)', zh: '第二个参数 callback 是一个函数' },
            { en: 'callback(username);', zh: '在函数内部调用传进来的函数 —— 回调的执行点' }
          ],
          note: '调用方式：processUserInput("Johnny", greetUser); —— 注意 greetUser 后面不加括号，传的是函数本身。'
        }
      },
      {
        id: '8-2',
        qEn: 'Modify the function so the callback runs only if the username is not empty, then test both cases.',
        qZh: '改造函数：只有当用户名不为空时才执行回调，并用两种情况测试（正常值与空字符串）。',
        template: 'function processUserInput(username, callback) {\n  if (username && username.___() !== "") {\n    callback(username);\n  } else {\n    console.log("Error: Username cannot be empty.");\n  }\n}\nprocessUserInput("Johnny", ___);\nprocessUserInput(" ", greetUser);',
        blanks: ['trim', 'greetUser'],
        hints: [
          '只含空格的字符串也算“空”，用什么方法去掉首尾空格？',
          '判空逻辑：username && username.trim() !== ""。',
          '调用时把 greetUser 这个函数名作为第二个参数传入（不加括号）。'
        ],
        answer: {
          code: 'processUserInput("Johnny", greetUser);\nprocessUserInput(" ", greetUser);',
          rows: [
            { en: 'if (username && username.trim() !== "")', zh: '先确保 username 存在，再去空格后判断是否非空' },
            { en: 'callback(username);', zh: '非空才执行回调' },
            { en: 'else { console.log("Error: Username cannot be empty."); }', zh: '空值走错误分支' },
            { en: 'processUserInput(" ", greetUser);', zh: '空格字符串经 trim 后为空 → 打印错误提示' }
          ],
          note: '输出：Hello, Johnny! 然后 Error: Username cannot be empty.'
        }
      }
    ]
  },

  {
    id: 'sec-9',
    no: 9,
    titleEn: 'Object Literals',
    titleZh: '对象字面量',
    lead: '用 { key: value } 创建对象；属性可点号访问，也可用方括号（键名是变量或含特殊字符时必须用）。',
    questions: [
      {
        id: '9-1',
        qEn: 'Create an object `car` with brand, model, and year.',
        qZh: '创建对象 `car`，包含 brand、model、year 三个属性。',
        template: 'const car = {\n  brand: "___",\n  model: "___",\n  year: ___\n};',
        blanks: ['Toyota', 'Sienna', '2025'],
        hints: [
          '对象字面量语法：{ 属性名: 值 }，属性之间用逗号分隔。',
          'brand 和 model 是字符串要加引号，year 是数字不加引号。',
          '完整写法：brand: "Toyota", model: "Sienna", year: 2025'
        ],
        answer: {
          code: 'const car = {\n  brand: "Toyota",\n  model: "Sienna",\n  year: 2025\n};',
          rows: [
            { en: 'const car = {', zh: '用字面量创建对象并赋给常量 car' },
            { en: 'brand: "Toyota",', zh: '字符串类型的属性 brand' },
            { en: 'year: 2025', zh: '数字类型的属性 year（最后一项可以不加逗号）' }
          ],
          note: '注意是常量 car 指向的对象内容仍可修改（car.year = 2026 是允许的）。'
        }
      },
      {
        id: '9-2',
        qEn: 'Access `model` using both dot notation and bracket notation.',
        qZh: '分别用点表示法和方括号表示法访问 `model` 属性。',
        template: 'console.log(car.___);\nconsole.log(car[___]);',
        blanks: ['model', '"model"'],
        hints: [
          '点表示法：对象名.属性名。',
          '方括号里必须放“字符串”（或值为字符串的表达式）。',
          '完整写法：car.model 与 car["model"]'
        ],
        answer: {
          code: 'console.log(car.model);\nconsole.log(car["model"]);',
          rows: [
            { en: 'car.model', zh: '点表示法：最常用，属性名必须是合法标识符' },
            { en: 'car["model"]', zh: '方括号表示法：键名写成字符串；键名含空格、连字符或来自变量时必须用它' }
          ],
          note: '两种写法输出相同：Sienna'
        }
      },
      {
        id: '9-3',
        qEn: 'Create an array of 3 users and log the second user\'s first name.',
        qZh: '创建包含 3 个用户的数组，并输出第二个用户的 firstName。',
        template: 'const users = [\n  { firstName: "Johnny", age: 27 },\n  { firstName: "Sun", age: 29 },\n  { firstName: "Lee", age: 21 }\n];\nconsole.log(___[___].___);',
        blanks: ['users', '1', 'firstName'],
        hints: [
          '数组下标从 0 开始，所以“第二个”的下标是几？',
          '先取出数组元素 users[1]，再取它的属性。',
          '完整写法：console.log(users[1].firstName);'
        ],
        answer: {
          code: 'const users = [\n  { firstName: "Johnny", age: 27 },\n  { firstName: "Sun", age: 29 },\n  { firstName: "Lee", age: 21 }\n];\nconsole.log(users[1].firstName);',
          rows: [
            { en: 'const users = [ {…}, {…}, {…} ];', zh: '对象数组：每个元素都是一个用户对象' },
            { en: 'users[1]', zh: '下标 1 表示第二个元素（从 0 开始计数）' },
            { en: 'users[1].firstName', zh: '取出该对象的 firstName 属性' }
          ],
          note: '输出：Sun'
        }
      }
    ]
  }
];
