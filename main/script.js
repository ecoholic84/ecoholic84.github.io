// Function to apply the stored theme as early as possible

(function() {

    var storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'light' || storedTheme === null) {

        document.body.classList.add('light-mode');

    } else {

        document.body.classList.remove('light-mode');

    }

})();



// Function to toggle theme and store preference

function toggleTheme() {

    var element = document.body;

    element.classList.toggle('light-mode');

    if (element.classList.contains('light-mode')) {

        localStorage.setItem('theme', 'light');

    } else {

        localStorage.setItem('theme', 'dark');

    }

}



// Apply the theme when the page loads (optional, as a safety measure)

window.addEventListener('DOMContentLoaded', function() {

    var storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'light' || storedTheme === null) {

        document.body.classList.add('light-mode');

    } else {

        document.body.classList.remove('light-mode');

    }

});



function goHome() {

    window.location.href = "/index.html"; // Replace "/" with the URL of your home page

}

// Function to generate blog content from Markdown

function generateBlogHTMLFromMarkdown(blogPath, targetElement, readMoreButton) {
    fetch(blogPath)

        .then(response => response.text())

        .then(markdown => {

            const converter = new showdown.Converter();

            const blogContentHTML = converter.makeHtml(markdown);



            // Create a div for the blog content and insert it after the blog summary

            const blogContentDiv = document.createElement('div');

            blogContentDiv.className = 'full-blog-content';

            blogContentDiv.innerHTML = blogContentHTML;



            // Check if there is already a content div to avoid duplicating

            const existingContent = targetElement.querySelector('.full-blog-content');

            if (existingContent) {

                targetElement.removeChild(existingContent);

            }

            targetElement.appendChild(blogContentDiv);


            // Hide the "Read More" button after loading the content

            readMoreButton.style.display = 'none';
        

        })

        .catch(error => console.error('Error loading Markdown blog:', error));

}



// Function for all-posts (summary list of blogs)

function generateBlogSummaryHTML(blogs) {

    const blogContainer = document.querySelector('.notes-container');



    blogs.forEach(blog => {

        const blogDiv = document.createElement('div');

        blogDiv.className = 'notes';



        const blogTitle = document.createElement('h2');

        blogTitle.textContent = blog.title;

        blogDiv.appendChild(blogTitle);



        const blogMeta = document.createElement('p');

        blogMeta.innerHTML = `<em>By ${blog.author} on ${blog.date}</em>`;

        blogDiv.appendChild(blogMeta);



        const blogContent = document.createElement('p');

        blogContent.textContent = blog.summary;

        blogDiv.appendChild(blogContent);



        const readMoreLink = document.createElement('a');

        readMoreLink.href = '#'; // Prevent default link behavior

        readMoreLink.textContent = 'Read More';

        readMoreLink.addEventListener('click', (event) => {

            event.preventDefault();

            generateBlogHTMLFromMarkdown(blog.file, blogDiv, readMoreLink);  // Pass the blogDiv and the readMoreLink

        });

        blogDiv.appendChild(readMoreLink);



        blogContainer.appendChild(blogDiv);

    });

}



// Fetch JSON data and generate the all-posts HTML on page load

document.addEventListener('DOMContentLoaded', () => {

    fetch('/main/data/all-posts.json')

        .then(response => response.json())

        .then(blogs => {

            generateBlogSummaryHTML(blogs);

        })

        .catch(error => console.error('Error loading JSON data:', error));

});

// Function to generate HTML for projects

function generateProjectHTML(projects) {

    const projectContainer = document.querySelector('.projects-container');



    projects.forEach(project => {

        const projectDiv = document.createElement('div');

        projectDiv.className = 'project';



        const projectTitle = document.createElement('h2');

        projectTitle.textContent = project.title;

        projectDiv.appendChild(projectTitle);



        const projectDescription = document.createElement('p');

        projectDescription.textContent = project.description;

        projectDiv.appendChild(projectDescription);



        const projectLink = document.createElement('a');

        projectLink.href = project.link;

        projectLink.textContent = "View Project";

        projectLink.target = "_blank";

        projectDiv.appendChild(projectLink);



        // Create and append hyphen separator

        const hyphenSeparator = document.createElement('div');

        hyphenSeparator.textContent = '-';

        hyphenSeparator.style.textAlign = 'left';

        projectDiv.appendChild(hyphenSeparator);



        projectContainer.appendChild(projectDiv);

    });

}



// Fetch JSON data and generate the projects HTML on page load

document.addEventListener('DOMContentLoaded', () => {

    fetch('/main/data/projects.json')

        .then(response => response.json())

        .then(projects => {

            generateProjectHTML(projects);

        })

        .catch(error => console.error('Error loading JSON data:', error));

});