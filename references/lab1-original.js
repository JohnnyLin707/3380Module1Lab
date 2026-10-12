//1. Statements vs. Expressions
//Lab Tasks
//• Task 1.1: Write a statement that declares a variable `city` and assigns it 
// the string "Paris".
let city = "Paris";
//• Task 1.2: Write an expression that concatenates `city` with " is beautiful" 
// and logs it.
console.log(city + " is beautiful");

//2. const, let, var & Immutability
//Lab Tasks
//• Task 2.1: Create an array `numbers = [1, 2, 3]` using const. 
// Add a new number to it.
const numbers = [1, 2, 3];
numbers.push(4);
//• Task 2.2: Create an object `settings` with properties `{ theme: "light" }`. Freeze the
//object, then try to change the theme.
const settings = { theme: "light" };
Object.freeze(settings);
settings.theme = "dark";
//• Task 2.3: Explain when you would use let instead of const.
//Answer：Use 'let' when you know the variable's value will be reassigned.

//3. Template Literals
//Lab Tasks
//• Task 3.1: Use a template literal to log a greeting with a name and day.
const userName = "Johnny";
const day = "Monday";
console.log(`Hello ${userName}, happy ${day}!`);

//• Task 3.2: Create a multiline message using a template literal.
const multilineMessage = `This is line 1.
This is line 2.
This is line 3.`;
console.log(multilineMessage);

//4. Arrow Functions
//Lab Tasks
//• Task 4.1: Write an arrow function `double` that doubles a number.
const double = (num) => num * 2;
//• Task 4.2: Write an arrow function `sayHello` with 
// no parameters that logs "Hello World!".
const sayHello = () => console.log("Hello, World!");
console.log(double(5));
sayHello();
//• Task 4.3: Document your `double` function using JSDoc.
/** 
 *  @param {number} num
 *  @returns {number}
*/

//5. Ternary Operator
//Lab Tasks
//• Task 5.1: Write a ternary expression that checks if a user is
//  logged in.
const isLoggedIn = true;
isLoggedIn ? console.log("Welcome back!") : console.log("Please log in.");
//• Task 5.2: Extend the ternary to assign the message to 
// a variable instead of logging directly.
const userStatusMessage = isLoggedIn ? "Welcome back!" : "Please log in.";
console.log(userStatusMessage);

//6. Spread & Destructuring
//Lab Tasks
//• Task 6.1: Merge two arrays using spread.
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArray = [...arr1, ...arr2];
console.log(combinedArray);
//• Task 6.2: Use destructuring to extract `firstName`.
const person = { firstName: "Johnny", lastName: "Lin", age: 27 };
//• Task 6.3: Rename `lastName` to `surname` during destructuring.
const { firstName, lastName: surname } = person;
console.log(firstName);
console.log(surname);

//7. Array Methods: .map(), .filter(), .reduce()
//Lab Tasks
//• Task 7.1: Use .map() to square numbers.
const nums = [1, 2, 3, 4, 5];
const squaredNums = nums.map(n => n ** 2);
console.log(squaredNums);
//• Task 7.2: Filter posts with title containing 'React'.
const posts = [
  { id: 1, title: "HTML and CSS" },
  { id: 2, title: "JavaScript" },
  { id: 3, title: "Learning React Basics" },
  { id: 4, title: "Advanced React" }
];
const reactPosts = posts.filter(post => post.title.includes("React"));
console.log(reactPosts);
//• Task 7.3: Use .reduce() to calculate the sum of numbers.
const totalSum = nums.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(totalSum);

//8. Callback Functions
//Lab Tasks
//• Task 8.1: Write a function `processUserInput` with a callback.
function greetUser(name) {
  console.log(`Hello, ${name}!`);
}
function processUserInput(username, callback){
if (username && username.trim() !== "") {
    callback(username);
  } else {
    console.log("Error: Username cannot be empty.");
  }
}
//• Task 8.2: Modify so the callback runs only if the username is not empty.
processUserInput("Johnny", greetUser);
processUserInput(" ", greetUser); 

//9. Object Literals
//Lab Tasks
//• Task 9.1: Create an object `car` with brand, 
// model, and year.
const car = {
  brand: "Toyota",
  model: "Sienna",
  year: 2025
};
//• Task 9.2: Access model using both dot and 
// bracket notation.
console.log(car.model);
console.log(car["model"]);
//• Task 9.3: Create an array of 3 users and 
// log the second user’s first name.
const users = [
  { firstName: "Johnny", age: 27 },
  { firstName: "Sun", age: 29 },
  { firstName: "Lee", age: 21 }
];
console.log(users[1].firstName);
