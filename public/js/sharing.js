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
    // Share button clicks - intercept and show new dialog
    const shareButtons = ['shareProjectBtn', 'shareProjectBtn2'];
    shareButtons.forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            // Remove existing listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            // Add new listener
            newBtn.addEventListener('click', showShareMethodDialog);
        }
    });

    // Share method dialog
    document.getElementById('closeShareDialog')?.addEventListener('click', () => {
        hideModal('shareDialog');
    });

    document.getElementById('shareViaSupabase')?.addEventListener('click', () => {
        hideModal('shareDialog');
        showShareSupabaseDialog();
    });

    document.getElementById('shareViaFile')?.addEventListener('click', () => {
        hideModal('shareDialog');
        // Call the original shareProject function
        if (typeof shareProject === 'function') {
            shareProject();
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
// SHARE METHOD DIALOG
// ============================================

function showShareMethodDialog() {
    // Check if we have a project to share
    if (!frames || frames.length === 0) {
        alert('⚠️ Aucun projet à partager. Créez d\'abord quelque chose !');
        return;
    }

    showModal('shareDialog');
}

// ============================================
// SUPABASE SHARE DIALOG
// ============================================

function showShareSupabaseDialog() {
    // Reset form
    document.getElementById('shareRecipientEmail').value = '';
    document.getElementById('sharePermission').value = 'can_duplicate';
    document.getElementById('shareMessage').value = '';
    document.getElementById('shareExpiry').value = '';
    document.getElementById('shareMessageCount').textContent = '0';

    showModal('shareSupabaseDialog');
}

async function handleShareViaSupabase() {
    const email = document.getElementById('shareRecipientEmail').value.trim();
    const permission = document.getElementById('sharePermission').value;
    const message = document.getElementById('shareMessage').value.trim();
    const expiryDays = document.getElementById('shareExpiry').value;

    // Validation
    if (!email) {
        alert('⚠️ Veuillez entrer un email');
        return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('⚠️ Email invalide');
        return;
    }

    // Get current project name
    const projectName = document.getElementById('projectTitle')?.textContent || 'Nouveau projet';

    // Calculate expiry date
    let expiresAt = null;
    if (expiryDays) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays));
        expiresAt = expiryDate.toISOString();
    }

    // Show loading
    const confirmBtn = document.getElementById('confirmShareSupabase');
    const originalText = confirmBtn.textContent;
    confirmBtn.textContent = '⏳ Partage en cours...';
    confirmBtn.disabled = true;

    try {
        // Share via Supabase
        const result = await window.dbService.shareProject(projectName, email, {
            permission,
            message: message || null,
            expiresAt
        });

        if (result.success) {
            alert(`✅ Projet partagé avec succès !\n\nDestinataire : ${email}\nPermission : ${getPermissionLabel(permission)}`);
            hideModal('shareSupabaseDialog');

            // Log usage event
            if (typeof logUsageEvent === 'function') {
                logUsageEvent('project_shared_supabase', {
                    permission,
                    has_message: !!message,
                    has_expiry: !!expiresAt
                });
            }
        } else {
            alert(`❌ Erreur lors du partage :\n${result.error}`);
        }
    } catch (error) {
        console.error('Share error:', error);
        alert('❌ Une erreur est survenue lors du partage');
    } finally {
        confirmBtn.textContent = originalText;
        confirmBtn.disabled = false;
    }
}

function getPermissionLabel(permission) {
    const labels = {
        'can_duplicate': 'Peut dupliquer',
        'view_only': 'Voir uniquement',
        'can_edit': 'Peut éditer'
    };
    return labels[permission] || permission;
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
