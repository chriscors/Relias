## MDB Media Query Project

### Project Guidelines:

For this exercise, I’d like you to look at a simple API, TMDB API https://www.themoviedb.org/documentation/api, and write a web page that allows a user to search for movies by name. If results are found they need to be displayed in a nice and readable format, if no results are found then a friendly message should tell the user that their search didn’t find any results. You can feel free to expand on these requirements if you’d like, the goal here is to have fun and experiment with web services and web technologies. You are free to develop this however you want, use any technology, language, framework, etc. you’d like. It is highly recommended to deploy your working application to a runnable location, such as Github Pages.

### Requirements:

*Wireframes:*
[Miro Board](https://miro.com/app/board/uXjVM_HanXM=/?share_link_id=314779408430)

*MVP:*
- [x] Pull data from the TMDB API and display it
- [x] Display poster, title, year, rating
- [x] Show a message if no results are found

*Tier 1 goals:*
- [x] Filter movies by year, genre, rating
- [x] Responsive resizing on mobile, with pop in and out filter for xs screen size
- [x] Accessible tagging, aria labels, etc

*Additional Stretch Goals:*
- [ ] Paralax screen effect on poster images
- [x] Implement dark mode
- [ ] Create a modal popup to display additional details
- [ ] Add a sticky sidebar or slide-in/slide-out functionality
- [x] Implememnt pagination

Limitations:
- Time
- API does not provide much complex filters besides year

### Product Description

I began this project by conducting research on popular movie sites, such as IMDB, rotten tomatoes, TMDB, viu, and noting which features and user interface componenbts were most attractive and interesting to me. I compiled that research in a Miro board and created a wireframe, planning out the look of my project and the features I hoped to include. I then conducted research on the tech stack I would include, opting for a single page application utilizing React with Vite, Typescript, and Material UI components that provide a modern UI. I was intentional to make the website mobile responsive by using the Grid2 component structure in MUI, which is built on top of CSS Flexbox, and include modern features such as system preference enabled dark mode. 


With this project, I aimed to showcase not only my strong front-end capabilities, but also my ability to implement complex and innovative solutions. To overcome the limitations of the TMDB API, which lacked advanced filtering options beyond release year, I extended its capabilities. Search results are compiled into an array via sequential, asynchronous axios requests, performed until all of the results have been obtained. These results are stored in the application's state, and filters for genre, release year, and ratings are applied. React's rerendering on filter changes provides an engaging user experience as users can see live updates to the search results. 


This project challenged me to deepen my comfort with Typescript, MUI component structure, asynchronous JavaScript, and advanced array manipulation. Given more time, I would have implemented a modal popup to display additional movie details when a user clicks on a card and dedicated more effort to accessibility features.

### Tech

The technologies used in this project and their justification:

- React: Used for responsiveness and state management.
  - Vite: Chosen for fast deployment, updating, and simple project scaffolding.
  - Typescript: Provided helpful autocomplete and type safety.
- Material UI components: Easy to use, well-documented, and highly modular.
- Tailwind CSS: Added modularity for making small changes.
- Vanilla CSS: Used for additional styling.
- Axios: Used for API queries.

### Running the Project Locally

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the "tmdb-vite" directory.
3. Run the command "npm run dev".