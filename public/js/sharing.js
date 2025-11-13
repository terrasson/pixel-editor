// =====================================================
// PIXEL ART EDITOR - SHARING SYSTEM
// JavaScript pour gérer le partage de projets
// =====================================================

// ============================================
// INITIALIZATION
// ============================================

let pendingSharesCount = 0;

// Initialize sharing system
async function initSharingSystem() {
    setupShareEventListeners();
    await updatePendingSharesBadge();

    // Check for pending shares every 30 seconds
    setInterval(updatePendingSharesBadge, 30000);
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupShareEventListeners() {
    // Share button clicks - directly show public share dialog
    const shareButtons = ['shareProjectBtn', 'shareProjectBtn2'];
    shareButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            // Remove existing listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            // Add new listener for public share
            newBtn.addEventListener('click', handleShareButtonClick);
        }
    });

    // Supabase share dialog
    document.getElementById('closeShareSupabaseDialog')?.addEventListener('click', () => {
        hideModal('shareSupabaseDialog');
    });

    document.getElementById('cancelShareSupabase')?.addEventListener('click', () => {
        hideModal('shareSupabaseDialog');
    });

    document.getElementById('confirmShareSupabase')?.addEventListener('click', handleShareViaSupabase);

    // Message character counter
    const messageTextarea = document.getElementById('shareMessage');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', () => {
            const count = messageTextarea.value.length;
            document.getElementById('shareMessageCount').textContent = count;
        });
    }

    // Shared with me button
    const sharedButtons = ['sharedWithMeBtn', 'sharedWithMeBtnMobile'];
    sharedButtons.forEach(btnId => {
        document.getElementById(btnId)?.addEventListener('click', showSharedWithMeDialog);
    });

    // Shared with me dialog
    document.getElementById('closeSharedWithMeDialog')?.addEventListener('click', () => {
        hideModal('sharedWithMeDialog');
    });
}

// ============================================
// MODAL MANAGEMENT
// ============================================

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// ============================================
// PUBLIC SHARE BUTTON HANDLER
// ============================================

async function handleShareButtonClick() {
    // Check if we have a project to share
    if (!frames || frames.length === 0) {
        alert('⚠️ Aucun projet à partager. Créez d\'abord quelque chose !');
        return;
    }

    // Get current project name
    const projectName = document.getElementById('projectTitle')?.textContent || 'Nouveau projet';

    // Show loading state
    const button = event.currentTarget;
    const originalText = button.textContent;
    button.textContent = '⏳ Création du lien...';
    button.disabled = true;

    try {
        // Create public share
        const result = await window.dbService.createPublicShare(projectName, {
            allowDuplicate: true
        });

        if (result.success) {
            const shareUrl = window.dbService.getShareableUrl(result.data.share_token);

            // Log that link was created
            await window.dbService.logPublicShareAnalytics(result.data.id, 'link_copied');

            // Try to use Web Share API (mobile)
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: `${projectName} - Pixel Art`,
                        text: `Découvre mon pixel art "${projectName}" !`,
                        url: shareUrl
                    });

                    // Success
                    if (result.isNew) {
                        showShareSuccessMessage(shareUrl, true);
                    }
                } catch (shareError) {
                    // User cancelled or error
                    if (shareError.name !== 'AbortError') {
                        console.error('Share error:', shareError);
                        // Fallback to copy
                        await copyToClipboard(shareUrl, projectName);
                    }
                }
            } else {
                // Fallback for desktop - copy to clipboard
                await copyToClipboard(shareUrl, projectName);
            }
        } else {
            alert(`❌ Erreur lors de la création du lien :\n${result.error}`);
        }
    } catch (error) {
        console.error('Share error:', error);
        alert('❌ Une erreur est survenue lors du partage');
    } finally {
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Copy to clipboard with feedback
async function copyToClipboard(url, projectName) {
    try {
        await navigator.clipboard.writeText(url);
        showShareSuccessMessage(url, false);
    } catch (error) {
        console.error('Clipboard error:', error);
        // Fallback for older browsers
        showShareLinkDialog(url, projectName);
    }
}

// Show success message with link
function showShareSuccessMessage(url, wasShared) {
    const message = wasShared
        ? `✅ Lien partagé avec succès !\n\n📋 Le lien a aussi été copié dans le presse-papier :\n${url}`
        : `✅ Lien copié dans le presse-papier !\n\n📤 Partagez-le où vous voulez :\n${url}`;

    alert(message);
}

// Fallback dialog to manually copy link
function showShareLinkDialog(url, projectName) {
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(20, 20, 30, 0.98);
        padding: 30px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 10000;
        max-width: 90vw;
        width: 500px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    `;

    dialog.innerHTML = `
        <h3 style="margin: 0 0 20px 0; color: white; font-size: 1.3rem;">📤 Partagez votre projet</h3>
        <p style="color: rgba(255, 255, 255, 0.8); margin-bottom: 15px;">
            Copiez ce lien et partagez-le où vous voulez :
        </p>
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <input
                type="text"
                value="${url}"
                readonly
                style="flex: 1; padding: 12px; background: rgba(255, 255, 255, 0.1);
                       border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 10px;
                       color: white; font-size: 0.9rem;"
                onclick="this.select()"
            />
            <button
                onclick="
                    const input = this.previousElementSibling;
                    input.select();
                    document.execCommand('copy');
                    this.textContent = '✅ Copié !';
                    setTimeout(() => this.textContent = '📋 Copier', 2000);
                "
                style="padding: 12px 20px; background: linear-gradient(135deg, #007AFF, #5856D6);
                       border: none; border-radius: 10px; color: white; cursor: pointer;
                       font-weight: 600; white-space: nowrap;"
            >
                📋 Copier
            </button>
        </div>
        <button
            onclick="this.parentElement.remove()"
            style="width: 100%; padding: 12px; background: rgba(255, 255, 255, 0.1);
                   border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 10px;
                   color: white; cursor: pointer; font-weight: 600;"
        >
            Fermer
        </button>
    `;

    document.body.appendChild(dialog);
}

// ============================================
// SHARED WITH ME DIALOG
// ============================================

async function showSharedWithMeDialog() {
    showModal('sharedWithMeDialog');

    const listContainer = document.getElementById('sharedProjectsList');
    listContainer.innerHTML = '<div class="loading-state">Chargement des projets partagés...</div>';

    try {
        const result = await window.dbService.getSharedWithMeProjects();

        if (result.success) {
            const shares = result.data;

            if (shares.length === 0) {
                listContainer.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">📭</div>
                        <p>Aucun projet partagé pour le moment</p>
                        <small>Quand quelqu'un partagera un projet avec vous, il apparaîtra ici.</small>
                    </div>
                `;
            } else {
                listContainer.innerHTML = shares.map(share => createSharedProjectCard(share)).join('');

                // Attach event listeners to action buttons
                attachSharedProjectActionListeners();
            }
        } else {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">⚠️</div>
                    <p>Erreur lors du chargement</p>
                    <small>${result.error}</small>
                </div>
            `;
        }
    } catch (error) {
        console.error('Load shared projects error:', error);
        listContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚠️</div>
                <p>Une erreur est survenue</p>
            </div>
        `;
    }
}

