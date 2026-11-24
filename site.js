const config = window.GLOW_SITE_CONFIG || {};
function externalUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}
const discord = externalUrl(config.discordUrl);
document.querySelectorAll('[data-discord]').forEach(button => {
  if (!discord) return;
  button.disabled = false;
  button.addEventListener('click', () => window.open(discord.href, '_blank', 'noopener,noreferrer'));
});
const amounts = document.querySelectorAll('[data-amount]');
const custom = document.querySelector('#custom-amount');
const donate = document.querySelector('[data-donate]');
let amount = 0;
function updateDonation() {
  const template = typeof config.donationUrl === 'string' ? config.donationUrl : '';
  const url = externalUrl(template.replace('{valor}', encodeURIComponent(amount.toFixed(2))));
  donate.disabled = !url || !Number.isFinite(amount) || amount <= 0;
}
amounts.forEach(button => button.addEventListener('click', () => {
  amount = Number(button.dataset.amount);
  custom.value = '';
  amounts.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  updateDonation();
}));
custom.addEventListener('input', () => {
  amount = Number(custom.value);
  amounts.forEach(item => item.setAttribute('aria-pressed', 'false'));
  updateDonation();
});
donate.addEventListener('click', () => {
  const url = externalUrl(config.donationUrl.replace('{valor}', encodeURIComponent(amount.toFixed(2))));
  if (url && amount > 0) window.open(url.href, '_blank', 'noopener,noreferrer');
});
if (discord) document.querySelector('.community .availability').textContent = 'Conheça a comunidade da Glow.';
if (externalUrl((config.donationUrl || '').replace('{valor}', '1.00')))
  document.querySelector('#donation-status').textContent = 'Você será direcionado à plataforma externa.';
