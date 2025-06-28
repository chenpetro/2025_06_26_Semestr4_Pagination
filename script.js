// const fetchPostsBtn = document.querySelector(".btn");
// const postList = document.querySelector(".posts");

// fetchPostsBtn.addEventListener("click", async () => {
//   try {
//     const posts = await fetchPosts();
//     renderPosts(posts);
//   } catch (error) {
//     console.log(error);
//   }
// });

// async function fetchPosts() {
//   // Change the number of items in the group here
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts?_limit=5"
//   );
//   return response.data;
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p>${body}</p>
//         </li>`;
//     })
//     .join("");
//   postList.innerHTML = markup;
// }

///////////////////////////////////////////////////////////////////////////////////////

// const fetchPostsBtn = document.querySelector(".btn");
// const postList = document.querySelector(".posts");

// fetchPostsBtn.addEventListener("click", async () => {
//   try {
//     const posts = await fetchPosts();
//     renderPosts(posts);
//   } catch (error) {
//     console.log(error);
//   }
// });

// async function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: 5,
//     Change the group number here
//     _page: 3
//   });

//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts?${params}`
//   );
//   return response.data;
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join("");
//   postList.innerHTML = markup;
// }

/////////////////////////////////////////////////////////////////////

// const fetchPostsBtn = document.querySelector(".btn");
// const postList = document.querySelector(".posts");

// // Controls the group number
// let page = 1;
// // Controls the number of items in the group
// let perPage = 10;

// fetchPostsBtn.addEventListener("click", async () => {
//   try {
//     const posts = await fetchPosts();
//     renderPosts(posts);
//     // Increase the group number
//     page += 1;

//     // Replace button text after first request
//     if (page > 1) {
//       fetchPostsBtn.textContent = "Fetch more posts";
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// async function fetchPosts() {
//   const params = new URLSearchParams({
//     _limit: perPage,
//     _page: page
//   });

//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts?${params}`
//   );
//   return response.data;
// }

// function renderPosts(posts) {
//   const markup = posts
//     .map(({ id, title, body, userId }) => {
//       return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//     })
//     .join("");
//   postList.insertAdjacentHTML("beforeend", markup);
// }


/////////////////////////////////////////////////////////////

// Розробка простої пагінації
// 1 Потрібно розробити веб-сторінку, яка відображає список користувачів.
// 2 Створіть функцію або клас, що відповідає за отримання списку користувачів з бази даних або іншого джерела даних.
// 3 Встановіть обмеження кількості користувачів, які будуть відображатись на одній сторінці.

// const fetchUsersBtn = document.querySelector(".btn");
// const UserList = document.querySelector(".Users");

// fetchUsersBtn.addEventListener("click", async () => {
//   try {
//     const { users } = await fetchUsers(); // отримуємо users з data
//     renderUsers(users);
//   } catch (error) {
//     console.log("Error loading users:", error);
//   }
// });

// async function fetchUsers() {
//   const response = await axios.get("https://dummyjson.com/users?limit=7");
//   return response.data; // повертає об'єкт з полем users
// }

// function renderUsers(users) {
//   const markup = users
//     .map(({ id, firstName, lastName, email, age, gender, image }) => {
//       return `<li>
//         <img src="${image}" alt="${firstName}" width="80" style="border-radius: 8px;" />
//         <h2 class="User-title">${firstName} ${lastName}</h2>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Age:</b> ${age}, <b>Gender:</b> ${gender}</p>
//         <p><b>User ID:</b> ${id}</p>
//       </li>`;
//     })
//     .join("");
//   UserList.innerHTML = markup;
// }



// 4 Реалізуйте пагінацію, яка включає номери сторінок, кнопки "Попередня сторінка" та "Наступна сторінка".

const fetchUsersBtn = document.querySelector(".btn");
const userList = document.querySelector(".Users");
const paginationContainer = document.querySelector(".pagination");

let currentPage = 1;
const limit = 10;
let totalPages = 1;

fetchUsersBtn.addEventListener("click", () => {
  currentPage = 1;
  loadUsers(currentPage);
});

async function loadUsers(page) {
  const skip = (page - 1) * limit;
  try {
    const { users, total } = await fetchUsers(skip, limit);
    renderUsers(users);
    totalPages = Math.ceil(total / limit);
    renderPagination();
  } catch (error) {
    console.error("Error loading users:", error);
  }
}

async function fetchUsers(skip = 0, limit = 10) {
  const response = await axios.get(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );
  return response.data;
}

function renderUsers(users) {
  const markup = users
    .map(({ id, firstName, lastName, email, age, gender, image }) => {
      return `<li>
        <img src="${image}" alt="${firstName}" width="80" style="border-radius: 8px;" />
        <h2 class="User-title">${firstName} ${lastName}</h2>
        <p><b>Email:</b> ${email}</p>
        <p><b>Age:</b> ${age}, <b>Gender:</b> ${gender}</p>
        <p><b>User ID:</b> ${id}</p>
      </li>`;
    })
    .join("");
  userList.innerHTML = markup;
}

function renderPagination() {
  let buttons = "";

  if (currentPage > 1) {
    buttons += `<button class="pagination-btn" data-page="${currentPage - 1}">⬅️ Previous</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    buttons += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  if (currentPage < totalPages) {
    buttons += `<button class="pagination-btn" data-page="${currentPage + 1}">Next ➡️</button>`;
  }

  paginationContainer.innerHTML = buttons;

  document.querySelectorAll(".pagination-btn").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const selectedPage = Number(e.target.dataset.page);
      if (selectedPage !== currentPage) {
        currentPage = selectedPage;
        loadUsers(currentPage);
      }
    })
  );
}

// 5 При кліці на номер сторінки або кнопку "Попередня/Наступна сторінка" відобразіть відповідний список користувачів на новій сторінці.