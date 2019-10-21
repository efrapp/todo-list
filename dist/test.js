document.addEventListener('DOMContentLoaded', () => {
  const a = document.getElementById('default-project-link');
  a.addEventListener('click', () => {
    console.log('With arrow function', this);
  });

  a.addEventListener('click', function () {
    console.log('With normal function', this);
  });
});