//localStorage.clear();
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
  easy: 3,
  medium: 3,
  hard: 3,
  form: 10
};



// Predefined tasks
const predefinedTasks = [
    { id: 1, task: "A 10-minute series of stretches to wake up the body, focusing on neck, back, and legs.", description: "Morning Stretch Routine", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 2, task: "A brisk walk or jog around the school grounds for 15-30 minutes.", description: "Walking or Jogging Around Campus", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 3, task: "3 sets of 20-30 squats to strengthen legs and glutes.", description: "Bodyweight Squats", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 4, task: "3 sets of 10-20 push-ups for upper body strength.", description: "Push-Ups", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 5, task: "3 sets of 10 lunges per leg to target the legs and core.", description: "Lunges", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 6, task: "Hold a plank for 30 seconds to 1 minute for core strengthening.", description: "Planks", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 7, task: "3 sets of 30-50 jumping jacks for a full-body warm-up.", description: "Jumping Jacks", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 8, task: "3 sets of 30 seconds of high knees to elevate the heart rate.", description: "High Knees", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 9, task: "Put on some music and dance for 10-15 minutes to boost mood and get moving.", description: "Dancing", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 10, task: "Use the stairs in the dormitory or on campus for 10-15 minutes for a great lower body workout.", description: "Stair Climbing", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 11, task: "Perform walking lunges around a hallway or outside for 10 minutes to work on balance and leg strength.", description: "Walking Lunges", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 12, task: "Do 3 sets of 30 seconds to engage the core, arms, and legs.", description: "Mountain Climbers", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 13, task: "Do 3 sets of 10-15 burpees for a full-body workout that boosts cardiovascular fitness.", description: "Burpees", category: "Physical", difficulty: "hard", xp: 3 },
    { id: 14, task: "Hold a wall sit for 30-60 seconds to strengthen the quads.", description: "Wall Sits", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 15, task: "Use a ball to practice quick hand-eye coordination or solo ping-pong drills if you have access to a table.", description: "Tennis Ball or Ping-Pong Drills", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 16, task: "Dedicate 10-15 minutes to a beginner yoga sequence, focusing on flexibility and breathing.", description: "Yoga Flow", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 17, task: "A 5-10 minute session of skipping rope for cardio and coordination.", description: "Skipping Rope", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 18, task: "Perform 3 rounds of 2-3 minutes of shadow boxing to improve agility and endurance.", description: "Shadow Boxing", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 19, task: "3 sets of 15-30 sit-ups or crunches for core strength.", description: "Sit-Ups or Crunches", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 20, task: "Perform 3 sets of 15 leg raises to target the lower abs.", description: "Leg Raises", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 21, task: "Use a bench or stable surface for 3 sets of 10-15 tricep dips.", description: "Tricep Dips", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 22, task: "3 sets of 10-15 jump squats for explosive leg power and cardiovascular fitness.", description: "Jump Squats", category: "Physical", difficulty: "hard", xp: 3 },
    { id: 23, task: "Spend 5-10 minutes practicing handstands against a wall for upper body and balance.", description: "Handstand Practice", category: "Physical", difficulty: "hard", xp: 3 },
    { id: 24, task: "Stand on one leg for 30 seconds on each side or practice other balance drills.", description: "Balance Exercises", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 25, task: "Learn some basic Tai Chi or Qi Gong movements to improve flexibility, balance, and relaxation.", description: "Tai Chi or Qi Gong Movements", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 26, task: "Do short, intense sprints for 10-15 minutes if you have a track or open space available.", description: "Sprints", category: "Physical", difficulty: "hard", xp: 3 },
    { id: 27, task: "Create a simple circuit combining 3-5 exercises (e.g., squats, push-ups, jumping jacks, and planks) for 15-20 minutes.", description: "Circuit Training", category: "Physical", difficulty: "medium", xp: 3 },
    { id: 28, task: "Play spontaneous games like tag, frisbee, or soccer with friends during free time.", description: "Outdoor Games with Friends", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 29, task: "Spend 5-10 minutes doing deep breathing exercises to improve focus and relaxation.", description: "Breathing Exercises", category: "Physical", difficulty: "easy", xp: 3 },
    { id: 30, task: "End the day with a gentle stretching routine to unwind, focusing on hamstrings, back, and shoulders.", description: "Nighttime Stretch", category: "Physical", difficulty: "easy", xp: 3 },
  
      { id: 31, task: "Dedicate 20-30 minutes each day to read books, articles, or academic journals to improve comprehension and vocabulary.", description: "Daily Reading Habit", category: "Academic", difficulty: "easy", xp: 10 },
      { id: 32, task: "Keep a daily journal or diary to practice writing skills, reflect on lessons, or document ideas.", description: "Writing Journal", category: "Academic", difficulty: "easy", xp: 10 },
      { id: 33, task: "Organize or join a study group to discuss class materials, quiz each other, and help one another understand difficult concepts.", description: "Study Group Sessions", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 34, task: "Create flashcards to memorize important terms, definitions, or formulas.", description: "Flashcards for Vocabulary", category: "Academic", difficulty: "easy", xp: 10 },
      { id: 35, task: "Create mind maps or concept maps to visualize and organize ideas for essays, projects, or revision.", description: "Mind Mapping", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 36, task: "Solve a set of practice problems in subjects like math, physics, or chemistry to reinforce concepts.", description: "Solve Practice Problems", category: "Academic", difficulty: "medium", xp: 20 },
      { id: 37, task: "Set aside 10-15 minutes every day to review notes from the day’s classes.", description: "Review Notes Regularly", category: "Academic", difficulty: "easy", xp: 10 },
      { id: 38, task: "Summarize each day’s lesson in a few sentences to enhance understanding and retention.", description: "Write Summaries", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 39, task: "Write down specific academic goals for the day.", description: "Set Daily Academic Goals", category: "Academic", difficulty: "easy", xp: 10 },
      { id: 40, task: "Take online courses or watch educational videos related to the subject to expand knowledge.", description: "Online Courses or Tutorials", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 41, task: "Develop personalized study guides before exams, including key concepts and formulas.", description: "Create Study Guides", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 42, task: "Practice time management by creating a daily or weekly academic schedule.", description: "Time Management Techniques", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 43, task: "Offer to explain difficult topics to peers or younger students.", description: "Peer Teaching", category: "Academic", difficulty: "medium", xp: 20 },
      { id: 44, task: "Write short essays or practice writing on various topics to develop writing skills.", description: "Writing Essays", category: "Academic", difficulty: "medium", xp: 20 },
      { id: 45, task: "Join a debate club or practice debating on various academic topics.", description: "Participate in Debates", category: "Academic", difficulty: "hard", xp: 25 },
      { id: 46, task: "Design a daily or weekly routine that includes time for reading, writing, and problem-solving.", description: "Create a Study Routine", category: "Academic", difficulty: "easy", xp: 10 },
      { id: 47, task: "Work on independent research projects that interest you.", description: "Research Projects", category: "Academic", difficulty: "hard", xp: 30 },
      { id: 48, task: "Review a book, article, or academic paper critically, noting key arguments and evidence.", description: "Literature Review", category: "Academic", difficulty: "hard", xp: 25 },
      { id: 49, task: "Take part in academic challenges like logic puzzles, coding problems, or math olympiads.", description: "Problem-Solving Challenges", category: "Academic", difficulty: "hard", xp: 25 },
      { id: 50, task: "Use diagrams, flowcharts, or graphs to represent complex information.", description: "Create Diagrams or Charts", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 51, task: "Dedicate time to learning a new language using apps, flashcards, or language exchange.", description: "Language Learning", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 52, task: "Engage in class discussions or attend seminars/workshops.", description: "Class Discussion or Seminar", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 53, task: "Create or use online quizzes to test your knowledge of a subject.", description: "Quiz Yourself", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 54, task: "Stay updated with current affairs by reading newspapers or watching the news.", description: "Research Current Events", category: "Academic", difficulty: "easy", xp: 10 },
      { id: 55, task: "Practice critical thinking exercises such as analyzing an argument or identifying fallacies.", description: "Develop Critical Thinking Skills", category: "Academic", difficulty: "hard", xp: 25 },
      { id: 56, task: "Start a blog or journal where you write about your academic interests.", description: "Create a Blog or Academic Journal", category: "Academic", difficulty: "hard", xp: 25 },
      { id: 57, task: "Utilize teachers' office hours to discuss questions and clarify doubts.", description: "Attend Office Hours", category: "Academic", difficulty: "easy", xp: 10 },
      { id: 58, task: "Practice analyzing literature by reading novels or poems.", description: "Literary Analysis", category: "Academic", difficulty: "medium", xp: 15 },
      { id: 59, task: "Practice public speaking by presenting on a topic of interest.", description: "Public Speaking Practice", category: "Academic", difficulty: "medium", xp: 15 },
    
      { id: 60, task: "Start preparing for exams well in advance, reviewing and testing yourself regularly.", description: "Prepare for Exams Early", category: "Academic", difficulty: "hard", xp: 30 },
      { id: 61, task: "Start your day with 5-10 minutes of meditation to center yourself and cultivate a peaceful mind.", description: "Morning Meditation", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 62, task: "Practice deep, mindful breathing for 5 minutes whenever you feel stressed or need to refocus.", description: "Mindful Breathing", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 63, task: "Write down three things you’re grateful for each morning or evening to cultivate an attitude of gratitude.", description: "Gratitude Journaling", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 64, task: "Recite positive affirmations or mantras that resonate with you to boost your self-esteem and inner strength.", description: "Daily Affirmations", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 65, task: "Spend 10-15 minutes each day in silence, reflecting on your thoughts, feelings, and the events of the day.", description: "Silent Reflection", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 66, task: "Take a walk in nature to connect with the natural world and foster a sense of gratitude for life.", description: "Nature Walks", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 67, task: "Dedicate time to reading spiritual texts or literature that inspire you.", description: "Reading Sacred Texts", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 68, task: "Chant or listen to spiritual mantras, hymns, or songs to uplift your soul.", description: "Chanting or Singing Mantras", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 69, task: "Spend time each day praying or meditating on your higher purpose.", description: "Praying or Meditation on Purpose", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 70, task: "Engage in mindfulness throughout your day, paying full attention to each moment.", description: "Wake Up For Qiammulail", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 71, task: "Make it a daily practice to perform small acts of kindness.", description: "Read 1 Juzuk A Day", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 72, task: "Go on a walk with the intention of reflecting on everything you’re grateful for.", description: "Memorise 2 of 40 Hadith by Imam An-Nabawi", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 73, task: "Take a few minutes each day to visualize your dreams and goals.", description: "Fast For 3 Days", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 74, task: "Practice fasting or simple eating to develop self-discipline and gratitude for food.", description: "Pick up 5 pieces of trash every day", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 75, task: "Create a small sacred space in your room for spiritual practice.", description: "Sacred Space Creation", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 76, task: "Engage in daily yoga or other forms of mindful movement.", description: "Yoga or Spiritual Movement", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 77, task: "Journal about your spiritual journey, reflections, and growth.", description: "Contemplative Journaling", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 78, task: "Dedicate 15-20 minutes each day to studying a spiritual topic that resonates with you.", description: "Spiritual Study", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 79, task: "Reflect on grudges or negative feelings and practice forgiveness.", description: "Forgiveness Practice", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 80, task: "Volunteer your time to help others, assisting with tasks or community service projects.", description: "Service to Others", category: "Spiritual", difficulty: "hard", xp: 20 },
      { id: 81, task: "End your day with prayer, reflection, or gratitude to connect with peace.", description: "Evening Prayer or Reflection", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 82, task: "Practice staying present, focusing on the task at hand.", description: "Focusing on the Present Moment", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 83, task: "Listen to calming spiritual music or sounds of nature.", description: "Listening to Spiritual Music", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 84, task: "Take a moment to surrender worries, trust life, and let go of what's beyond control.", description: "Surrendering and Letting Go", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 85, task: "Meditate on compassion for yourself and others.", description: "Meditating on Compassion", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 86, task: "Create a vision board that represents your spiritual goals and aspirations.", description: "Creating a Vision Board", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 87, task: "Start or end your day by reading inspirational quotes from spiritual teachers.", description: "Reading Inspirational Quotes", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 88, task: "Take a walk and use the time to pray or reflect on your spiritual connection with the world.", description: "Prayer Walks", category: "Spiritual", difficulty: "medium", xp: 15 },
      { id: 89, task: "Listen to spiritual podcasts to deepen your understanding of spiritual concepts.", description: "Listening to Spiritual Podcasts", category: "Spiritual", difficulty: "easy", xp: 10 },
      { id: 90, task: "Engage in art like drawing or painting as a form of meditation and self-expression.", description: "Meditative Art or Crafting", category: "Spiritual", difficulty: "medium", xp: 15 },
]      


