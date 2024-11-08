// Initialize task and category data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let categories = [
  { title: "Physical", img: "muscle.png" },
  { title: "Academic", img: "enchanted_book.png" },
  { title: "Spiritual", img: "leaf.png" }
];
let selectedCategory = categories[0];

// XP values for different difficulties
const XP_VALUES = {
  easy: 10,
  medium: 20,
  hard: 30
};

// Define images for each tier in each category
const CATEGORY_IMAGES = {
  Physical: ["muscle.png", "muscle2.png", "muscle3.png"],
  Academic: ["enchanted_book.png", "academic-tier2.png", "academic-tier3.png"],
  Spiritual: ["leaf.png", "spiritual-tier2.png", "spiritual-tier3.png"]
};

// Initialize or retrieve XP data
let xpData = JSON.parse(localStorage.getItem("xpData")) || {
  Physical: { total: 0, levelXP: 0 },
  Academic: { total: 0, levelXP: 0 },
  Spiritual: { total: 0, levelXP: 0 }
};

// DOM Elements
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const screenWrapper = document.querySelector(".wrapper");
const categoriesContainer = document.querySelector(".categories");
const tasksContainer = document.querySelector(".tasks");
const addTaskWrapper = document.querySelector(".add-task");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskInput = document.getElementById("task-input");
const categorySelect = document.getElementById("category-select");
const difficultySelect = document.getElementById("difficulty");
const blackBackdrop = document.querySelector(".black-backdrop");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const totalTasks = document.getElementById("total-tasks");
const categoryTitle = document.getElementById("category-title");
const categoryImg = document.getElementById("category-img");
const numTasks = document.getElementById("num-tasks");

// Utility functions
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Calculate tier level based on total XP
const getTierLevel = (totalXP) => Math.min(Math.floor(totalXP / 100), 2);  // 0 = Tier 1, 1 = Tier 2, 2 = Tier 3

// Function to update the progress bars and images based on the XP tiers
const updateXPBars = () => {
  const categories = ["Physical", "Academic", "Spiritual"];
  categories.forEach(category => {
    const fill = document.getElementById(`${category.toLowerCase()}-fill`);
    const xp = xpData[category].levelXP;
    fill.style.width = `${Math.min(xp, 100)}%`;  // Cap at 100% for visual bar

    // Update category image based on tier level of total XP
    const tier = getTierLevel(xpData[category].total);
    const categoryElement = categoriesContainer.querySelector(`.category img[alt="${category}"]`);
    if (categoryElement) {
      categoryElement.src = CATEGORY_IMAGES[category][tier];
    }
  });
};

// Add XP to category, level up, and save to localStorage
const addXP = (category, difficulty) => {
  xpData[category].total += XP_VALUES[difficulty];  // Increase total XP
  xpData[category].levelXP += XP_VALUES[difficulty];  // Increase current level XP

  // Check if level-up is achieved (levelXP reaches 100)
  if (xpData[category].levelXP >= 100) {
    xpData[category].levelXP = 0;  // Reset level XP
  }

  localStorage.setItem("xpData", JSON.stringify(xpData));
  updateXPBars();
};

const updateTotals = () => {
  const categoryTasks = tasks.filter(task => task.category === selectedCategory.title);
  numTasks.textContent = `${categoryTasks.length} Tasks`;
  totalTasks.textContent = tasks.length;
};

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach(category => {
    const div = document.createElement("div");
    div.classList.add("category");
    div.innerHTML = `
      <div class="left">
        <img src="${CATEGORY_IMAGES[category.title][getTierLevel(xpData[category.title].total)]}" alt="${category.title}" />
        <div class="content">
          <h1>${category.title}</h1>
          <p>${tasks.filter(task => task.category === category.title).length} Tasks</p>
        </div>
      </div>
    `;

    div.addEventListener("click", () => {
      selectedCategory = category;
      categoryTitle.textContent = category.title;
      categoryImg.src = CATEGORY_IMAGES[category.title][getTierLevel(xpData[category.title].total)];
      screenWrapper.classList.add("show-category");
      renderTasks();
      updateTotals();
    });

    categoriesContainer.appendChild(div);
  });
};

const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(task => task.category === selectedCategory.title);

  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-tasks">No tasks added for this category</p>`;
  } else {
    categoryTasks.forEach(task => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");

      const taskLabel = document.createElement("label");
      taskLabel.classList.add("task");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;

      checkbox.addEventListener("change", () => {
        if (!task.completed) {
          addXP(task.category, task.difficulty);
        }
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateTotals();
      });

      const checkmark = document.createElement("span");
      checkmark.classList.add("checkmark");

      const taskText = document.createElement("p");
      taskText.textContent = task.task;
      if (task.completed) {
        taskText.style.textDecoration = "line-through";
      }

      taskLabel.append(checkbox, checkmark, taskText);
      div.appendChild(taskLabel);

      const deleteBtn = document.createElement("div");
      deleteBtn.classList.add("delete");
      deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>`;

      deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
        updateTotals();
      });

      div.appendChild(deleteBtn);
      tasksContainer.appendChild(div);
    });
  }
};

const toggleAddTaskForm = () => {
  addTaskWrapper.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
};

const addTask = () => {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  const difficulty = difficultySelect.value;

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = {
    id: Date.now(),
    task: taskText,
    category: category,
    difficulty: difficulty,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  taskInput.value = "";
  toggleAddTaskForm();
  renderTasks();
  updateTotals();
};

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  menuBtn.addEventListener("click", () => screenWrapper.classList.add("show-category"));
  backBtn.addEventListener("click", () => screenWrapper.classList.remove("show-category"));
  addTaskBtn.addEventListener("click", toggleAddTaskForm);
  blackBackdrop.addEventListener("click", toggleAddTaskForm);
  addBtn.addEventListener("click", addTask);
  cancelBtn.addEventListener("click", toggleAddTaskForm);

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.title;
    option.textContent = category.title;
    categorySelect.appendChild(option);
  });

  renderCategories();
  renderTasks();
  updateTotals();
  updateXPBars();  // Initialize progress bars
});
