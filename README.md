# Met Artwork App

## Overview
The Met Artwork App is an interactive web application that allows users to explore and engage with the Metropolitan Museum of Art's collection. This app supports functionality for searching, viewing detailed information, managing favorites, and tracking search history using the Museum's public API.


<p align="center">
  <img src="/screenshots/home_screen.png" alt="home_screen" style="width:50%;">
</p>


## Features
### Artwork Search: Utilize various filters to explore artworks based on different criteria.

- **Simple Search**
<p align="center">
  <img src="/screenshots/simple_search.png" alt="simple_search" style="width:50%;">
</p>

- **Advanced Search**

<p align="center">
  <img src="/screenshots/advanced_search_query.png" alt="advanced_search_query" style="width:50%;">
  <br>
  <img src="/screenshots/advanced_search_results.png" alt="advanced_search_results" style="width:50%;">
  <br>
</p>

- **Detailed Artwork View**: Access detailed information about artworks including images, artist details, and descriptions.

<p align="center">
  <img src="/screenshots/detailed_artwork_card.png" alt="detailed_artwork_card" style="width:50%;">
</p>

- **Favorites Management**: Users can add or remove artworks from their favorites for easy access.

<p align="center">
  <img src="/screenshots/adding_to_favourites.png" alt="adding_to_favourites" style="width:50%;">
  <br>
  <img src="/screenshots/added_to_favourites.png" alt="added_to_favourites" style="width:50%;">
</p>

- **Search History**: Keeps a record of the user's search history for convenient reference.

<p align="center">
  <img src="/screenshots/search_history.png" alt="search_history" style="width:50%;">
</p>

- **Responsive Design**: Fully responsive on desktop and mobile devices.

<p align="center">
  <img src="/screenshots/hamburger_menu.png" alt="hamburger_menu" style="width:50%;">
</p>


## Technologies Used
- **Next.js**: A React framework for server-side rendering and building static web applications.
- **React**: A JavaScript library for building user interfaces.
- **Bootstrap and React-Bootstrap**: For responsive design and styling.
- **SWR**: A React hooks library for data fetching.
- **Jotai**: Minimalistic and framework-agnostic state management.
- **MongoDB Atlas**: Cloud database service for storing user data.
- **Node.js and Express**: For creating the backend API.
- **JWT (JSON Web Tokens)**: For secure API access and user session management.

## Architecture
- **User Interface**: Implemented with React and Next.js for dynamic and static pages.
- **API Integration**: Uses custom hooks and SWR for efficient data fetching from the Met Museum API and the backend.
- **State Management**: Managed globally using Jotai for user data like favorites and history.
- **Authentication**: Handles user registration, login, and session management using JWT.
- **Database**: Utilizes MongoDB Atlas for persistent storage of user-specific data.

