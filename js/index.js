let countries = [];
const postForm = document.getElementById('post-form');
const select = document.getElementById('countrySelect');
const postsDiv = document.getElementById('posts');
const posts = JSON.parse(localStorage.getItem('travel-posts') || '[]');
let formСompletion = false;
const loader = document.getElementById('preloader');



const request = (config) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', function () {
    if (this.status >= 200 && this.status < 300) {
      config.success(this.responseText);
    } else {
      config.error(this.status);
    }
    xhr.addEventListener('error', function () {
      config.error('No internet');
    });
    xhr.addEventListener('timeout', function () {
      config.error('Response timeout');
    });
  });
  xhr.open(config.method, config.url);
  xhr.send();
};

const showInfo = function () {
  loader.style.display = 'block';
  request({
    method: 'GET',
    url: `https://restcountries.com/v3.1/all`,
    success: (data) => {
      loader.style.display = 'none';
      showOptions(data);
    },
    error: (error) => {
      alert(`Ошибка: ${error}`);
      loader.style.display = 'none';
    },
  })
}

showInfo();


function showOptions(data) {
  const countries = JSON.parse(data).map(function (country) {
    return {
      nameCommon: country.name.common,
    }
  });
  countries.forEach(country => {
    const option = document.createElement('option');
    option.append(country.nameCommon);
    select.append(option);
  })
}

function savePosts() {
  localStorage.setItem('travel-posts', JSON.stringify(posts));
  renderPosts();
}

function createPost() {
  const formData = new FormData(postForm);
  const post = {
    country: formData.get('country'),
    date: formData.get('date'),
    message: formData.get('message')
  };
  checkForm();
  if (formСompletion === true) {
    posts.push(post);
    savePosts();
  }
};


function checkForm() {
  const valueDate = document.getElementById('dateInput').value;
  const valueCountry = document.getElementById('countrySelect').value;
  const valueMessage = document.getElementById('messageInput').value;
  if (!valueDate) {
    alert('Вы не указали дату!');
  } else if (!valueCountry) {
    alert('Вы не указали страну!');
  } else if (!valueMessage) {
    alert('Вы не заполнили сообщение!');
  }
  if (valueDate && valueCountry && valueMessage) {
    formСompletion = true;
  }
}


function toSubmit(event) {
  event.preventDefault();
  createPost();
};

postForm.addEventListener('submit', toSubmit);

function deletePost(index) {
  if (confirm('Вы действительно хотите удалить эту запись?')) {
    posts.splice(index, 1);
    savePosts();
  }
};

function renderPosts() {
  postsDiv.innerHTML = '';
  posts.forEach((post, index) => {
    const div = document.createElement('div');
    div.classList.add('post');
    const postHead = document.createElement('h3');
    postHead.innerHTML = `Post <b>#${index + 1}</b> at <b>${post.date}</b> being in: <b>${post.country}</b>`;
    div.append(postHead);
    const message = document.createElement('p');
    message.textContent = post.message;
    div.append(message);
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'DELETE';
    deleteButton.addEventListener('click', () => deletePost(index));
    div.append(deleteButton);
    postsDiv.append(div);
  });
}

renderPosts();