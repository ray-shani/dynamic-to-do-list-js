// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskFeedback = document.getElementById('task-feedback'); // Element for displaying feedback messages

    /**
     * Displays a feedback message to the user.
     * @param {string} message - The message to display.
     * @param {string} type - The type of message ('success', 'error', 'info').
     */
    function showFeedback(message, type) {
        taskFeedback.textContent = message;
        taskFeedback.style.display = 'block'; // Make it visible

        // Remove previous styling classes
        taskFeedback.classList.remove('bg-green-100', 'text-green-700', 'border-green-300',
                                     'bg-red-100', 'text-red-700', 'border-red-300',
                                     'bg-blue-100', 'text-blue-700', 'border-blue-300');

        // Apply new styling based on message type
        if (type === 'success') {
            taskFeedback.classList.add('bg-green-100', 'text-green-700', 'border-green-300');
        } else if (type === 'error') {
            taskFeedback.classList.add('bg-red-100', 'text-red-700', 'border-red-300');
        } else if (type === 'info') {
            taskFeedback.classList.add('bg-blue-100', 'text-blue-700', 'border-blue-300');
        }

        // Hide the message after a few seconds
        setTimeout(() => {
            taskFeedback.style.display = 'hidden';
            taskFeedback.classList.add('hidden'); // Also hide using Tailwind
        }, 3000); // Message disappears after 3 seconds
    }

    /**
     * Adds a new task to the to-do list.
     */
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            showFeedback("Please enter a task.", "error"); // Use custom feedback instead of alert
            return; // Exit the function if input is empty
        }

        // Create a new list item (<li>) element
        const listItem = document.createElement('li');
        // Add Tailwind CSS classes for styling the list item
        listItem.className = 'flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200 shadow-sm';
        listItem.textContent = taskText; // Set its text content to the task text

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set its text content
        removeButton.className = 'remove-btn'; // Assign the 'remove-btn' class for styling

        // Assign an onclick event to the remove button
        // When triggered, it removes the parent li element from the taskList
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the list item from the unordered list
            showFeedback("Task removed successfully!", "success"); // Show success feedback
        };

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the new list item to the unordered list (task-list)
        taskList.appendChild(listItem);

        // Clear the task input field after adding the task
        taskInput.value = "";
        showFeedback("Task added successfully!", "success"); // Show success feedback
    }

    // Attach Event Listeners:

    // 1. Add an event listener to the addButton to call addTask when clicked
    addButton.addEventListener('click', addTask);

    // 2. Add an event listener to the taskInput for the 'keypress' event
    // This allows tasks to be added by pressing the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            addTask(); // Call the addTask function
        }
    });

    // Initial state: You might want to display some initial tasks or a welcome message here.
    // As per the prompt, `addTask` is only called on user action (button click or Enter key).
    // The instruction "Invoke the addTask function on DOMContentLoaded" would mean
    // calling it without user input, which isn't typical for a to-do item add.
    // Instead, the setup of listeners ensures the app is ready on DOMContentLoaded.
});
