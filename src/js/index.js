import { getUserProfile, GitHubApiError } from './services/github-api.js';
import { clearProfile, renderProfile, showLoading, showMessage } from './ui/profile-view.js';

const inputSearch = document.getElementById('input-search');
const btnSearch = document.getElementById('btn-search');

async function searchUser() {
    const userName = inputSearch.value.trim();

    if (!userName) {
        alert('Por favor, digite um nome de usuário do GitHub.');
        clearProfile();
        return;
    }

    showLoading();

    try {
        const userData = await getUserProfile(userName);
        renderProfile(userData);
    } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
        if (error instanceof GitHubApiError && error.status === 404) {
            showMessage('Usuário não encontrado. Verifique o nome e tente novamente.');
            return;
        }

        showMessage('Não foi possível buscar o perfil. Verifique sua conexão e tente novamente.');
    }
}

btnSearch.addEventListener('click', searchUser);