// Define images for each tier in each category
const CATEGORY_IMAGES = {
  Physical: ["mya1.png", "mya2.png", "mya.png"],
  Academic: ["qayyum1.png", "qayyum2.png", "qayyum.png"],
  Spiritual: ["twin of faith 1.png", "tree.png", "twin of faith.png"]
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
    console.log("number of xp is:",xp);
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
      xpData[category].levelXP = 0; // Reset level XP
      xpData[category].total += 100; // Add 100 XP to total
      localStorage.setItem("xpData", JSON.stringify(xpData));
      renderTasks(); // Refresh task list
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
          addXP(task.category, task.difficulty); // Add XP for completing the task
        }
        task.completed = !task.completed; // Toggle the completed state
        saveTasks(); // Save updated tasks to localStorage
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
  formScreen.style.display = "block";
});
// Hide the form screen when the back button is clicked
formBackBtn.addEventListener("click", () => {
  formScreen.style.display = "none";
});

const Leaderboard = document.getElementById("leaderboard-screen");
// Show the leaderboard screen when the leaderboard button is clicked
leaderboardBtn.addEventListener("click", () => {
  Leaderboard.style.display = "flex";
 // Assuming screenWrapper is the main screen
});

const leaderboardBackBtn = document.getElementById("leaderboard-back-btn");



