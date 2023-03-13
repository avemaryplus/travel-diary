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


