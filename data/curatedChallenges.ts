export interface Option {
  id: string; // "A" | "B" | "C" | "D"
  text: string;
  isCorrect: boolean;
  misconception?: string;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  concept: string;
  language: "javascript" | "python" | "typescript";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  code: string;
  question: string;
  options: Option[];
  followUp: {
    title: string;
    code: string;
    question: string;
    targetedMisconception: string;
    options: Option[];
  };
}

export const CURATED_CHALLENGES: Challenge[] = [
  {
    id: "js-closure-loop",
    title: "Closure & Loop Variable Scoping",
    concept: "Variable Scoping & Closure Capture",
    language: "javascript",
    difficulty: "Intermediate",
    category: "JavaScript Foundations",
    code: `const funcs = [];

for (var i = 0; i < 3; i++) {
  funcs.push(() => i);
}

console.log(funcs[0](), funcs[1](), funcs[2]());`,
    question: "What will this code print to the console?",
    options: [
      {
        id: "A",
        text: "0 1 2",
        isCorrect: false,
        misconception: "Assumed 'var' creates a new variable per loop iteration or has block scope.",
        explanation:
          "In JavaScript, 'var' is function-scoped (or globally scoped here), not block-scoped. All three arrow functions share the exact same 'i' reference in memory, which equals 3 by the time the loop finishes.",
      },
      {
        id: "B",
        text: "3 3 3",
        isCorrect: true,
        explanation:
          "Correct! Because 'var' is hoisted and scoped to the enclosing function/global context, only one variable 'i' exists. Each closure retains a reference to this same variable, which has value 3 after the loop terminates.",
      },
      {
        id: "C",
        text: "undefined undefined undefined",
        isCorrect: false,
        misconception: "Assumed 'i' is garbage collected or inaccessible outside the loop body.",
        explanation:
          "'var' is hoisted to function scope and remains accessible. It is not undefined; its numeric value is 3.",
      },
      {
        id: "D",
        text: "ReferenceError: i is not defined",
        isCorrect: false,
        misconception: "Assumed 'var' is trapped inside the for loop block.",
        explanation:
          "'var' does not respect block boundaries (curly braces). It hoists to the nearest enclosing function or global scope.",
      },
    ],
    followUp: {
      title: "Follow-up: Block Scoping with 'let'",
      code: `const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs.push(() => i);
}

console.log(funcs[0](), funcs[1](), funcs[2]());`,
      question: "Now that 'var' is replaced with 'let', what will be printed?",
      targetedMisconception: "Block Scoping with 'let' vs Function Scoping with 'var'",
      options: [
        {
          id: "A",
          text: "0 1 2",
          isCorrect: true,
          explanation:
            "Spot on! With ES6 'let', a brand-new lexical scope binding is created for every iteration of the loop, so each closure captures its own independent snapshot of 'i'.",
        },
        {
          id: "B",
          text: "3 3 3",
          isCorrect: false,
          misconception: "Thought 'let' behaves identical to 'var' across loop iterations.",
          explanation:
            "Unlike 'var', JavaScript engines create a fresh lexical binding of 'let' for each loop iteration.",
        },
        {
          id: "C",
          text: "2 2 2",
          isCorrect: false,
          misconception: "Confused zero-indexing with loop termination conditions.",
          explanation: "Each iteration captures 0, 1, and 2 respectively.",
        },
        {
          id: "D",
          text: "0 undefined undefined",
          isCorrect: false,
          misconception: "Assumed subsequent let declarations overwrite the first.",
          explanation: "Each push captures that iteration's distinct binding.",
        },
      ],
    },
  },
  {
    id: "py-mutable-defaults",
    title: "Mutable Default Arguments",
    concept: "Function Definition-Time Evaluation",
    language: "python",
    difficulty: "Intermediate",
    category: "Python Internals",
    code: `def append_item(val, items=[]):
    items.append(val)
    return items

print(append_item("apple"))
print(append_item("banana"))`,
    question: "What will the two print statements output?",
    options: [
      {
        id: "A",
        text: "['apple'] then ['banana']",
        isCorrect: false,
        misconception: "Assumed default argument 'items=[]' creates a new empty list on every call.",
        explanation:
          "In Python, default arguments are evaluated only once when the function is defined (at module load time), not every time the function is called. The exact same list object is reused across all invocations.",
      },
      {
        id: "B",
        text: "['apple'] then ['apple', 'banana']",
        isCorrect: true,
        explanation:
          "Correct! Because Python evaluates default expressions once at definition time, 'items' points to the same list in memory. Appending to it modifies that shared list across subsequent calls.",
      },
      {
        id: "C",
        text: "['apple'] then None",
        isCorrect: false,
        misconception: "Assumed items.append() returns None and overrides return items.",
        explanation:
          "While list.append() returns None, the function explicitly does 'return items', which returns the modified list.",
      },
      {
        id: "D",
        text: "['apple', 'apple'] then ['banana', 'banana']",
        isCorrect: false,
        misconception: "Assumed val gets duplicated into the argument list.",
        explanation:
          "Each call only appends 'val' once; but the second call inherits the previously appended item.",
      },
    ],
    followUp: {
      title: "Follow-up: The Sentinel 'None' Pattern",
      code: `def append_item(val, items=None):
    if items is None:
        items = []
    items.append(val)
    return items

print(append_item("apple"))
print(append_item("banana"))`,
      question: "With the standard idiomatic 'items=None' pattern, what will be printed?",
      targetedMisconception: "Definition-time mutable argument vs Runtime initialization",
      options: [
        {
          id: "A",
          text: "['apple'] then ['banana']",
          isCorrect: true,
          explanation:
            "Exactly right! By using 'None' as an immutable sentinel, a fresh empty list is instantiated inside the function body on each call when no argument is supplied.",
        },
        {
          id: "B",
          text: "['apple'] then ['apple', 'banana']",
          isCorrect: false,
          misconception: "Thought Python retains state even with items = [].",
          explanation:
            "Re-assigning items = [] inside the function creates a brand new local list object on that invocation.",
        },
        {
          id: "C",
          text: "None then None",
          isCorrect: false,
          misconception: "Thought default None is always returned.",
          explanation: "The if check replaces None with [].",
        },
        {
          id: "D",
          text: "Error: AttributeError",
          isCorrect: false,
          misconception: "Expected None.append() to fail before the if check.",
          explanation: "The if statement safely checks for None first.",
        },
      ],
    },
  },
  {
    id: "js-event-loop-microtasks",
    title: "Event Loop & Microtask Priority",
    concept: "Asynchronous Queue Order",
    language: "javascript",
    difficulty: "Advanced",
    category: "JavaScript Concurrency",
    code: `console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");`,
    question: "What exact sequence of numbers will be logged to the console?",
    options: [
      {
        id: "A",
        text: "1, 4, 3, 2",
        isCorrect: true,
        explanation:
          "Correct! 1 and 4 run synchronously in the call stack. When synchronous execution finishes, the event loop drains the entire microtask queue (Promise callback 3) before processing the macrotask/task queue (setTimeout callback 2).",
      },
      {
        id: "B",
        text: "1, 2, 3, 4",
        isCorrect: false,
        misconception: "Assumed asynchronous operations execute sequentially in code order.",
        explanation:
          "setTimeout and Promise callbacks are asynchronous and are deferred to queues; synchronous lines 1 and 4 execute first.",
      },
      {
        id: "C",
        text: "1, 4, 2, 3",
        isCorrect: false,
        misconception: "Assumed setTimeout with delay 0ms runs before Promise microtasks.",
        explanation:
          "The microtask queue (Promises, queueMicrotask) has higher priority than the macrotask queue (setTimeout, setInterval). All microtasks are exhausted before the next macrotask is picked up.",
      },
      {
        id: "D",
        text: "1, 3, 4, 2",
        isCorrect: false,
        misconception: "Assumed Promise.then() runs synchronously on resolution.",
        explanation:
          "Even a settled Promise.resolve() schedules its .then callback as a microtask, running only after current call stack (1 and 4) completes.",
      },
    ],
    followUp: {
      title: "Follow-up: queueMicrotask vs setTimeout",
      code: `setTimeout(() => console.log("A"), 0);
queueMicrotask(() => console.log("B"));
console.log("C");`,
      question: "What is the logging order of A, B, and C?",
      targetedMisconception: "Microtask Queue Precedence over Task Queue",
      options: [
        {
          id: "A",
          text: "C, B, A",
          isCorrect: true,
          explanation:
            "Spot on! C is synchronous. queueMicrotask schedules B on the microtask queue. setTimeout schedules A on the timer macrotask queue. Microtasks always drain before macrotasks.",
        },
        {
          id: "B",
          text: "C, A, B",
          isCorrect: false,
          misconception: "Thought setTimeout(0) fires before microtasks.",
          explanation:
            "Timers are macrotasks; microtasks always have absolute priority when the call stack clears.",
        },
        {
          id: "C",
          text: "A, B, C",
          isCorrect: false,
          misconception: "Assumed registration order dictates asynchronous execution.",
          explanation: "Synchronous code C runs before any queues.",
        },
        {
          id: "D",
          text: "B, C, A",
          isCorrect: false,
          misconception: "Thought queueMicrotask preempts synchronous execution.",
          explanation: "Current script execution cannot be interrupted.",
        },
      ],
    },
  },
  {
    id: "react-stale-closures",
    title: "React Stale Closures in Hooks",
    concept: "Component Renders & Functional Updaters",
    language: "javascript",
    difficulty: "Advanced",
    category: "React Mental Models",
    code: `const [count, setCount] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []); // Empty dependency array`,
    question: "After 3 seconds, what number is rendered on the screen?",
    options: [
      {
        id: "A",
        text: "1",
        isCorrect: true,
        explanation:
          "Correct! Because the useEffect dependency array is empty, the effect callback runs only once on mount. The setInterval callback closes over the initial render's 'count' (which is 0). Every second it runs setCount(0 + 1), endlessly resetting count to 1!",
      },
      {
        id: "B",
        text: "3",
        isCorrect: false,
        misconception: "Assumed state variables in closures automatically stay current with re-renders.",
        explanation:
          "Each render in React has its own scope and snapshot of state. The closure inside setInterval only knows 'count' as 0 because the effect never re-ran to capture new render scopes.",
      },
      {
        id: "C",
        text: "0",
        isCorrect: false,
        misconception: "Assumed setCount is ignored inside intervals.",
        explanation:
          "setCount(0 + 1) does execute and updates count to 1 on the first second, but then keeps updating to 1.",
      },
      {
        id: "D",
        text: "NaN",
        isCorrect: false,
        misconception: "Assumed count is lost or undefined.",
        explanation: "count is 0, so 0 + 1 evaluates to valid number 1.",
      },
    ],
    followUp: {
      title: "Follow-up: Functional State Updates",
      code: `useEffect(() => {
  const timer = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);
  return () => clearInterval(timer);
}, []);`,
      question: "With setCount(prev => prev + 1), what will count be after 3 seconds?",
      targetedMisconception: "Stale Closure in useEffect vs Functional State Updaters",
      options: [
        {
          id: "A",
          text: "3",
          isCorrect: true,
          explanation:
            "Bingo! The functional updater form receives the most recent pending state ('prev') at the moment the update is processed, without relying on closed-over values.",
        },
        {
          id: "B",
          text: "1",
          isCorrect: false,
          misconception: "Thought functional updaters are still vulnerable to stale closures.",
          explanation:
            "Functional updaters do not close over render-specific state; React supplies the latest state as the argument.",
        },
        {
          id: "C",
          text: "0",
          isCorrect: false,
          misconception: "Thought empty deps prevents state changes.",
          explanation: "Empty deps prevents effect re-running, not state dispatch.",
        },
        {
          id: "D",
          text: "4",
          isCorrect: false,
          misconception: "Counted initial mount as an extra tick.",
          explanation: "At 3 seconds, 3 intervals have fired: 1, 2, 3.",
        },
      ],
    },
  },
  {
    id: "py-mutation-rebinding",
    title: "List Mutation vs Variable Rebinding",
    concept: "Object Mutation vs Rebinding",
    language: "python",
    difficulty: "Beginner",
    category: "Python Internals",
    code: `def modify_lists(a, b):
    a.append(4)
    b = b + [4]

x = [1, 2, 3]
y = [1, 2, 3]
modify_lists(x, y)
print(x, y)`,
    question: "What will print(x, y) display?",
    options: [
      {
        id: "A",
        text: "[1, 2, 3, 4] [1, 2, 3]",
        isCorrect: true,
        explanation:
          "Correct! 'a.append(4)' mutates the list object that 'x' points to in-place. 'b = b + [4]' creates an entirely new list object and rebinds local variable 'b', leaving original caller list 'y' untouched.",
      },
      {
        id: "B",
        text: "[1, 2, 3, 4] [1, 2, 3, 4]",
        isCorrect: false,
        misconception: "Assumed 'b + [4]' modifies caller variable y in-place.",
        explanation:
          "The '+' operator on lists creates a new list and assigns it to local name 'b'. It does not mutate the existing list.",
      },
      {
        id: "C",
        text: "[1, 2, 3] [1, 2, 3]",
        isCorrect: false,
        misconception: "Assumed Python passes all arguments strictly by value/deep copy.",
        explanation:
          "Python passes references to objects ('call by sharing'). Mutating methods like .append() alter the object referenced by the caller.",
      },
      {
        id: "D",
        text: "[1, 2, 3] [1, 2, 3, 4]",
        isCorrect: false,
        misconception: "Inverted the behavior of append vs concatenation.",
        explanation: "append() mutates; '+' creates a new object.",
      },
    ],
    followUp: {
      title: "Follow-up: In-Place '+=' vs Concatenation '+'",
      code: `def test_extend(a, b):
    a += [4]
    b = b + [4]`,
      question: "For Python lists, what is the critical difference between a += [4] and b = b + [4]?",
      targetedMisconception: "In-Place List Mutation (+= / .extend()) vs Concatenation Rebinding (+)",
      options: [
        {
          id: "A",
          text: "+= calls __iadd__ which mutates in-place; + creates a new object and rebinds",
          isCorrect: true,
          explanation:
            "Spot on! For mutable collections like lists, '+=' is implemented via '__iadd__', mutating the object in-place (equivalent to .extend()). By contrast, '+' creates a fresh list object.",
        },
        {
          id: "B",
          text: "Both statements always create a new object",
          isCorrect: false,
          misconception: "Thought += is pure syntactic sugar for b = b + [4] on all types.",
          explanation:
            "On mutable objects like lists, += mutates in-place; on immutable objects like integers/strings, it creates a new object.",
        },
        {
          id: "C",
          text: "Both statements mutate in-place",
          isCorrect: false,
          misconception: "Thought + modifies list operands.",
          explanation: "Binary + never modifies its operands in-place.",
        },
        {
          id: "D",
          text: "There is no difference in memory or behavior",
          isCorrect: false,
          misconception: "Assumed += and + are identical in all contexts.",
          explanation: "Caller references will reflect changes from += but not +.",
        },
      ],
    },
  },
];
