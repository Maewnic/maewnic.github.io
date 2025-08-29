// find grid container
const gridContainer = document.querySelector("#grid-container");

let blogPostHolder = ``;

function addBlogPost(item, index) {
  console.log(item);
  console.log(index);
  blogPostHolder += `
    <article id="box${item.id}">
        <h3>${item.title}</h3>
        <p>${item.content}</p>
    </article>`;
}

// run addBlogPost on each item of array
blogPosts.forEach(addBlogPost);

// set my final inner HTML
gridContainer.innerHTML = blogPostHolder;