// Event Listeners
document.addEventListener("DOMContentLoaded", () => {

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
  console.log("xp here");
});

updateXPBars();
addTaskBtn.style.display = "none"; // Hide add task button
console.log("Coins updated to:", coins);


const leaderboardScreen = document.getElementById("leaderboard-screen");

menuBtn.addEventListener("click", () => {
  formScreen.classList.remove("slide-out");
  formScreen.classList.add("slide-in");
  formScreen.style.display = "block";
});

// Hide the form screen with animation
formBackBtn.addEventListener("click", () => {
  formScreen.classList.remove("slide-in");
  formScreen.classList.add("slide-out");
  setTimeout(() => {
      formScreen.style.display = "none";
  }, 500); // Match the animation duration
});

// Show the leaderboard screen with animation
leaderboardBtn.addEventListener("click", () => {
  leaderboardScreen.classList.remove("fade-out");
  leaderboardScreen.classList.add("fade-in");
  leaderboardScreen.style.display = "block";
});

// Hide the leaderboard screen with animation
leaderboardBackBtn.addEventListener("click", () => {
  leaderboardScreen.classList.remove("fade-in");
  leaderboardScreen.classList.add("fade-out");
  setTimeout(() => {
      leaderboardScreen.style.display = "none";
  }, 500); // Match the animation duration  
});

