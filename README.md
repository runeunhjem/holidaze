## Project Exam 2 | Holidaze

[![Netlify Status](https://api.netlify.com/api/v1/badges/735d7f81-7243-4854-8ea3-30d4db3d3822/deploy-status)](https://app.netlify.com/sites/rundev-holidaze/deploys)

## Deployment on Netlify

[https://rundev-holidaze.netlify.app/](https://rundev-holidaze.netlify.app/)

## Deploy instructions

##### Add environment variable: VITE_API_KEY with the value of the API key

## Description

Holidaze is a project that was created as a part of the final exam in the course Frontend Development 2 at Noroff. The project is a fictional venue booking site where users can book hotels, send inquiries, and read more about the venues or add their own venues for other users to look at or book. The project is built with Vite, React and MUI, and the data is fetched from Noroff's Holidaze API. The project is responsive and works on all devices.



<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/runeunhjem/javascript-frameworks-ca-react/">
    <img src="public/header-logo-cgg.svg" alt="CGG Logo">
  </a>

  <h3 align="center">JS Frameworks CA - React with Vite</h3>

  <p align="left">
    You are tasked with build out the following pages for an eCom store:
      * Homepage
      * Individual product page
      * Cart page
      * Checkout success page
    The Homepage should have a list of all the products. There should be a look-ahead search bar that filters products when typing in a product name. Clicking on a product should take a user to an individual product page.

    You pages should use a <Layout> component that contains a header and footer. The header should contain a nav bar as well as a Cart icon component that acts as a button as well as displays the current number of items in the cart.

  </p>

  <p align="left">The individual product page should display data for a single product. There should be an Add to cart button which, upon clicking, adds the product to   the cart. The product page should display the title of the product, the description and the image. There should also be reviews listed for the product, if there are any. You should use the discountedPrice property to display the price of the product. If there is a difference between the discountedPrice and price properties then that means there is a discount for that product. Calculate what this discount is and display it on the page.</p>

  <p align="left">Clicking on the Cart icon will load the Cart page, which will list all of the products as well as a total. The Cart page will have a Checkout button. Clicking this Checkout button then goes to a Checkout success page.</p>

  <p align="left">The Checkout success page will display a message to the user notifying them that their order was successful. There should also be a link that lets a user go back to the store. The cart must be cleared if the user gets to the Checkout success page.</p>

  <p align="left">here will be a contact page which will contain a contact form with the following fields. There must be form validation:
    * Full name (Minimum number of characters is 3, required)
    * Subject (Minimum number of characters is 3, required)
    * Email (Must be a valid email address, required)
    * Body (Minimum number of characters is 3, required)</p>

  <p align="left">You will be using React Router to switch between pages.

Your design should be responsive. You are welcome to use a CSS Framework, however, you’re encouraged to design from scratch and use styled-components or CSS Modules.

You are not required to use TypeScript.

Your code is expected to be clean and well-formatted.</p>
<br />
<a href="https://github.com/runeunhjem/javascript-frameworks-ca-react"><strong>Explore the docs »</strong></a>
<br />
<br />

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Screenshot of the Project</a>
      <ul>
        <li><a href="#built-with">Tools used on the projects</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://javascript-frameworks-ca-react.netlify.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Tools used in the projects

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%23F24E1E.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23007ACC.svg?style=for-the-badge&logo=vite&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-%23DB7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)

### Languages used in the projects

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white) ![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Clone the repo, load it into VSC, install dependencies and run script (npm run dev) to go live locally.

### Prerequisites

In order to edit and work with the site locally, you need a code editor.

- Visual Studio Code is highly recommended, but use code editor of your choice.

### Installation

1. Install VSC and desired plugins
2. Clone the repo
   ```sh
   git clone https://github.com/runeunhjem/javascript-frameworks-ca-react.git
   ```
3. Install NPM packages
   ```sh
    npm install
    ```
4. Run the script to go live locally
    ```sh
    npm run dev
    ```
5. Open your browser and follow the link to the local server

6. Start working

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

An online E-com site. The site is responsive and works on all devices.

Find the latest and greatest version of the site at [https://javascript-frameworks-ca-react.netlify.app/](https://javascript-frameworks-ca-react.netlify.app/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap to this project

- [ ] Make the Header
- [ ] Make the Footer
- [ ] Added Layout component
- [ ] Added Homepage
- [ ] Added Product page
- [ ] Added Cart page
- [ ] Added Checkout success
- [ ] Added Contact

See the [open issues](https://github.com/runeunhjem/javascript-frameworks-ca-react/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Project Link: [https://github.com/runeunhjem/javascript-frameworks-ca-react](https://github.com/runeunhjem/javascript-frameworks-ca-react)

Call me - [+47 93 26 76 11](tel:+4793267611)
Email - [runeunhjem@gmail.com](mailto:runeunhjem@gmail.com)
Web (Portfolio) - [Rune Unhjem](https://runeunhjem.com)

##### Social media

LinkedIn - [Rune Unhjem](https://www.linkedin.com/in/runeunhjem/)
Facebook - [Rune Unhjem](https://www.facebook.com/runeunhjem/)
Instagram - [@runeunhjem](https://www.instagram.com/runeunhjem/)
GitHub - [runeunhjem](https://github.com/runeunhjem)

##### Other projects

My music project on Spotify - [Rune Unhjem | -=ThE rUnIcOrN=-](https://open.spotify.com/user/1116127880?si=8e9e9e8f3b5c4e9d)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Unsplash.com](https://unsplash.com/)
- [Iconfinder.com](https://www.iconfinder.com/)
- [Othneil Drew | README.md template](https://github.com/othneildrew)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Lorem Picsum](https://picsum.photos/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/runeunhjem/javascript-frameworks-ca-react.svg?style=for-the-badge
[contributors-url]: https://github.com/runeunhjem/javascript-frameworks-ca-react/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/runeunhjem/javascript-frameworks-ca-react.svg?style=for-the-badge
[forks-url]: https://github.com/runeunhjem/javascript-frameworks-ca-react/network/members
[stars-shield]: https://img.shields.io/github/stars/runeunhjem/javascript-frameworks-ca-react.svg?style=for-the-badge
[stars-url]: https://github.com/runeunhjem/javascript-frameworks-ca-react/stargazers
[issues-shield]: https://img.shields.io/github/issues/runeunhjem/javascript-frameworks-ca-react.svg?style=for-the-badge
[issues-url]: https://github.com/runeunhjem/javascript-frameworks-ca-react/issues
[license-shield]: https://img.shields.io/github/license/runeunhjem/javascript-frameworks-ca-react.svg?style=for-the-badge
[license-url]: https://github.com/runeunhjem/javascript-frameworks-ca-react/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/runeunhjem
[product-screenshot]: ./public/javascript-frameworks-ca-react.png