function createSharedProjectCard(share) {
    const project = share.project;
    if (!project) return '';

    const statusClass = share.status === 'pending' ? 'pending' : 'accepted';
    const statusLabel = share.status === 'pending' ? 'Nouveau' : 'Accepté';

    const permissionIcon = {
        'can_duplicate': '📋',
        'view_only': '👁️',
        'can_edit': '✏️'
    }[share.permission] || '📋';

    const permissionLabel = getPermissionLabel(share.permission);

    const shareDate = new Date(share.created_at).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const messageHtml = share.message ? `
        <div class="shared-project-message">
            💬 "${share.message}"
        </div>
    ` : '';

    const actions = share.permission === 'view_only' ? `
        <button class="shared-project-action-btn secondary" data-share-id="${share.id}" data-action="view">
            👁️ Voir
        </button>
        <button class="shared-project-action-btn danger" data-share-id="${share.id}" data-action="decline">
            ✕ Refuser
        </button>
    ` : `
        <button class="shared-project-action-btn primary" data-share-id="${share.id}" data-action="duplicate">
            📋 Dupliquer
        </button>
        <button class="shared-project-action-btn secondary" data-share-id="${share.id}" data-action="view">
            👁️ Voir
        </button>
        <button class="shared-project-action-btn danger" data-share-id="${share.id}" data-action="decline">
            ✕ Refuser
        </button>
    `;

    return `
        <div class="shared-project-card ${statusClass}">
            <div class="shared-project-thumbnail">
                ${project.thumbnail ? `<img src="${project.thumbnail}" alt="${project.name}">` : ''}
            </div>
            <div class="shared-project-info">
                <div class="shared-project-header">
                    <h4 class="shared-project-title">${escapeHtml(project.name)}</h4>
                    <span class="shared-project-status ${statusClass}">${statusLabel}</span>
                </div>
                <div class="shared-project-meta">
                    <div class="shared-project-meta-row">
                        <span>📧 De : ${escapeHtml(share.owner_email)}</span>
                    </div>
                    <div class="shared-project-meta-row">
                        <span>📅 ${shareDate}</span>
                    </div>
                    <div class="shared-project-meta-row">
                        <span>${permissionIcon} ${permissionLabel}</span>
                    </div>
                </div>
                ${messageHtml}
                <div class="shared-project-actions">
                    ${actions}
                </div>
            </div>
        </div>
    `;
}

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function attachSharedProjectActionListeners() {
    document.querySelectorAll('[data-share-id][data-action]').forEach(btn => {
        btn.addEventListener('click', handleSharedProjectAction);
    });
}

