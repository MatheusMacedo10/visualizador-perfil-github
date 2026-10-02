const profileResults = document.querySelector('.profile-results');

export function showLoading() {
    profileResults.innerHTML = '<p class="loading">Carregando...</p>';
}

export function showMessage(message) {
    profileResults.textContent = message;
}

export function clearProfile() {
    profileResults.replaceChildren();
}

export function renderProfile(userData) {
    const profileCard = document.createElement('div');
    profileCard.className = 'profile-card';

    const avatar = document.createElement('img');
    avatar.src = userData.avatar_url;
    avatar.alt = `Avatar de ${userData.name || userData.login}`;
    avatar.className = 'profile-avatar';

    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';

    const name = document.createElement('h2');
    name.textContent = userData.name || userData.login;

    const bio = document.createElement('p');
    bio.textContent = userData.bio || 'Não possui bio cadastrada.';

    profileInfo.append(name, bio);
    profileCard.append(avatar, profileInfo);

    const counters = document.createElement('div');
    counters.className = 'profile-counters';

    [
        ['👥 Seguidores', userData.followers, 'followers'],
        ['👥 Seguindo', userData.following, 'following'],
    ].forEach(([label, value, className]) => {
        const counter = document.createElement('div');
        counter.className = className;

        const heading = document.createElement('h4');
        heading.textContent = label;

        const count = document.createElement('span');
        count.textContent = value;

        counter.append(heading, count);
        counters.append(counter);
    });

    profileResults.replaceChildren(profileCard, counters);
}
