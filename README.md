## MDB Media Query Project

### Project Guidelines:

For this exercise, I’d like you to look at a simple API, TMDB API https://www.themoviedb.org/documentation/api, and write a web page that allows a user to search for movies by name. If results are found they need to be displayed in a nice and readable format, if no results are found then a friendly message should tell the user that their search didn’t find any results. You can feel free to expand on these requirements if you’d like, the goal here is to have fun and experiment with web services and web technologies. You are free to develop this however you want, use any technology, language, framework, etc. you’d like. It is highly recommended to deploy your working application to a runnable location, such as Github Pages.

### Requirements:

*Wireframes:*
[Miro Board](https://miro.com/app/board/uXjVM_HanXM=/?share_link_id=314779408430)

*MVP:*
- [ ] Pull from the API and display data
- [ ] Show poster, title, year, rating

*Tier 1 goals:*
- [ ] Filter movies by year, genre, rating
- [ ] Responsive resizing on mobile, with pop in and out filter for xs screen size
- [ ] Accessible tagging, aria labels, etc

*Additional Stretch Goals:*
- [ ] Paralax screen effect 
- [ ] Dark mode
- [ ] Modal popup displaying additional information
- [ ] Sticky sidebar, or slide-in slide out
- [ ] Pagination ()
Limitations:
- Time
- API does not provide much complex filters besides year
- I could create a front end filter that appends pages if I wanted to




*Tech*:
- React
  - Next.js
    - No: Next provides a great set of features for larger apps, eg SSR, integrated routing. I don't expect to use routing in this app.
  - Typescript
    - Yes: While maybe overkill, t will allow me to sharpen my TS skills and provide helpful autocomplete and type checking
- Material UI components
- Tailwind CSS