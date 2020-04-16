# README

This is a repo for a single page web app with a javascript frontend and a rails backend. The frontend and backend connect with fetches from the frontend to the back. The backend hosts the database.

This web app is a task manager that allows a user to sign up, login, and then create, edit, and delete their tasks. When a task is created, the user enters the task's content and an associated category. Currently, only seed data is available for categories. It is possible to add categories, however, this is not included here.

So a user creates her task with its content and category. Each category has an associated color (blues and yellows for the moment). When a task is created a new card for the task is added to the day and has an outlined border color. Once the user completes the task by clicking the completed button, the button changes color to show the task has been completed. New tasks are added to that day of week's card and all of these bigger cards (outlined in black) are added to the month. So it is similar to a calendar but the order is reversed, showing most recent tasks.

In addition, a user can see the percent completed of all tasks rendered in an animated circle. This circle updates or renders when the page is refresh or any events with tasks occur such as deleting, creating, and completing.