function storeFormData(event) {
  event.preventDefault(); // Prevent default behavior

  // Identify which button triggered the event
  const button = event.target;
  const form = button.closest(".form"); // Find the closest form container

  // Capture inputs dynamically from the form
  const firstName = form.querySelector("#firstname").value.trim();
  const lastName = form.querySelector("#lastname").value.trim();
  const fileInput = form.querySelector("#file");

  if (!firstName || !lastName || !fileInput.files.length) {
      alert("Please fill in all fields and attach a file.");
      return;
  }

  // Extract the category from the form's title or data attribute
  const categoryTitle = form.querySelector(".title").textContent.trim();

  // Create an object to store form data
  const formData = {
      firstName,
      lastName,
      fileName: fileInput.files[0].name,
      category: categoryTitle,
      submissionDate: new Date().toISOString()
  };

  // Retrieve existing form data from localStorage or initialize an empty array
  const submissions = JSON.parse(localStorage.getItem("studentSubmissions")) || [];
  submissions.push(formData); // Add the new data

  // Save back to localStorage
  localStorage.setItem("studentSubmissions", JSON.stringify(submissions));

  alert(`Form data for ${categoryTitle} successfully saved to local storage!`);
  form.reset(); // Clear form inputs
}

// Attach event listener to the submit button
document.querySelectorAll(".submit").forEach((button) => {
  button.addEventListener("click", storeFormData);
});

const something = null;
const storedCategory = String(localStorage.getItem('something')).charAt(0).toUpperCase() + String(localStorage.getItem('something')).slice(1).toLowerCase();
const storedXp = parseInt(localStorage.getItem('xp')) || 0;
console.log("stored xp is:",storedXp);
console.log('stored category is:',storedCategory);



xpData[storedCategory].levelXP += storedXp;
localStorage.setItem("xpData", JSON.stringify(xpData));
localStorage.removeItem('something');
localStorage.removeItem('xp');

console.log("idk")
updateXPBars();
storedCategory = null;
console.log("levelXP");

  // Save updated XP data to localStorage
localStorage.setItem("xpData", JSON.stringify(xpData));
console.log(`${storedXp} XP added to ${storedCategory}. Total XP: ${xpData[storedCategory].total}`);
updateXPBars(); // Update the XP bars to reflect the changes
  // Clear the stored data after processing
localStorage.removeItem("storedXp");
localStorage.removeItem("something");

