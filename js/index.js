let countries = [];
const postForm = document.getElementById('post-form');
const select = document.getElementById('countrySelect');
const postsDiv = document.getElementById('posts');
const posts = JSON.parse(localStorage.getItem('travel-posts') || '[]');
let formСompletion = false;
const loader = document.getElementById('preloader');



