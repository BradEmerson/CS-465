# CS-465
CS-465

**Architecture**

**Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
Why did the backend use a NoSQL MongoDB database?**

The Express-based customer-facing website provided fully rendered, modular (for the programmer, not the user) web pages to the user via a templating engine called Handlebars in concert with Express.  In contrast to the Express-based customer-facing website, the Admin SPA used the Angular framework to create a dynamic frontend web application.  This architecture was component-based and modular, allowing pages to be navigated and only the necessary portions of the page to update dynamically, rather than reloading the entire page.  Each component in the SPA communicates with the backend API asynchronously, ensuring real-time updates when administrators modify data.  Each request made by the Admin SPA is routed separately through the API to the Express backend, where the database processes requests asynchronously.  This modular nature provides administrators with near-instantaneous feedback when making changes.

The backend used a NoSQL database (in our case, MongoDB) because of the nature of a RESTful API. NoSQL databases such as MongoDB allow for the flexibility required to make the requests and results traffic back and forth to the server efficiently.  NoSQL databases allow the developer to use custom, flexible schemas as opposed to having to manipulate data between differently structured schemas in an SQL database.


**Functionality**

**How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?**

JSON, while technically a language, is more of a format than a programming language- much like Microsoft Excel has it's own language, but I wouldn't go so far as to call it a programming language.  JavaScript, on the other hand, is a programming language in its own right.  The JavaScript files' contents are programmed such that they use JSON to structure data in a specific manner (key/value pairs) to be passed back and forth between the frontend and backend.  To make an analogy here, if one were transporting clothing to wear on a vacation, JavaScript would be the process by which the passenger made their way to the airport, flew to the destination, and finally arrived at their destination quarters; whereas JSON would be their luggage.

**Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.**

One such instance was when I refactored code to pass the JWT (JSON Web TOken) as a string if it were requested via the API by the FrontEnd Angular site, but passed it as a cookie if being used by the Customer-Facing Express-based site, such that the user's browser stored the token until expiration (which I set for 7 days).  Another such instance, more towards the beginning of the project, was when I used handlebars to modularize the html components of the Express site, loading separate components such as the header and footer as partial handlebars components, instead of loading one single html page.  The benefits that come from reusable UI components are nearly identical to the benefits that come from any form of DRY (Don't Repeat Yourself) coding, being able to use that exact component in several places without having to recreate it.  This not only allows the program to execute faster, but saves time in development, and in many cases results in less data being transferred, allowing for more efficient resource usage.

**Testing**

Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

**Reflection**

How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?
