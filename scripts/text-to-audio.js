document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please sign in to use the text-to-audio feature.');
        window.location.href = 'signin.html';
        return;
    }

    const convertBtn = document.getElementById('convert-btn');
    const audioPlayer = document.getElementById('audio-player');
    const downloadBtn = document.getElementById('download-btn');
    const audioOutput = document.querySelector('.audio-output');


    convertBtn.addEventListener('click', async () => {
        const content = document.getElementById('text-input').value.trim();

        if (!content) {
            alert('Please enter some text to convert.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content }),
            });

            const data = await response.json();

            if (response.ok) {

            const audioResponse = await fetch(`http://localhost:3000/getAudio/${data.audioFile.gridFSId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${token}`
                },
            });
            if (!audioResponse.ok) throw new Error('Failed to retrieve audio');

            const audioBlob = await audioResponse.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayer.src = audioUrl;
            audioOutput.classList.remove('hidden');
                downloadBtn.onclick = () => {
                    const a = document.createElement('a');
                    a.href = audioUrl;
                    a.download = 'converted-audio.mp3';
                    a.click();
                };
            } else {
                alert(data.message || 'Failed to convert text to audio.');
            }
        } catch (error) {
            console.error('Error during text-to-audio conversion:', error);
            alert('An error occurred while converting text to audio.');
        }
    });
});
