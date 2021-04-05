

const tasks = [
  {
    id : 1,
    taskName: 'Clean the bathroom',
    slug: 'clean-the-bathroom',
    taskStatus: 1
  },
  {
    id : 2,
    taskName: 'Learn filtering data in React',
    slug: 'learn-filtering-data-in-react',
    taskStatus: 3
  },
  {
    id : 3,
    taskName: 'Fix the bug on React project',
    slug: 'fix-the-bug-on-react-project',
    taskStatus: 2
  },
  {
    id : 4,
    taskName: 'Fix the car',
    slug: 'fix-the-car',
    taskStatus: 1
  }
]

const status = [
  { id: 1, name: "Complete" },
  { id: 2, name: "Pending" },
  { id: 3, name: "To do" }
];

const newTask = {
  id: null,
  taskName: '',
  slug: '',
  taskStatus: null
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newTask,
  tasks,
  status
};
