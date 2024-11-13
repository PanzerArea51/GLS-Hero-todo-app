localStorage.clear();
// Initialize task and category data
let coins = JSON.parse(localStorage.getItem("coins")) || 0; // Load coins from localStorage, or initialize at 0
let tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from localStorage, or initialize empty array
let categories = [
  { title: "Physical", img: "muscle.png" },
  { title: "Academic", img: "enchanted_book.png" },
  { title: "Spiritual", img: "leaf.png" }
];
let selectedCategory = categories[0]; // Default selected category
// XP values for different difficulties
const XP_VALUES = {
  easy: 10,
  medium: 20,
  hard: 25
};

// Predefined tasks
const predefinedTasks = [
  { id: 1, task: "Morning Stretch Routine", description: "A 10-minute series of stretches to wake up the body, focusing on neck, back, and legs.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 2, task: "Walking or Jogging Around Campus", description: "A brisk walk or jog around the school grounds for 15-30 minutes.", category: "Physical", difficulty: "medium", xp: 15 },
  { id: 3, task: "Bodyweight Squats", description: "3 sets of 20-30 squats to strengthen legs and glutes.", category: "Physical", difficulty: "medium", xp: 20 },
  { id: 4, task: "Push-Ups", description: "3 sets of 10-20 push-ups for upper body strength.", category: "Physical", difficulty: "medium", xp: 20 },
  { id: 5, task: "Lunges", description: "3 sets of 10 lunges per leg to target the legs and core.", category: "Physical", difficulty: "medium", xp: 20 },
  { id: 6, task: "Planks", description: "Hold a plank for 30 seconds to 1 minute for core strengthening.", category: "Physical", difficulty: "medium", xp: 15 },
  { id: 7, task: "Jumping Jacks", description: "3 sets of 30-50 jumping jacks for a full-body warm-up.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 8, task: "High Knees", description: "3 sets of 30 seconds of high knees to elevate the heart rate.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 9, task: "Dancing", description: "Put on some music and dance for 10-15 minutes to boost mood and get moving.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 10, task: "Stair Climbing", description: "Use the stairs in the dormitory or on campus for 10-15 minutes for a great lower body workout.", category: "Physical", difficulty: "medium", xp: 15 },
  { id: 11, task: "Walking Lunges", description: "Perform walking lunges around a hallway or outside for 10 minutes to work on balance and leg strength.", category: "Physical", difficulty: "medium", xp: 20 },
  { id: 12, task: "Mountain Climbers", description: "Do 3 sets of 30 seconds to engage the core, arms, and legs.", category: "Physical", difficulty: "medium", xp: 20 },
  { id: 13, task: "Burpees", description: "Do 3 sets of 10-15 burpees for a full-body workout that boosts cardiovascular fitness.", category: "Physical", difficulty: "hard", xp: 30 },
  { id: 14, task: "Wall Sits", description: "Hold a wall sit for 30-60 seconds to strengthen the quads.", category: "Physical", difficulty: "medium", xp: 15 },
  { id: 15, task: "Tennis Ball or Ping-Pong Drills", description: "Use a ball to practice quick hand-eye coordination or solo ping-pong drills if you have access to a table.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 16, task: "Yoga Flow", description: "Dedicate 10-15 minutes to a beginner yoga sequence, focusing on flexibility and breathing.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 17, task: "Skipping Rope", description: "A 5-10 minute session of skipping rope for cardio and coordination.", category: "Physical", difficulty: "medium", xp: 15 },
  { id: 18, task: "Shadow Boxing", description: "Perform 3 rounds of 2-3 minutes of shadow boxing to improve agility and endurance.", category: "Physical", difficulty: "medium", xp: 15 },
  { id: 19, task: "Sit-Ups or Crunches", description: "3 sets of 15-30 sit-ups or crunches for core strength.", category: "Physical", difficulty: "medium", xp: 15 },
  { id: 20, task: "Leg Raises", description: "Perform 3 sets of 15 leg raises to target the lower abs.", category: "Physical", difficulty: "medium", xp: 15 },
  { id: 21, task: "Tricep Dips", description: "Use a bench or stable surface for 3 sets of 10-15 tricep dips.", category: "Physical", difficulty: "medium", xp: 15 },
  { id: 22, task: "Jump Squats", description: "3 sets of 10-15 jump squats for explosive leg power and cardiovascular fitness.", category: "Physical", difficulty: "hard", xp: 25 },
  { id: 23, task: "Handstand Practice", description: "Spend 5-10 minutes practicing handstands against a wall for upper body and balance.", category: "Physical", difficulty: "hard", xp: 25 },
  { id: 24, task: "Balance Exercises", description: "Stand on one leg for 30 seconds on each side or practice other balance drills.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 25, task: "Tai Chi or Qi Gong Movements", description: "Learn some basic Tai Chi or Qi Gong movements to improve flexibility, balance, and relaxation.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 26, task: "Sprints", description: "Do short, intense sprints for 10-15 minutes if you have a track or open space available.", category: "Physical", difficulty: "hard", xp: 30 },
  { id: 27, task: "Circuit Training", description: "Create a simple circuit combining 3-5 exercises (e.g., squats, push-ups, jumping jacks, and planks) for 15-20 minutes.", category: "Physical", difficulty: "medium", xp: 20 },
  { id: 28, task: "Outdoor Games with Friends", description: "Play spontaneous games like tag, frisbee, or soccer with friends during free time.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 29, task: "Breathing Exercises", description: "Spend 5-10 minutes doing deep breathing exercises to improve focus and relaxation.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 30, task: "Nighttime Stretch", description: "End the day with a gentle stretching routine to unwind, focusing on hamstrings, back, and shoulders.", category: "Physical", difficulty: "easy", xp: 10 },
  { id: 31, task: "Daily Reading Habit", description: "Dedicate 20-30 minutes each day to read books, articles, or academic journals to improve comprehension and vocabulary.", category: "Academic", difficulty: "easy", xp: 10 },
  { id: 32, task: "Writing Journal", description: "Keep a daily journal or diary to practice writing skills, reflect on lessons, or document ideas.", category: "Academic", difficulty: "easy", xp: 10 },
  { id: 33, task: "Study Group Sessions", description: "Organize or join a study group to discuss class materials, quiz each other, and help one another understand difficult concepts.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 34, task: "Flashcards for Vocabulary", description: "Create flashcards to memorize important terms, definitions, or formulas.", category: "Academic", difficulty: "easy", xp: 10 },
  { id: 35, task: "Mind Mapping", description: "Create mind maps or concept maps to visualize and organize ideas for essays, projects, or revision.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 36, task: "Solve Practice Problems", description: "Solve a set of practice problems in subjects like math, physics, or chemistry to reinforce concepts.", category: "Academic", difficulty: "medium", xp: 20 },
  { id: 37, task: "Review Notes Regularly", description: "Set aside 10-15 minutes every day to review notes from the day’s classes.", category: "Academic", difficulty: "easy", xp: 10 },
  { id: 38, task: "Write Summaries", description: "Summarize each day’s lesson in a few sentences to enhance understanding and retention.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 39, task: "Set Daily Academic Goals", description: "Write down specific academic goals for the day.", category: "Academic", difficulty: "easy", xp: 10 },
  { id: 40, task: "Online Courses or Tutorials", description: "Take online courses or watch educational videos related to the subject to expand knowledge.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 41, task: "Create Study Guides", description: "Develop personalized study guides before exams, including key concepts and formulas.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 42, task: "Time Management Techniques", description: "Practice time management by creating a daily or weekly academic schedule.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 43, task: "Peer Teaching", description: "Offer to explain difficult topics to peers or younger students.", category: "Academic", difficulty: "medium", xp: 20 },
  { id: 44, task: "Writing Essays", description: "Write short essays or practice writing on various topics to develop writing skills.", category: "Academic", difficulty: "medium", xp: 20 },
  { id: 45, task: "Participate in Debates", description: "Join a debate club or practice debating on various academic topics.", category: "Academic", difficulty: "hard", xp: 25 },
  { id: 46, task: "Create a Study Routine", description: "Design a daily or weekly routine that includes time for reading, writing, and problem-solving.", category: "Academic", difficulty: "easy", xp: 10 },
  { id: 47, task: "Research Projects", description: "Work on independent research projects that interest you.", category: "Academic", difficulty: "hard", xp: 30 },
  { id: 48, task: "Literature Review", description: "Review a book, article, or academic paper critically, noting key arguments and evidence.", category: "Academic", difficulty: "hard", xp: 25 },
  { id: 49, task: "Problem-Solving Challenges", description: "Take part in academic challenges like logic puzzles, coding problems, or math olympiads.", category: "Academic", difficulty: "hard", xp: 25 },
  { id: 50, task: "Create Diagrams or Charts", description: "Use diagrams, flowcharts, or graphs to represent complex information.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 51, task: "Language Learning", description: "Dedicate time to learning a new language using apps, flashcards, or language exchange.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 52, task: "Class Discussion or Seminar", description: "Engage in class discussions or attend seminars/workshops.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 53, task: "Quiz Yourself", description: "Create or use online quizzes to test your knowledge of a subject.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 54, task: "Research Current Events", description: "Stay updated with current affairs by reading newspapers or watching the news.", category: "Academic", difficulty: "easy", xp: 10 },
  { id: 55, task: "Develop Critical Thinking Skills", description: "Practice critical thinking exercises such as analyzing an argument or identifying fallacies.", category: "Academic", difficulty: "hard", xp: 25 },
  { id: 56, task: "Create a Blog or Academic Journal", description: "Start a blog or journal where you write about your academic interests.", category: "Academic", difficulty: "hard", xp: 25 },
  { id: 57, task: "Attend Office Hours", description: "Utilize teachers' office hours to discuss questions and clarify doubts.", category: "Academic", difficulty: "easy", xp: 10 },
  { id: 58, task: "Literary Analysis", description: "Practice analyzing literature by reading novels or poems.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 59, task: "Public Speaking Practice", description: "Practice public speaking by presenting on a topic of interest.", category: "Academic", difficulty: "medium", xp: 15 },
  { id: 60, task: "Prepare for Exams Early", description: "Start preparing for exams well in advance, reviewing and testing yourself regularly.", category: "Academic", difficulty: "hard", xp: 30 },
  { id: 61, task: "Morning Meditation", description: "Start your day with 5-10 minutes of meditation to center yourself and cultivate a peaceful mind.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 62, task: "Mindful Breathing", description: "Practice deep, mindful breathing for 5 minutes whenever you feel stressed or need to refocus.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 63, task: "Gratitude Journaling", description: "Write down three things you’re grateful for each morning or evening to cultivate an attitude of gratitude.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 64, task: "Daily Affirmations", description: "Recite positive affirmations or mantras that resonate with you to boost your self-esteem and inner strength.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 65, task: "Silent Reflection", description: "Spend 10-15 minutes each day in silence, reflecting on your thoughts, feelings, and the events of the day.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 66, task: "Nature Walks", description: "Take a walk in nature to connect with the natural world and foster a sense of gratitude for life.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 67, task: "Reading Sacred Texts", description: "Dedicate time to reading spiritual texts or literature that inspire you.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 68, task: "Chanting or Singing Mantras", description: "Chant or listen to spiritual mantras, hymns, or songs to uplift your soul.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 69, task: "Praying or Meditation on Purpose", description: "Spend time each day praying or meditating on your higher purpose.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 70, task: "Mindfulness Practice", description: "Engage in mindfulness throughout your day, paying full attention to each moment.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 71, task: "Acts of Kindness", description: "Make it a daily practice to perform small acts of kindness.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 72, task: "Gratitude Walk", description: "Go on a walk with the intention of reflecting on everything you’re grateful for.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 73, task: "Visualization Practice", description: "Take a few minutes each day to visualize your dreams and goals.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 74, task: "Fasting or Simple Eating", description: "Practice fasting or simple eating to develop self-discipline and gratitude for food.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 75, task: "Sacred Space Creation", description: "Create a small sacred space in your room for spiritual practice.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 76, task: "Yoga or Spiritual Movement", description: "Engage in daily yoga or other forms of mindful movement.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 77, task: "Contemplative Journaling", description: "Journal about your spiritual journey, reflections, and growth.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 78, task: "Spiritual Study", description: "Dedicate 15-20 minutes each day to studying a spiritual topic that resonates with you.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 79, task: "Forgiveness Practice", description: "Reflect on grudges or negative feelings and practice forgiveness.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 80, task: "Service to Others", description: "Volunteer your time to help others, assisting with tasks or community service projects.", category: "Spiritual", difficulty: "hard", xp: 20 },
  { id: 81, task: "Evening Prayer or Reflection", description: "End your day with prayer, reflection, or gratitude to connect with peace.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 82, task: "Focusing on the Present Moment", description: "Practice staying present, focusing on the task at hand.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 83, task: "Listening to Spiritual Music", description: "Listen to calming spiritual music or sounds of nature.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 84, task: "Surrendering and Letting Go", description: "Take a moment to surrender worries, trust life, and let go of what's beyond control.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 85, task: "Meditating on Compassion", description: "Meditate on compassion for yourself and others.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 86, task: "Creating a Vision Board", description: "Create a vision board that represents your spiritual goals and aspirations.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 87, task: "Reading Inspirational Quotes", description: "Start or end your day by reading inspirational quotes from spiritual teachers.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 88, task: "Prayer Walks", description: "Take a walk and use the time to pray or reflect on your spiritual connection with the world.", category: "Spiritual", difficulty: "medium", xp: 15 },
  { id: 89, task: "Listening to Spiritual Podcasts", description: "Listen to spiritual podcasts to deepen your understanding of spiritual concepts.", category: "Spiritual", difficulty: "easy", xp: 10 },
  { id: 90, task: "Meditative Art or Crafting", description: "Engage in art like drawing or painting as a form of meditation and self-expression.", category: "Spiritual", difficulty: "medium", xp: 15 },
];


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
const leaderboardBtn = document.getElementById("leaderboardBtn");
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
const coinsDisplay = document.getElementById("coins-count");


// Save tasks to localStorage
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
    coins += 10; // Award coins for level-up (adjust the amount as needed)
    localStorage.setItem("coins", JSON.stringify(coins)); // Save updated coins to localStorage
    updateCoinDisplay(); // Update displayed coin count
  }

  localStorage.setItem("xpData", JSON.stringify(xpData)); // Save updated XP data
  updateXPBars(); // Update the XP bar visuals
};


// Update task and category totals
const updateTotals = () => {
  const categoryTasks = tasks.filter(task => task.category === selectedCategory.title);
  numTasks.textContent = `${categoryTasks.length} Tasks`; // Update task count for current category
  totalTasks.textContent = tasks.length; // Update total task count
};


// Update coin
const updateCoinDisplay = () => {
  document.getElementById("coin-count").textContent = coins;
};


// Render categories on the screen
const renderCategories = () => {
  categoriesContainer.innerHTML = ""; // Clear existing categories
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

// Render tasks for the selected category
const renderTasks = () => {
  tasksContainer.innerHTML = ""; // Clear existing tasks
  const categoryTasks = predefinedTasks.filter(task => task.category === selectedCategory.title);
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-tasks">No tasks available for this category</p>`;
  } else {
    categoryTasks.forEach(task => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const taskLabel = document.createElement("label");
      taskLabel.classList.add("task");

      // Checkbox setup
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed || false; // Track task completion
      checkbox.addEventListener("change", () => {
        if (!task.completed) {
          addXP(task.category, task.difficulty);
        }
        task.completed = !task.completed;
        renderTasks(); // Re-render tasks
      });

      const checkmark = document.createElement("span");
      checkmark.classList.add("checkmark");
      const taskText = document.createElement("p");
      taskText.textContent = `${task.task} (${task.xp} XP)`;
      taskLabel.append(checkbox, checkmark, taskText);
      div.appendChild(taskLabel);
      tasksContainer.appendChild(div);
    });
  }
};


// Toggle the task input form
const toggleAddTaskForm = () => {
  console.log("Toggling task form");  // Debug log
  addTaskWrapper.classList.toggle("active");
  blackBackdrop.classList.toggle("active");

};

// Add a new task
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
  tasks.push(newTask); // Add new task to tasks array
  saveTasks(); // Save updated tasks
  taskInput.value = ""; // Clear input
  toggleAddTaskForm(); // Close form
  renderTasks(); // Re-render tasks
  updateTotals(); // Update task totals
};

const formScreen = document.getElementById("form-screen");
const formBackBtn = document.getElementById("form-back-btn");
// Show the form screen when the menu button is clicked
menuBtn.addEventListener("click", () => {
  formScreen.style.display = "flex";
});
// Hide the form screen when the back button is clicked
formBackBtn.addEventListener("click", () => {
  formScreen.style.display = "none";
});

const leaderboardScreen = document.getElementById("leaderboard-screen");


// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  leaderboardBtn.addEventListener("click", () => {
    console.log("Leaderboard button clicked");
    leaderboardScreen.style.display = "flex"; // Show leaderboard screen
    leaderboardScreen.style.visibility = "visible";
    leaderboardScreen.style.opacity = "1";

  });
  leaderboardBtn.addEventListener("click", () => screenWrapper.classList.add("leaderboard-screen"));
  menuBtn.addEventListener("click", () => screenWrapper.classList.add("form-screen screen"));
  backBtn.addEventListener("click", () => screenWrapper.classList.remove("show-category"));
  addTaskBtn.addEventListener("click", toggleAddTaskForm);
  blackBackdrop.addEventListener("click", toggleAddTaskForm);
  addBtn.addEventListener("click", addTask);
  cancelBtn.addEventListener("click", toggleAddTaskForm);
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.title;
    option.textContent = category.title;
    categorySelect.appendChild(option); // Populate category select dropdown
  });
  renderCategories(); // Render categories initially
  renderTasks(); // Render tasks initially
  updateTotals(); // Update task totals
  updateXPBars();  // Initialize progress bars
});


addTaskBtn.style.display = "none"; // Hide add task button
console.log("Coins updated to:", coins);
