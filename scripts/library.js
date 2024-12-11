

const library = document.getElementById('library');
const textBox = document.getElementById('content')
function download(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'coverted-audio.mp3';
    a.click()
}
async function deleteAudio(fileId , textId){
    const params = {
       id :  fileId,
        textId : textId
    }

    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:3000/deleteAudio?${queryString}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
    })

    const data = await response.json()
    console.log(data);
    if(!response.ok){
        throw new Errpr('failed to delete an audio')
    }

    // window.location.href = 'library.html'
}

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to sign in to access your library.');
        window.location.href = 'signin.html';
        return;
    }

    const response = await fetch(`http://localhost:3000/getUserAudios`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error('Failed to retrieve audio');
    }

    const data = await response.json();
    if (response.ok) {
        const texts = data.contents;
        console.log(texts[1]._id);
        for (let index = 0; index < data.audioFiles.length; index++) {
            const audioPlayerResponse = await fetch(`http://localhost:3000/getAudio/${data.audioFiles[index].id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            if (!audioPlayerResponse.ok) throw new Error('Failed to retrieve audio');

            const audioBlob = await audioPlayerResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);

            library.innerHTML += `
        <div class="audio-output">
        <p>${texts[index].content} ..</p>
        <audio src=${audioUrl} id="audio-player" controls></audio>
        <button id="delete-btn" onclick="deleteAudio('${data.audioFiles[index].id}','${texts[index]._id}')" class="button">Delete Audio</button>
        <button id="download-btn" onclick="download('${audioUrl}')" class="button">Download Audio</button>
 <div/>`;


        }


    }

});

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}