async function handleSharedProjectAction(e) {
    const shareId = e.currentTarget.dataset.shareId;
    const action = e.currentTarget.dataset.action;

    switch (action) {
        case 'duplicate':
            await handleDuplicateShare(shareId, e.currentTarget);
            break;
        case 'view':
            await handleViewShare(shareId);
            break;
        case 'decline':
            await handleDeclineShare(shareId, e.currentTarget);
            break;
    }
}

async function handleDuplicateShare(shareId, button) {
    const originalText = button.textContent;
    button.textContent = '⏳ Duplication...';
    button.disabled = true;

    try {
        const result = await window.dbService.duplicateSharedProject(shareId);

        if (result.success) {
            alert(`✅ Projet dupliqué avec succès !\n\nLe projet "${result.data.name}" a été ajouté à vos projets.`);

            // Accept the share automatically
            await window.dbService.acceptShare(shareId);

            // Refresh the list
            await showSharedWithMeDialog();
            await updatePendingSharesBadge();
        } else {
            alert(`❌ Erreur lors de la duplication :\n${result.error}`);
            button.textContent = originalText;
            button.disabled = false;
        }
    } catch (error) {
        console.error('Duplicate error:', error);
        alert('❌ Une erreur est survenue');
        button.textContent = originalText;
        button.disabled = false;
    }
}

async function handleViewShare(shareId) {
    try {
        const result = await window.dbService.getSharedProjectData(shareId);

        if (result.success) {
            // Load the project data
            const projectData = result.data;

            // Confirm with user
            const confirmed = confirm(`👁️ Voir le projet "${projectData.name}" ?\n\n⚠️ Cela remplacera votre projet actuel.\n\nPermission : ${getPermissionLabel(result.permission)}`);

            if (confirmed) {
                // Load frames and other data
                if (typeof normaliseFrames === 'function') {
                    frames = normaliseFrames(projectData.frames);
                    currentFrame = projectData.current_frame || 0;
                    animationFPS = projectData.fps || 24;

                    // Load custom colors if available
                    if (projectData.custom_colors) {
                        customColors = typeof projectData.custom_colors === 'string'
                            ? JSON.parse(projectData.custom_colors)
                            : projectData.custom_colors;
                    }

                    // Update UI
                    if (typeof updateAllFrames === 'function') updateAllFrames();
                    if (typeof loadFrame === 'function') loadFrame(currentFrame);
                    if (typeof updateColorPalette === 'function') updateColorPalette();

                    // Update title
                    const title = document.getElementById('projectTitle');
                    if (title) title.textContent = `${projectData.name} (partagé)`;

                    // Accept the share
                    await window.dbService.acceptShare(shareId);
                    await updatePendingSharesBadge();

                    hideModal('sharedWithMeDialog');
                    alert(`✅ Projet "${projectData.name}" chargé avec succès !`);
                }
            }
        } else {
            alert(`❌ Erreur lors du chargement :\n${result.error}`);
        }
    } catch (error) {
        console.error('View share error:', error);
        alert('❌ Une erreur est survenue');
    }
}

async function handleDeclineShare(shareId, button) {
    const confirmed = confirm('⚠️ Êtes-vous sûr de vouloir refuser ce partage ?');

    if (!confirmed) return;

    const originalText = button.textContent;
    button.textContent = '⏳ Refus...';
    button.disabled = true;

    try {
        const result = await window.dbService.declineShare(shareId);

        if (result.success) {
            alert('✅ Partage refusé');
            await showSharedWithMeDialog();
            await updatePendingSharesBadge();
        } else {
            alert(`❌ Erreur :\n${result.error}`);
            button.textContent = originalText;
            button.disabled = false;
        }
    } catch (error) {
        console.error('Decline error:', error);
        alert('❌ Une erreur est survenue');
        button.textContent = originalText;
        button.disabled = false;
    }
}

// ============================================
// BADGE MANAGEMENT
// ============================================

async function updatePendingSharesBadge() {
    try {
        const result = await window.dbService.getPendingSharesCount();

        if (result.success) {
            pendingSharesCount = result.count;
            updateBadgeDisplay();
        }
    } catch (error) {
        console.error('Update badge error:', error);
    }
}

function updateBadgeDisplay() {
    const badges = ['sharedBadge', 'sharedBadgeMobile'];

    badges.forEach(badgeId => {
        const badge = document.getElementById(badgeId);
        if (badge) {
            if (pendingSharesCount > 0) {
                badge.textContent = pendingSharesCount;
                badge.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
            }
        }
    });
}

// ============================================
// AUTO-INITIALIZATION
// ============================================

// Initialize when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSharingSystem);
} else {
    // DOMContentLoaded already fired, but wait a bit for other scripts
    setTimeout(initSharingSystem, 1000);
}
