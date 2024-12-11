




document.addEventListener('DOMContentLoaded', () => {
    const signin = document.getElementsByClassName('signin')
    const signup = document.getElementsByClassName('signup')
    
    const token = localStorage.getItem('token');
    const welcomeMessage = document.getElementById('welcome-message');
    const getStart = document.getElementById('getstart');

    if (token) {
        if(getStart){
            getStart.addEventListener('click' , ()=>{
                window.location.href = '../project/textToAudio.html'
            })
        }
       
        const user = JSON.parse(atob(token.split('.')[1]));
        welcomeMessage.innerText = `Welcome, ${user.name}!`;
        if(signin.length && signup.length){
            signin[0].classList.add('hidden')
            signup[0].classList.add('hidden')
        }
    
    } else {
        welcomeMessage.innerText = '';
        if(getStart){
            getStart.addEventListener('click' , ()=>{
                window.location.href = '../project/signin.html'
            })
        }
    }
});
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}



