const allplayer = () => {
    fetch('https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p')
    .then(res => res.json())
    .then(data => { 
        displayplayer(data.player);
    })
    .catch(error => {
        console.error('Error', error);
    });
};

let playertitle=[];
let cart = [];
const maxPlayers = 11;

// Display Players
const displayplayer = (players) => {
    const playerContainer = document.getElementById("player-container");
    playerContainer.innerHTML = '';
    
    players.forEach((player) => {
        const div = document.createElement("div");
        div.classList.add("player");
        document.getElementById("detail-container").style.display = "none";
        div.innerHTML = `
            <img src="${player.strThumb}" alt="Player Img">
            <h3>${player.strPlayer}</h3>
            <h3>Nationality: ${player.strNationality}</h3>
            <h3>Team: ${player.strTeam}</h3>
            <h3>Sport: ${player.strSport}</h3>
            <h3>Gender: ${player.strGender}</h3>
            <p>${player.strDescriptionEN.slice(0, 50)}</p>
            <a href="${player.strTwitter}"><i class="fa-brands fa-twitter fa-lg"></i></a>
            <a href="${player.strInstagram}"><i class="fa-brands fa-instagram fa-lg"></i></a>
            <button class="button" onclick="singleproduct('${player.idPlayer}')">Details</button>
            <button class="button" onclick="HandleAddToCart('${player.strPlayer}')">Add to Cart</button>
        `;
        playerContainer.appendChild(div);
        div.setAttribute('player-name',player.strPlayer.toLowerCase());
        playertitle.push(player.strPlayer.toLowerCase());
    });
};

// Search Function
document.getElementById("button-action").addEventListener("click", (e) => {
    const input = document.getElementById("search").value.toLowerCase();
    const playerContainer = document.getElementById("player-container");
    const alertContainer = document.getElementById("not-found");

    alertContainer.innerHTML = ''; 
    
    let match = false; 

    Array.from(playerContainer.children).forEach(player => {
        const playerName = player.getAttribute('player-name');
        
        if (playerName.includes(input)) {
            player.style.display = ''; 
            match = true; 
        } else {
            player.style.display = 'none'; 
        }
    });

    if (!match) { 
        const alert = document.createElement("h3");
        alert.classList.add("alert-msg");
        alert.textContent = "No players found!!!!";
        alertContainer.appendChild(alert);
    }
});


// Add to Cart Button
const HandleAddToCart = (title) => {
    if (cart.length >= maxPlayers) {
        alert("11 players are already selected. You can't select any more.");
        return;
    }
    
    if (cart.includes(title)) {
        alert("This player is already in the cart.");
        return;
    }

    cart.push(title);

    const cartcount = document.getElementById("count");
    cartcount.innerText = cart.length;

    const container = document.getElementById("cart-main-container");

    const div = document.createElement("div");
    div.classList.add("cart-info");
    div.innerHTML = `
        <h3>Name: ${title}</h3>
    `;
    container.appendChild(div);
};

// Single Product Detail
const singleproduct = (id) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
        .then(res => res.json())
        .then(data => {
            const player = data.players[0]; 
            const modalContent = `
                <h2>${player.strPlayer}</h2>
                <p><strong>Nationality:</strong> ${player.strNationality}</p>
                <p><strong>Date of Birth:</strong> ${player.dateBorn}</p>
                <p><strong>Sign In Date:</strong> ${player.dateSigned}</p>
                <p><strong>Team:</strong> ${player.strTeam}</p>
                <p><strong>Description:</strong> ${player.strDescriptionEN}</p>
                <button class="detail-button" onclick="closeModal()">Close</button>
            `;
            document.getElementById("detail-content").innerHTML = modalContent;
            document.getElementById("detail-container").style.display = "block";
        })
        .catch(error => console.error('Error:', error));
};

// Close Button
const closeModal = () => {
    document.getElementById("detail-container").style.display = "none";
};

allplayer();



