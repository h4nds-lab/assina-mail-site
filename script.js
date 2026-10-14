const state = { template: 'classic', customize: false, color: '#6956e8', socialColor: '#34384e', imageData: '', logoData: '', avatar: '', emoji: '', emojiBg: '#eee8ff', iconStyle: 'line', accentIcon: '', custom: {order:['photo','info','logo'],align:'left',background:'#ffffff',borderColor:'#e9eaf0',borderWidth:1,radius:0,iconMode:'auto',iconColor:'#6956e8',photoSize:68,logoSize:84,nameFont:"'DM Sans', Arial, sans-serif",nameSize:20,roleFont:"'DM Sans', Arial, sans-serif",roleSize:13,contactFont:"'DM Sans', Arial, sans-serif",contactSize:13} };
const tabs = ['modelos', 'dados', 'estilo', 'personalizar', 'extras'];
const fields = ['name', 'role', 'company', 'email', 'phone', 'website', 'address', 'font', 'fontSize', 'showDivider', 'imageUrl', 'logoUrl', 'linkedin', 'instagram', 'tagline'];
const $ = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const value = (id) => $(id).value.trim();
const safeUrl = (input) => {
  if (!input) return '';
  try { const url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; }
  catch { return ''; }
};
const link = (href, label, color, fontSize, font) => `<a href="${escapeHtml(href)}" style="color:${color};text-decoration:none;font-family:${font};font-size:${fontSize}px;line-height:1.5">${escapeHtml(label)}</a>`;
const td = (content, styles = '') => `<td style="${styles}">${content}</td>`;
const avatarOptions = [
  {id:'creator', emoji:'👩🏽‍💻', label:'Criadora', bg:'#eee8ff'},
  {id:'artist', emoji:'👩🏿‍🎨', label:'Artista', bg:'#ffe8dc'},
  {id:'leader', emoji:'👨🏻‍💼', label:'Líder', bg:'#e1efff'},
  {id:'teacher', emoji:'👨🏽‍🏫', label:'Professor', bg:'#e5f4e7'},
  {id:'scientist', emoji:'👩🏼‍🔬', label:'Cientista', bg:'#fff0d8'},
  {id:'explorer', emoji:'🧑🏾‍🚀', label:'Explorador', bg:'#e5e8fa'}
];
const accentOptions = [
  {id:'star', glyph:'★', label:'Estrela'}, {id:'heart', glyph:'♥', label:'Coração'},
  {id:'leaf', glyph:'❧', label:'Folha'}, {id:'zap', glyph:'ϟ', label:'Energia'},
  {id:'sparkles', glyph:'✦', label:'Brilho'}, {id:'coffee', glyph:'☕', label:'Café'},
  {id:'camera', glyph:'📷', label:'Câmera'}, {id:'briefcase-business', glyph:'▣', label:'Trabalho'}
];
const contactGlyphs = {email:'✉', phone:'✆', website:'➤', address:'⌖', linkedin:'in', instagram:'◎'};
const iconPaths = {
  email: {line:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>', filled:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 7 9 6 9-6" fill="none" stroke="#ffffff" stroke-width="2"/>'},
  phone: {line:'<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>', filled:'<path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.3.57 3.53.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.28 21 3 13.72 3 4.75a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.23.2 2.42.57 3.53a1 1 0 0 1-.25 1.01l-2.2 2.5Z"/>'},
  website: {line:'<path d="M4 3v17l4.7-4.5 3.1 6 2.8-1.4-3.1-6.1H18L4 3Z"/>', filled:'<path d="M4 2.5v18.3l4.8-4.6 3.1 6.1 3.6-1.8-3.1-6.1h7.3L4 2.5Z"/>'},
  address: {line:'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>', filled:'<path d="M12 1a9 9 0 0 0-9 9c0 6.3 9 13 9 13s9-6.7 9-13a9 9 0 0 0-9-9Z"/><circle cx="12" cy="10" r="3" fill="#ffffff"/>'},
  linkedin: {viewBox:'0 0 16 16',line:'<rect x=".7" y=".7" width="14.6" height="14.6" rx="2"/><circle cx="4.1" cy="4.1" r=".8" fill="currentColor" stroke="none"/><path d="M4.1 7v5M7.3 12V7h1.8v.7c.4-.6 1-.9 1.8-.9 1.4 0 2.1.9 2.1 2.4V12M9.1 9.2V12"/>',filled:'<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>'},
  instagram: {line:'<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>', filled:'<rect x="1" y="1" width="22" height="22" rx="6"/><rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#ffffff" stroke-width="1.7"/><circle cx="12" cy="12" r="3.2" fill="none" stroke="#ffffff" stroke-width="1.7"/><circle cx="17" cy="7" r="1" fill="#ffffff"/>'}
};
const iconColor = (kind, fallback, forceColor = false) => !forceColor && ['linkedin','instagram'].includes(kind) ? state.socialColor : fallback;
const iconCache = new Map();
async function prepareContactIcons() {
  const style = state.iconStyle, color = state.color;
  if (style === 'none') return;
  const variants = Object.keys(iconPaths).flatMap((kind) => [...new Set([color, '#ffffff', state.socialColor, state.custom.iconColor])].map((tint) => ({kind, tint})));
  await Promise.all(variants.map(async ({kind, tint}) => {
    const key = `${style}:${tint}:${kind}`;
    if (iconCache.has(key)) return;
    const filled = style === 'filled';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${iconPaths[kind].viewBox || '0 0 24 24'}" width="48" height="48" fill="${filled ? tint : 'none'}" color="${tint}" stroke="${filled ? 'none' : tint}" stroke-width="${kind === 'linkedin' ? '1.4' : '2'}" stroke-linecap="round" stroke-linejoin="round">${iconPaths[kind][style]}</svg>`;
    const image = new Image(); image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await image.decode();
    const canvas = document.createElement('canvas'); canvas.width = 48; canvas.height = 48;
    canvas.getContext('2d').drawImage(image, 0, 0, 48, 48);
    iconCache.set(key, canvas.toDataURL('image/png'));
  }));
}
function contactIcon(kind, color, size, forceColor = false, profile = 'full') {
  if (state.iconStyle === 'none') return '';
  if (profile !== 'full') {
    if (kind === 'linkedin' || kind === 'instagram') return '';
    return `<span style="display:inline-block;width:18px;color:${color};font-family:Arial,sans-serif;font-size:${Math.max(12,size)}px;text-align:center;vertical-align:middle">${contactGlyphs[kind] || ''}</span>`;
  }
  const cached = iconCache.get(`${state.iconStyle}:${iconColor(kind,color,forceColor)}:${kind}`);
  if (cached) return `<img src="${cached}" alt="" width="18" height="18" style="display:inline-block;width:18px;height:18px;border:0;vertical-align:middle">`;
  const glyph = contactGlyphs[kind] || '';
  color = iconColor(kind, color, forceColor);
  const solid = state.iconStyle === 'filled';
  const light = color.toLowerCase() === '#ffffff';
  return `<span style="display:inline-block;width:18px;height:18px;line-height:17px;text-align:center;vertical-align:middle;border:${solid ? '0' : `1px solid ${color}`};border-radius:50%;background:${solid ? color : 'transparent'};color:${solid ? light ? '#263244' : '#ffffff' : color};font-family:Arial,sans-serif;font-size:${glyph === 'in' ? '9' : Math.max(10,size-2)}px;font-weight:700;box-sizing:border-box">${glyph}</span>`;
}
const signatureTable = (content, extra = '') => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;min-width:440px;max-width:540px;border-collapse:collapse;background:#ffffff;${extra}">${content}</table>`;

function makeSignature(profile = 'full') {
  const name = value('name');
  const role = value('role');
  const company = value('company');
  const email = value('email');
  const phone = value('phone');
  const website = safeUrl(value('website'));
  const address = value('address');
  const image = safeUrl(value('imageUrl')) || (profile === 'full' ? state.imageData : '');
  const logo = safeUrl(value('logoUrl')) || (profile === 'full' ? state.logoData : '');
  const linkedin = safeUrl(value('linkedin'));
  const instagram = safeUrl(value('instagram'));
  const tagline = value('tagline');
  const font = $('font').value;
  const size = Number($('fontSize').value);
  const color = state.color;
  const base = `font-family:${font};font-size:${size}px;color:#495166;line-height:1.45`;
  const nameRow = name ? `<div style="font-family:${font};font-size:${size + 7}px;line-height:1.22;font-weight:700;color:${color};overflow-wrap:break-word">${escapeHtml(name)}</div>` : '';
  const roleRow = role ? `<div style="${base};font-weight:600;margin-top:3px">${escapeHtml(role)}</div>` : '';
  const companyRow = company ? `<div style="${base};font-size:${size-1}px;margin-top:2px">${escapeHtml(company)}</div>` : '';
  const contact = [
    email && {href:`mailto:${email}`, label:email, icon:'email'},
    phone && {href:`tel:${phone.replace(/[^+\d]/g, '')}`, label:phone, icon:'phone'},
    website && {href:website, label:new URL(website).hostname.replace(/^www\./, ''), icon:'website'},
    address && {label:address, icon:'address'}
  ].filter(Boolean);
  const contactRows = contact.length ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:11px;width:100%">${contact.map((item) => `<tr>${state.iconStyle === 'none' ? '' : td(contactIcon(item.icon, color, size, false, profile), 'width:24px;vertical-align:top;padding:2px 0 3px')}${td(item.href ? `<a href="${escapeHtml(item.href)}" style="${base};color:#3c465b;text-decoration:none;overflow-wrap:anywhere">${escapeHtml(item.label)}</a>` : `<span style="${base};overflow-wrap:break-word">${escapeHtml(item.label)}</span>`, 'vertical-align:top;padding:2px 0 3px')}</tr>`).join('')}</table>` : '';
  const socials = [linkedin && {href:linkedin,label:'LinkedIn',icon:'linkedin'}, instagram && {href:instagram,label:'Instagram',icon:'instagram'}].filter(Boolean);
  const socialsRow = socials.length ? `<div style="margin-top:9px">${socials.map((item) => `<a href="${escapeHtml(item.href)}" style="display:inline-block;margin:0 8px 4px 0;padding:4px 7px;border:1px solid #dfe2eb;border-radius:4px;color:#3d465a;text-decoration:none;font-family:${font};font-size:${size-2}px;font-weight:700;white-space:nowrap">${state.iconStyle === 'none' || profile !== 'full' ? '' : `${contactIcon(item.icon,color,size,false,profile)}&nbsp;`}${item.label}</a>`).join('')}</div>` : '';
  const accent = accentOptions.find((item) => item.id === state.accentIcon);
  const taglineRow = tagline ? `<div style="margin-top:11px;font-style:italic;${base}">${accent ? `<span style="color:${color};margin-right:5px">${accent.glyph}</span>` : ''}${escapeHtml(tagline)}</div>` : '';
  const initials = (name || 'A').split(/\s+/).slice(0,2).map((part) => part[0]?.toUpperCase() || '').join('');
  const brandInitials = (company || 'Sua marca').split(/\s+/).slice(0,2).map((part) => part[0]?.toUpperCase() || '').join('');
  const chosen = avatarOptions.find((item) => item.id === state.avatar);
  const emoji = state.emoji.trim();
  const portrait = image ? `<img src="${escapeHtml(image)}" width="68" height="68" alt="${escapeHtml(name ? `Foto de ${name}` : 'Foto de perfil')}" style="display:block;width:68px;height:68px;object-fit:cover;border-radius:50%;border:0">` : chosen
    ? `<span role="img" aria-label="${escapeHtml(chosen.label)}" style="display:block;width:68px;height:68px;border-radius:50%;background:${chosen.bg};font-size:36px;line-height:68px;text-align:center">${chosen.emoji}</span>`
    : emoji ? `<span role="img" aria-label="Emoji do perfil" style="display:block;width:68px;height:68px;border-radius:50%;background:${state.emojiBg};font-size:36px;line-height:68px;text-align:center">${escapeHtml(emoji)}</span>`
    : `<span style="display:block;width:68px;height:68px;border-radius:50%;background:#eeeafd;color:${color};font-family:${font};font-size:21px;font-weight:700;line-height:68px;text-align:center">${escapeHtml(initials)}</span>`;
  const logoMark = (light = false, width = 80) => logo
    ? `<img src="${escapeHtml(logo)}" width="${width}" alt="${escapeHtml(company ? `Logo de ${company}` : 'Logo da empresa')}" style="display:block;max-width:${width}px;max-height:${Math.min(90,width)}px;width:auto;height:auto;border:0;margin:auto">`
    : `<span style="display:block;font-family:${font};font-size:25px;font-weight:800;letter-spacing:-2px;color:${light ? '#ffffff' : color};line-height:1.2;text-align:center">${escapeHtml(brandInitials)}</span>`;
  const brandCaption = company ? `<div style="font-family:${font};font-size:9px;line-height:1.25;letter-spacing:.8px;color:#ffffff;text-align:center;margin-top:7px;overflow-wrap:break-word">${escapeHtml(company)}</div>` : '';
  const info = nameRow + roleRow + companyRow + contactRows + socialsRow + taglineRow;
  let contents = '';
  if (!state.customize && state.template === 'classic') {
    contents = signatureTable(`<tr>${td(portrait, `width:72px;vertical-align:top;padding:15px 8px 15px 12px;${$('showDivider').checked ? `border-right:2px solid ${color}` : ''}`)}${td(info, 'vertical-align:top;padding:14px 10px;min-width:0')}${td(logoMark(true,75) + brandCaption, `width:98px;vertical-align:middle;background:${color};padding:12px 8px`)}</tr>`, `border:1px solid #e9eaf0`);
  } else if (!state.customize && state.template === 'modern') {
    contents = signatureTable(`<tr>${td(portrait + `<div style="margin-top:10px;font-family:${font};font-size:10px;color:#ffffff;text-align:center">${escapeHtml(company)}</div>`, `width:95px;background:${color};padding:15px 12px;vertical-align:middle;text-align:center`)}${td(`<div style="border-top:3px solid ${color};padding-top:9px">${info}</div>`, 'padding:14px 14px;vertical-align:top;min-width:0')}${td(logoMark(false,58), 'width:65px;vertical-align:top;padding:22px 10px 0 0')}</tr>`, 'border:1px solid #e9eaf0');
  } else if (!state.customize && state.template === 'minimal') {
    contents = signatureTable(`<tr>${td(`<div style="border-left:3px solid ${color};padding-left:13px">${info}</div>`, 'vertical-align:top;padding:12px 8px')}${td(logoMark(false,64), 'width:78px;vertical-align:top;padding:14px 8px')}</tr>`);
  } else if (!state.customize && state.template === 'banner') {
    contents = signatureTable(`<tr>${td(logoMark(true,85) + brandCaption, `width:120px;background:${color};padding:25px 12px;vertical-align:middle;border-radius:0 0 22px 0`)}${td(`<div style="border-bottom:2px solid ${color};padding-bottom:8px;margin-bottom:7px">${nameRow}${roleRow}</div>${companyRow}${contactRows}${socialsRow}${taglineRow}`, 'vertical-align:top;padding:15px 18px;min-width:0')}</tr>`, 'border:1px solid #e9eaf0');
  } else if (!state.customize && state.template === 'side') {
    contents = signatureTable(`<tr>${td(portrait, 'width:75px;vertical-align:middle;padding:15px 8px')}${td(info, `vertical-align:top;padding:13px 11px;border-left:${$('showDivider').checked ? `2px solid ${color}` : '0'};min-width:0`)}${td(logoMark(true,76), `width:94px;vertical-align:middle;background:${color};padding:16px 8px`)}</tr>`, 'border:1px solid #e9eaf0');
  } else if (!state.customize && state.template === 'stripe') {
    contents = signatureTable(`<tr>${td(portrait,'width:78px;padding:15px 10px;vertical-align:middle')}${td(info,'padding:15px 12px;vertical-align:top;min-width:0')}${td(logoMark(false,72),'width:88px;padding:15px 10px;vertical-align:middle')}</tr>`,`border:1px solid #e9eaf0;border-top:5px solid ${color}`);
  } else if (state.customize) {
    const custom = state.custom;
    const dark = parseInt(custom.background.slice(1,3),16)*.2126 + parseInt(custom.background.slice(3,5),16)*.7152 + parseInt(custom.background.slice(5,7),16)*.0722 < 125;
    const align = custom.align;
    const coloredPositions = {classic:[2],modern:[0],minimal:[],banner:[0],side:[2],stripe:[]}[state.template] || [];
    const customPortrait = image ? `<img src="${escapeHtml(image)}" width="${custom.photoSize}" height="${custom.photoSize}" alt="${escapeHtml(name ? `Foto de ${name}` : 'Foto de perfil')}" style="display:block;width:${custom.photoSize}px;height:${custom.photoSize}px;object-fit:cover;border-radius:50%;margin:auto">` : chosen ? `<span role="img" aria-label="${escapeHtml(chosen.label)}" style="display:block;width:${custom.photoSize}px;height:${custom.photoSize}px;border-radius:50%;background:${chosen.bg};font-size:${Math.round(custom.photoSize*.5)}px;line-height:${custom.photoSize}px;text-align:center;margin:auto">${chosen.emoji}</span>` : emoji ? `<span role="img" aria-label="Emoji do perfil" style="display:block;width:${custom.photoSize}px;height:${custom.photoSize}px;border-radius:50%;background:${state.emojiBg};font-size:${Math.round(custom.photoSize*.5)}px;line-height:${custom.photoSize}px;text-align:center;margin:auto">${escapeHtml(emoji)}</span>` : `<span style="display:block;width:${custom.photoSize}px;height:${custom.photoSize}px;border-radius:50%;background:${dark ? '#595d76' : '#eeeafd'};color:${dark ? '#ffffff' : color};font-family:${custom.nameFont};font-size:${Math.round(custom.photoSize*.3)}px;font-weight:700;line-height:${custom.photoSize}px;text-align:center;margin:auto">${escapeHtml(initials)}</span>`;
    const makeInfo = (colored) => {
      const light = colored || dark;
      const textColor = light ? '#ffffff' : '#3c465b';
      const emphasis = light ? '#ffffff' : color;
      const iconTint = custom.iconMode === 'custom' ? custom.iconColor : emphasis;
      const customName = name ? `<div style="font-family:${custom.nameFont};font-size:${custom.nameSize}px;font-weight:700;line-height:1.2;color:${emphasis};overflow-wrap:break-word">${escapeHtml(name)}</div>` : '';
      const customRole = role ? `<div style="font-family:${custom.roleFont};font-size:${custom.roleSize}px;font-weight:600;color:${textColor};margin-top:4px">${escapeHtml(role)}</div>` : '';
      const customCompany = company ? `<div style="font-family:${custom.roleFont};font-size:${custom.roleSize-1}px;color:${textColor};margin-top:2px">${escapeHtml(company)}</div>` : '';
      const customContact = contact.length ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:11px;${align === 'right' ? 'margin-left:auto' : ''}">${contact.map((item) => `<tr>${align === 'left' && state.iconStyle !== 'none' ? td(contactIcon(item.icon,iconTint,custom.contactSize,true,profile),'width:24px;padding:2px 0;vertical-align:middle') : ''}${td(item.href ? `<a href="${escapeHtml(item.href)}" style="font-family:${custom.contactFont};font-size:${custom.contactSize}px;color:${textColor};text-decoration:none;overflow-wrap:anywhere">${escapeHtml(item.label)}</a>` : `<span style="font-family:${custom.contactFont};font-size:${custom.contactSize}px;color:${textColor}">${escapeHtml(item.label)}</span>`,`padding:2px 0;text-align:${align};vertical-align:middle`)}${align === 'right' && state.iconStyle !== 'none' ? td(contactIcon(item.icon,iconTint,custom.contactSize,true,profile),'width:24px;padding:2px 0 2px 6px;vertical-align:middle') : ''}</tr>`).join('')}</table>` : '';
      const customSocials = socials.length ? `<div style="margin-top:9px;text-align:${align}">${socials.map((item) => `<a href="${escapeHtml(item.href)}" style="display:inline-block;margin:0 7px 4px 0;padding:4px 7px;border:1px solid ${light ? '#ffffff' : '#dfe2eb'};border-radius:4px;background:${light ? 'transparent' : '#ffffff'};color:${textColor};text-decoration:none;font-family:${custom.contactFont};font-size:${custom.contactSize-2}px;font-weight:700;white-space:nowrap">${state.iconStyle === 'none' || profile !== 'full' ? '' : `${contactIcon(item.icon,iconTint,custom.contactSize,true,profile)}&nbsp;`}${item.label}</a>`).join('')}</div>` : '';
      const customTagline = tagline ? `<div style="margin-top:9px;font-family:${custom.contactFont};font-size:${custom.contactSize}px;color:${textColor};font-style:italic;text-align:${align}">${accent ? `<span style="margin-right:5px">${accent.glyph}</span>` : ''}${escapeHtml(tagline)}</div>` : '';
      return customName + customRole + customCompany + customContact + customSocials + customTagline;
    };
    const positionStyles = {
      classic:[`vertical-align:top;padding:14px 10px;${$('showDivider').checked ? `border-right:2px solid ${color}` : ''}`,'vertical-align:top;padding:14px 10px',`vertical-align:middle;background:${color};padding:14px 10px`],
      modern:[`vertical-align:middle;background:${color};padding:15px 12px` ,`vertical-align:top;padding:14px 12px;border-top:3px solid ${color}`,'vertical-align:top;padding:16px 10px'],
      minimal:[`vertical-align:top;padding:13px 11px;border-left:3px solid ${color}`,'vertical-align:middle;padding:13px 10px','vertical-align:middle;padding:13px 10px'],
      banner:[`vertical-align:middle;background:${color};padding:20px 12px`,`vertical-align:top;padding:15px 16px;border-bottom:2px solid ${color}`,'vertical-align:middle;padding:15px 10px'],
      side:['vertical-align:middle;padding:15px 9px',`vertical-align:top;padding:13px 11px;${$('showDivider').checked ? `border-left:2px solid ${color}` : ''}`,`vertical-align:middle;background:${color};padding:16px 9px`],
      stripe:['vertical-align:middle;padding:15px 10px','vertical-align:top;padding:15px 12px','vertical-align:middle;padding:15px 10px']
    }[state.template];
    const compact = ['minimal','banner'].includes(state.template);
    const cells = custom.order.slice(0, compact ? 2 : 3).map((block,index) => {
      const colored = coloredPositions.includes(index);
      const content = block === 'photo' ? customPortrait + (state.template === 'modern' && colored && company ? `<div style="margin-top:8px;font-family:${custom.roleFont};font-size:10px;color:#ffffff;text-align:center">${escapeHtml(company)}</div>` : '') : block === 'logo' ? logoMark(colored || dark, custom.logoSize) + (colored ? brandCaption : '') : makeInfo(colored);
      const width = block === 'photo' ? `width:${custom.photoSize+22}px` : block === 'logo' ? `width:${custom.logoSize+22}px` : 'min-width:180px';
      return td(content,`${positionStyles[index]};${width};text-align:${align}`);
    }).join('');
    contents = signatureTable(`<tr>${cells}</tr>`,`background:${custom.background};border:${custom.borderWidth}px solid ${custom.borderColor};border-collapse:separate;border-spacing:0;border-radius:${custom.radius}px;overflow:hidden;${state.template === 'stripe' ? `border-top:5px solid ${color}` : ''}`);
  }
  return profile === 'full' ? contents : contents.replace('min-width:440px;','');
}

function render() {
  $('signaturePreview').innerHTML = makeSignature();
  prepareContactIcons().then(() => { $('signaturePreview').innerHTML = makeSignature(); }).catch((error) => { console.warn('Ícones indisponíveis', error); });
  updateExportStatus();
}
function showTab(tab) {
  tabs.forEach((item) => {
    const active = item === tab;
    const button = document.querySelector(`[data-tab="${item}"]`);
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
    $(`panel-${item}`).hidden = !active;
    $(`panel-${item}`).classList.toggle('active', active);
  });
  $('nextButton').innerHTML = tab === 'extras' ? 'Voltar ao início <span>↺</span>' : 'Próximo passo <span>→</span>';
}

let toastTimer;
function toast(message) {
  const node = $('toast'); node.textContent = message; node.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove('show'), 3500);
}

const colorLabels = {accentColor:'cor principal',customBg:'fundo da assinatura',customIconColor:'ícones do grid',customBorderColor:'borda',emojiBg:'fundo do emoji',socialIconColor:'logos sociais'};
function normalizeHex(value) {
  const hex = value.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(hex)) return `#${[...hex].map((part) => part + part).join('').toUpperCase()}`;
  return /^[0-9a-f]{6}$/i.test(hex) ? `#${hex.toUpperCase()}` : null;
}
function hexToRgb(hex) { return [1,3,5].map((index) => parseInt(hex.slice(index,index+2),16)); }
function rgbToHex(rgb) { return `#${rgb.map((part) => Math.round(part).toString(16).padStart(2,'0')).join('').toUpperCase()}`; }
function rgbToHsv([red,green,blue]) {
  const r = red/255, g = green/255, b = blue/255, max = Math.max(r,g,b), min = Math.min(r,g,b), delta = max-min;
  let hue = 0;
  if (delta) hue = max === r ? ((g-b)/delta)%6 : max === g ? (b-r)/delta+2 : (r-g)/delta+4;
  return {h:(hue*60+360)%360,s:max ? delta/max : 0,v:max};
}
function hsvToRgb({h,s,v}) {
  const chroma = v*s, section = h/60, second = chroma*(1-Math.abs(section%2-1)), shift = v-chroma;
  const colors = section < 1 ? [chroma,second,0] : section < 2 ? [second,chroma,0] : section < 3 ? [0,chroma,second] : section < 4 ? [0,second,chroma] : section < 5 ? [second,0,chroma] : [chroma,0,second];
  return colors.map((part) => (part+shift)*255);
}
let activeColorInput = null, activeColorTrigger = null, colorHsv = {h:0,s:1,v:1}, colorIntensity = 100, updatingColorPicker = false, copiedColorTimer;
const colorPopover = document.createElement('div');
colorPopover.id = 'colorPopover';
colorPopover.className = 'color-popover';
colorPopover.hidden = true;
colorPopover.setAttribute('role','dialog');
colorPopover.setAttribute('aria-label','Escolher cor');
colorPopover.innerHTML = `<div class="color-plane" id="colorPlane" role="slider" tabindex="0" aria-label="Saturação e brilho" aria-valuemin="0" aria-valuemax="100"><span class="color-plane-cursor" id="colorPlaneCursor"></span></div><div class="color-sliders"><button id="colorEyedropper" type="button" class="color-eyedropper" aria-label="Selecionar cor da tela" title="Selecionar cor da tela"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 5 5 5M4 20l4.5-1.2L19.7 7.6a2.1 2.1 0 0 0-3-3L5.5 15.8 4 20Z"/><path d="m12 9 3 3"/></svg></button><div class="color-slider-stack"><input id="colorHue" type="range" min="0" max="360" value="0" aria-label="Matiz"><input id="colorIntensity" type="range" min="0" max="100" value="100" aria-label="Intensidade da cor"></div></div><div class="color-output"><span class="color-format">HEX⌄</span><input id="colorHex" type="text" inputmode="text" maxlength="7" spellcheck="false" autocomplete="off" aria-label="Código hexadecimal da cor"><span id="colorPercent" class="color-percent">100%</span><button id="colorCopy" type="button" class="color-copy" aria-label="Copiar código hexadecimal" title="Copiar código hexadecimal"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button><span class="color-copied" role="status" aria-live="polite">✓ Copiado!</span></div><p class="color-note">Intensidade clareia a cor, mantendo o HEX compatível com e-mail.</p>`;
document.body.append(colorPopover);
function updateColorPopover() {
  if (!activeColorInput) return;
  const hueColor = `hsl(${colorHsv.h} 100% 50%)`;
  $('colorPlane').style.setProperty('--hue-color',hueColor);
  $('colorPlaneCursor').style.left = `${colorHsv.s*100}%`;
  $('colorPlaneCursor').style.top = `${(1-colorHsv.v)*100}%`;
  $('colorPlane').setAttribute('aria-valuenow',String(Math.round(colorHsv.s*100)));
  $('colorPlane').setAttribute('aria-valuetext',`Saturação ${Math.round(colorHsv.s*100)}%, brilho ${Math.round(colorHsv.v*100)}%`);
  $('colorHue').value = String(Math.round(colorHsv.h));
  $('colorIntensity').value = String(colorIntensity);
  $('colorIntensity').style.setProperty('--intensity-color',rgbToHex(hsvToRgb(colorHsv)));
  $('colorPercent').textContent = `${colorIntensity}%`;
  $('colorHex').value = activeColorInput.value.toUpperCase();
}
function syncColorTriggers(preservePicker = false) {
  for (const id of Object.keys(colorLabels)) {
    const trigger = document.querySelector(`[data-color-trigger="${id}"]`);
    if (trigger) { trigger.style.setProperty('--current-color',$(id).value); trigger.querySelector('.color-trigger-code').textContent = $(id).value.toUpperCase(); }
  }
  if (activeColorInput && !updatingColorPicker && !preservePicker) {
    colorHsv = rgbToHsv(hexToRgb(activeColorInput.value)); colorIntensity = 100;
    updateColorPopover();
  }
}
function applyColorFromPopover() {
  if (!activeColorInput) return;
  const blend = colorIntensity/100;
  const rgb = hsvToRgb(colorHsv).map((channel) => channel*blend + 255*(1-blend));
  activeColorInput.value = rgbToHex(rgb);
  updatingColorPicker = true;
  activeColorInput.dispatchEvent(new Event('input',{bubbles:true}));
  updatingColorPicker = false;
  syncColorTriggers(true); updateColorPopover();
}
function positionColorPopover() {
  if (colorPopover.hidden || !activeColorTrigger) return;
  const box = activeColorTrigger.getBoundingClientRect(), width = Math.min(310,window.innerWidth-20), height = colorPopover.offsetHeight;
  colorPopover.style.width = `${width}px`;
  colorPopover.style.left = `${Math.max(10,Math.min(box.left,window.innerWidth-width-10))}px`;
  colorPopover.style.top = `${box.bottom+8+height <= window.innerHeight ? box.bottom+8 : Math.max(8,box.top-height-8)}px`;
}
function closeColorPopover() {
  colorPopover.hidden = true;
  if (activeColorTrigger) activeColorTrigger.setAttribute('aria-expanded','false');
  activeColorInput = null; activeColorTrigger = null;
}
function setupColorPicker() {
  for (const [id,label] of Object.entries(colorLabels)) {
    const source = $(id), trigger = document.createElement('button');
    trigger.type = 'button'; trigger.className = 'color-trigger'; trigger.dataset.colorTrigger = id;
    trigger.setAttribute('aria-label',`Selecionar ${label}`); trigger.setAttribute('aria-haspopup','dialog'); trigger.setAttribute('aria-expanded','false');
    trigger.innerHTML = '<span class="color-trigger-swatch"></span><span class="color-trigger-code"></span><span class="color-trigger-chevron">⌄</span>';
    if (id === 'accentColor') {
      const oldLabel = source.closest('.custom-color');
      oldLabel.after(trigger); oldLabel.classList.add('color-source-label');
    } else {
      const field = source.closest('.field'), wrapper = document.createElement('div');
      wrapper.className = 'color-field'; field.before(wrapper); wrapper.append(field);
      field.htmlFor = `colorTrigger-${id}`; wrapper.append(source,trigger);
    }
    trigger.id = `colorTrigger-${id}`;
    source.classList.add('color-source');
    source.addEventListener('input',() => syncColorTriggers());
    trigger.addEventListener('click', () => {
      if (activeColorInput === source && !colorPopover.hidden) { closeColorPopover(); return; }
      if (activeColorTrigger) activeColorTrigger.setAttribute('aria-expanded','false');
      activeColorInput = source; activeColorTrigger = trigger; trigger.setAttribute('aria-expanded','true');
      colorHsv = rgbToHsv(hexToRgb(source.value)); colorIntensity = 100;
      colorPopover.classList.remove('just-copied');
      colorPopover.setAttribute('aria-label',`Escolher ${label}`);
      colorPopover.hidden = false; updateColorPopover(); positionColorPopover();
    });
  }
  syncColorTriggers();
}
setupColorPicker();
const colorPlane = $('colorPlane');
function moveColorPlane(event) {
  const rect = colorPlane.getBoundingClientRect();
  colorHsv.s = Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width));
  colorHsv.v = 1-Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height));
  applyColorFromPopover();
}
colorPlane.addEventListener('pointerdown', (event) => { colorPlane.setPointerCapture(event.pointerId); moveColorPlane(event); event.preventDefault(); });
colorPlane.addEventListener('pointermove', (event) => { if (colorPlane.hasPointerCapture(event.pointerId)) moveColorPlane(event); });
colorPlane.addEventListener('keydown', (event) => {
  const step = event.shiftKey ? .1 : .02;
  if (event.key === 'ArrowLeft') colorHsv.s = Math.max(0,colorHsv.s-step);
  else if (event.key === 'ArrowRight') colorHsv.s = Math.min(1,colorHsv.s+step);
  else if (event.key === 'ArrowUp') colorHsv.v = Math.min(1,colorHsv.v+step);
  else if (event.key === 'ArrowDown') colorHsv.v = Math.max(0,colorHsv.v-step);
  else return;
  applyColorFromPopover(); event.preventDefault();
});
$('colorHue').addEventListener('input', (event) => { colorHsv.h = Number(event.target.value); applyColorFromPopover(); });
$('colorIntensity').addEventListener('input', (event) => { colorIntensity = Number(event.target.value); applyColorFromPopover(); });
function commitColorHex() {
  if (!activeColorInput) return;
  const input = $('colorHex'), hex = normalizeHex(input.value);
  if (!hex) { input.value = activeColorInput.value.toUpperCase(); input.setCustomValidity(''); return; }
  activeColorInput.value = hex;
  activeColorInput.dispatchEvent(new Event('input',{bubbles:true}));
  syncColorTriggers(); input.setCustomValidity('');
}
$('colorHex').addEventListener('input', (event) => {
  const hex = normalizeHex(event.target.value);
  event.target.setCustomValidity(hex || !event.target.value.trim() ? '' : 'Digite uma cor como #6956E8.');
  if (/^#?[0-9a-f]{6}$/i.test(event.target.value.trim())) commitColorHex();
});
$('colorHex').addEventListener('blur',commitColorHex);
$('colorHex').addEventListener('keydown', (event) => { if (event.key === 'Enter') { commitColorHex(); event.target.blur(); } });
$('colorEyedropper').disabled = !('EyeDropper' in window);
$('colorEyedropper').addEventListener('click', async () => {
  if (!window.EyeDropper || !activeColorInput) return;
  try { const result = await new EyeDropper().open(); $('colorHex').value = result.sRGBHex; commitColorHex(); }
  catch (error) { if (error.name !== 'AbortError') toast('O conta-gotas não pôde selecionar a cor.'); }
});
$('colorCopy').addEventListener('click', async () => {
  if (!activeColorInput) return;
  commitColorHex();
  try {
    const hex = activeColorInput.value.toUpperCase();
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(hex);
    else { const fallback = document.createElement('textarea'); fallback.value = hex; fallback.style.position = 'fixed'; fallback.style.opacity = '0'; document.body.append(fallback); fallback.select(); const copied = document.execCommand('copy'); fallback.remove(); if (!copied) throw new Error('clipboard unavailable'); }
    colorPopover.classList.remove('just-copied'); void colorPopover.offsetWidth; colorPopover.classList.add('just-copied');
    clearTimeout(copiedColorTimer); copiedColorTimer = setTimeout(() => colorPopover.classList.remove('just-copied'),1800);
  } catch { toast('Não foi possível copiar. Selecione o código HEX e copie manualmente.'); }
});
document.addEventListener('pointerdown', (event) => { if (!colorPopover.hidden && !colorPopover.contains(event.target) && !activeColorTrigger?.contains(event.target)) closeColorPopover(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !colorPopover.hidden) { closeColorPopover(); event.preventDefault(); } });
window.addEventListener('resize',positionColorPopover);
document.addEventListener('scroll', () => { if (!colorPopover.hidden) closeColorPopover(); },true);

document.querySelectorAll('.editor-tab').forEach((button) => button.addEventListener('click', () => showTab(button.dataset.tab)));
$('nextButton').addEventListener('click', () => {
  const active = document.querySelector('.editor-tab.active').dataset.tab;
  showTab(tabs[(tabs.indexOf(active) + 1) % tabs.length]);
});
document.querySelectorAll('.template-card').forEach((button) => button.addEventListener('click', () => {
  state.template = button.dataset.template;
  state.customize = false;
  document.querySelectorAll('.template-card').forEach((card) => { const selected = card === button; card.classList.toggle('selected', selected); card.setAttribute('aria-pressed', String(selected)); });
  syncCustomizationUI();
  render();
}));
function syncCustomizationUI() {
  $('customizeToggle').checked = state.customize;
  $('customizeToggle').disabled = false;
  $('customizeTitle').textContent = 'Personalizar este modelo';
  $('customizeHint').textContent = state.customize ? 'Edite os elementos mantendo a composição do modelo escolhido.' : 'Desativado: o layout original permanece como está.';
  $('customizationOptions').hidden = !state.customize;
  const compact = ['minimal','banner'].includes(state.template);
  document.querySelector('[data-slot-label="2"]').textContent = compact ? 'Fora da assinatura' : 'Coluna 3';
}
$('customizeToggle').addEventListener('change', (event) => {
  state.customize = event.target.checked;
  if (state.customize) {
    const orders = {minimal:['info','logo','photo'],banner:['logo','info','photo']};
    state.custom.order = [...(orders[state.template] || ['photo','info','logo'])];
    syncCustomControls();
  }
  syncCustomizationUI(); render();
});
syncCustomizationUI();
document.querySelectorAll('.custom-font').forEach((select) => { select.innerHTML = $('font').innerHTML; select.value = state.custom[select.id.replace('custom','').replace(/^./,(letter)=>letter.toLowerCase())]; });
function syncCustomControls() {
  document.querySelectorAll('[data-grid-slot]').forEach((select) => { select.value = state.custom.order[Number(select.dataset.gridSlot)]; });
  for (const [id,key] of Object.entries({customAlign:'align',customBg:'background',customRadius:'radius',customBorderWidth:'borderWidth',customBorderColor:'borderColor',customIconMode:'iconMode',customIconColor:'iconColor',customPhotoSize:'photoSize',customLogoSize:'logoSize',customNameFont:'nameFont',customNameSize:'nameSize',customRoleFont:'roleFont',customRoleSize:'roleSize',customContactFont:'contactFont',customContactSize:'contactSize'})) $(id).value = state.custom[key];
  syncColorTriggers();
  $('photoSizeValue').textContent = `${state.custom.photoSize} px`;
  $('logoSizeValue').textContent = `${state.custom.logoSize} px`;
  $('radiusValue').textContent = `${state.custom.radius} px`;
  $('borderWidthValue').textContent = `${state.custom.borderWidth} px`;
}
syncCustomControls();
document.querySelectorAll('[data-grid-slot]').forEach((select) => select.addEventListener('change', () => {
  const index = Number(select.dataset.gridSlot), requested = select.value;
  const other = state.custom.order.indexOf(requested);
  [state.custom.order[index],state.custom.order[other]] = [state.custom.order[other],state.custom.order[index]];
  syncCustomControls(); render();
}));
for (const [id,key] of Object.entries({customAlign:'align',customBg:'background',customRadius:'radius',customBorderWidth:'borderWidth',customBorderColor:'borderColor',customIconMode:'iconMode',customIconColor:'iconColor',customPhotoSize:'photoSize',customLogoSize:'logoSize',customNameFont:'nameFont',customNameSize:'nameSize',customRoleFont:'roleFont',customRoleSize:'roleSize',customContactFont:'contactFont',customContactSize:'contactSize'})) {
  $(id).addEventListener('input', () => {
    const input = $(id);
    if (input.type === 'number' || input.type === 'range') {
      if (!input.value) return;
      state.custom[key] = Math.max(Number(input.min),Math.min(Number(input.max),Number(input.value)));
    } else state.custom[key] = input.value;
    if (id === 'customIconColor') { state.custom.iconMode = 'custom'; $('customIconMode').value = 'custom'; }
    $('photoSizeValue').textContent = `${state.custom.photoSize} px`;
    $('logoSizeValue').textContent = `${state.custom.logoSize} px`;
    $('radiusValue').textContent = `${state.custom.radius} px`;
    $('borderWidthValue').textContent = `${state.custom.borderWidth} px`;
    render();
  });
}
$('saveCustomTemplate').addEventListener('click', () => $('exportTemplate').click());
document.querySelectorAll('.swatch').forEach((button) => button.addEventListener('click', () => {
  state.color = button.dataset.color; $('accentColor').value = state.color;
  syncColorTriggers();
  document.querySelectorAll('.swatch').forEach((swatch) => { const selected = swatch === button; swatch.classList.toggle('selected', selected); swatch.setAttribute('aria-pressed', String(selected)); });
  render();
}));
$('accentColor').addEventListener('input', (event) => { state.color = event.target.value; document.querySelectorAll('.swatch').forEach((swatch) => { swatch.classList.remove('selected'); swatch.setAttribute('aria-pressed', 'false'); }); render(); });
$('socialIconColor').addEventListener('input', (event) => { state.socialColor = event.target.value; render(); });
fields.forEach((id) => {
  $(id).addEventListener('input', () => {
    if (id === 'imageUrl' && value(id)) {
      state.imageData = ''; state.avatar = ''; state.emoji = ''; $('emojiInput').value = '';
      lastPhotoFile = null; $('editPhotoCrop').hidden = true;
      document.querySelectorAll('.avatar-option').forEach((button) => button.classList.remove('selected'));
      document.querySelectorAll('.emoji-option').forEach((button) => button.classList.remove('selected'));
    }
    if (id === 'logoUrl' && value(id)) {
      state.logoData = '';
      lastLogoFile = null; $('editLogoCrop').hidden = true;
      $('logoStatus').textContent = 'Usando logo por URL';
    }
    render();
  });
  $(id).addEventListener('change', render);
});
function selectPhoto(data, avatar = '') {
  state.imageData = data;
  state.avatar = avatar;
  lastPhotoFile = null; $('editPhotoCrop').hidden = true;
  state.emoji = '';
  $('emojiInput').value = '';
  document.querySelectorAll('.emoji-option').forEach((button) => button.classList.remove('selected'));
  $('imageUrl').value = '';
  document.querySelectorAll('.avatar-option').forEach((button) => button.classList.toggle('selected', button.dataset.avatar === avatar && !!avatar));
  render();
}
$('avatarGrid').innerHTML = avatarOptions.map((item) => `<button type="button" class="avatar-option" data-avatar="${item.id}" aria-label="Usar personagem ${item.label}" title="${item.label}" style="--avatar-bg:${item.bg}">${item.emoji}</button>`).join('');
$('avatarGrid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-avatar]');
  if (button) selectPhoto('', button.dataset.avatar);
});
const emojiOptions = ['✨','🌟','💜','🚀','🌿','🌻','☀️','🎨','📚','💡','☕','🎯','🔥','🦊','🐼','🐱','🌈','💼','🎵','🏔️'];
$('emojiGrid').innerHTML = emojiOptions.map((emoji) => `<button type="button" class="emoji-option" data-emoji="${emoji}" aria-label="Usar emoji ${emoji}" style="--emoji-bg:${state.emojiBg}">${emoji}</button>`).join('');
function selectEmoji(emoji) {
  state.emoji = emoji.trim().slice(0,16);
  state.imageData = ''; state.avatar = ''; $('imageUrl').value = '';
  lastPhotoFile = null; $('editPhotoCrop').hidden = true;
  document.querySelectorAll('.avatar-option').forEach((button) => button.classList.remove('selected'));
  document.querySelectorAll('.emoji-option').forEach((button) => button.classList.toggle('selected', button.dataset.emoji === state.emoji));
  render();
}
$('emojiGrid').addEventListener('click', (event) => {
  const button = event.target.closest('[data-emoji]');
  if (button) { $('emojiInput').value = button.dataset.emoji; selectEmoji(button.dataset.emoji); }
});
$('emojiInput').addEventListener('input', (event) => selectEmoji(event.target.value));
$('emojiBg').addEventListener('input', (event) => {
  state.emojiBg = event.target.value;
  document.querySelectorAll('.emoji-option').forEach((button) => button.style.setProperty('--emoji-bg', state.emojiBg));
  if (!state.emoji) { $('emojiInput').value = '✨'; selectEmoji('✨'); }
  render();
});
$('removePhoto').addEventListener('click', () => selectPhoto('', ''));
const libraryKey = 'assina.photoLibrary.v1';
function getLibrary() {
  try { const items = JSON.parse(localStorage.getItem(libraryKey) || '[]'); return Array.isArray(items) ? items : []; }
  catch { return []; }
}
function renderLibrary() {
  const items = getLibrary();
  $('photoLibrary').innerHTML = items.length ? items.map((item) => `<div class="saved-photo"><button type="button" data-photo="${escapeHtml(item.id)}" title="Usar ${escapeHtml(item.name)}"><img src="${item.data}" alt="${escapeHtml(item.name)}"></button><button type="button" class="delete-photo" data-delete="${escapeHtml(item.id)}" aria-label="Remover ${escapeHtml(item.name)}">×</button></div>`).join('') : '<p class="empty-library">Sua biblioteca ainda está vazia. Envie uma foto para começar.</p>';
}
$('libraryButton').addEventListener('click', () => { $('libraryPanel').hidden = !$('libraryPanel').hidden; renderLibrary(); });
$('photoLibrary').addEventListener('click', (event) => {
  const remove = event.target.closest('[data-delete]');
  if (remove) {
    const items = getLibrary().filter((item) => item.id !== remove.dataset.delete);
    localStorage.setItem(libraryKey, JSON.stringify(items));
    renderLibrary(); toast('Foto removida da biblioteca local.'); return;
  }
  const button = event.target.closest('[data-photo]');
  const item = getLibrary().find((photo) => photo.id === button?.dataset.photo);
  if (item) { selectPhoto(item.data); toast('Foto aplicada à assinatura.'); }
});
let cropState = null;
let lastPhotoFile = null, lastLogoFile = null;
let cropPointer = null;
function cropFrameSize(mode, ratio, image) {
  if (mode === 'photo' || ratio === 'square') return {width:320,height:320};
  if (ratio === 'horizontal') return {width:420,height:252};
  const scale = Math.min(420 / image.width, 300 / image.height);
  return {width:Math.max(1,Math.round(image.width * scale)),height:Math.max(1,Math.round(image.height * scale))};
}
function cropGeometry(imageWidth, imageHeight, frameWidth, frameHeight, zoom, offsetX, offsetY, contain) {
  const scale = (contain ? Math.min(frameWidth / imageWidth, frameHeight / imageHeight) : Math.max(frameWidth / imageWidth, frameHeight / imageHeight)) * zoom;
  const width = imageWidth * scale, height = imageHeight * scale;
  const xLimit = Math.abs(width - frameWidth) / 2, yLimit = Math.abs(height - frameHeight) / 2;
  const x = Math.max(-xLimit, Math.min(xLimit, offsetX));
  const y = Math.max(-yLimit, Math.min(yLimit, offsetY));
  return {x:(frameWidth-width)/2+x,y:(frameHeight-height)/2+y,width,height,offsetX:x,offsetY:y};
}
function paintCrop(canvas) {
  const crop = cropState;
  const geometry = cropGeometry(crop.image.width,crop.image.height,canvas.width,canvas.height,crop.zoom,crop.offsetX,crop.offsetY,crop.mode === 'logo');
  crop.offsetX = geometry.offsetX; crop.offsetY = geometry.offsetY;
  const context = canvas.getContext('2d');
  context.clearRect(0,0,canvas.width,canvas.height);
  context.save();
  if (crop.mode === 'photo') {
    context.beginPath();
    context.arc(canvas.width/2,canvas.height/2,canvas.width/2,0,Math.PI*2);
    context.clip();
  }
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.drawImage(crop.image,geometry.x,geometry.y,geometry.width,geometry.height);
  context.restore();
}
function resetCropFrame() {
  if (!cropState) return;
  const frame = cropFrameSize(cropState.mode,cropState.ratio,cropState.image);
  const canvas = $('cropCanvas'), viewport = $('cropViewport');
  canvas.width = frame.width; canvas.height = frame.height;
  viewport.className = `crop-viewport ${cropState.mode}`;
  viewport.style.width = `${frame.width}px`;
  viewport.style.aspectRatio = `${frame.width} / ${frame.height}`;
  cropState.zoom = 1; cropState.offsetX = 0; cropState.offsetY = 0;
  $('cropZoom').value = '1'; $('cropZoomValue').textContent = '100%';
  document.querySelectorAll('[data-crop-ratio]').forEach((button) => button.classList.toggle('selected',button.dataset.cropRatio === cropState.ratio));
  paintCrop(canvas);
}
async function openCropFile(file, mode) {
  closeCropEditor();
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise((resolve,reject) => { image.onload = resolve; image.onerror = reject; image.src = url; });
    if (!image.width || !image.height) throw new Error('empty image');
    cropState = {image,url,file,mode,name:file.name.slice(0,60),ratio:'original',zoom:1,offsetX:0,offsetY:0};
    $('cropTitle').textContent = mode === 'photo' ? 'Recortar foto do perfil' : 'Ajustar logo da empresa';
    $('cropDescription').textContent = mode === 'photo' ? 'Arraste para enquadrar o rosto no círculo. Use o zoom para aproximar.' : 'Mantenha a proporção original ou escolha um recorte. O fundo transparente do PNG é preservado.';
    $('cropRatios').hidden = mode !== 'logo';
    resetCropFrame();
    const editor = $('cropDialog');
    $(mode === 'photo' ? 'photoFile' : 'logoFile').closest('.photo-actions').insertAdjacentElement('afterend',editor);
    editor.hidden = false;
    editor.scrollIntoView({block:'nearest'});
    $('cropViewport').focus();
  } catch (error) {
    const needsRevoke = !cropState;
    closeCropEditor();
    if (needsRevoke) URL.revokeObjectURL(url);
    throw error;
  }
}
function closeCropEditor() {
  $('cropDialog').hidden = true;
  if (cropState) URL.revokeObjectURL(cropState.url);
  cropState = null; cropPointer = null;
}
for (const [id,mode] of [['photoFile','photo'],['logoFile','logo']]) {
  $(id).addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 8_000_000) { toast('Use JPG, PNG ou WebP com até 8 MB.'); event.target.value = ''; return; }
    try { await openCropFile(file,mode); }
    catch { toast('Não foi possível abrir esta imagem.'); }
    finally { event.target.value = ''; }
  });
}
$('editPhotoCrop').addEventListener('click', () => { if (lastPhotoFile) openCropFile(lastPhotoFile,'photo').catch(() => toast('Não foi possível reabrir esta foto.')); });
$('editLogoCrop').addEventListener('click', () => { if (lastLogoFile) openCropFile(lastLogoFile,'logo').catch(() => toast('Não foi possível reabrir este logo.')); });
document.querySelectorAll('[data-crop-ratio]').forEach((button) => button.addEventListener('click', () => {
  if (!cropState || cropState.mode !== 'logo') return;
  cropState.ratio = button.dataset.cropRatio;
  resetCropFrame();
}));
$('cropZoom').addEventListener('input', (event) => {
  if (!cropState) return;
  cropState.zoom = Number(event.target.value);
  $('cropZoomValue').textContent = `${Math.round(cropState.zoom * 100)}%`;
  paintCrop($('cropCanvas'));
});
$('cropViewport').addEventListener('pointerdown', (event) => {
  if (!cropState || (event.pointerType === 'mouse' && event.button !== 0)) return;
  cropPointer = {id:event.pointerId,x:event.clientX,y:event.clientY,offsetX:cropState.offsetX,offsetY:cropState.offsetY};
  event.currentTarget.setPointerCapture(event.pointerId);
  event.preventDefault();
});
$('cropViewport').addEventListener('pointermove', (event) => {
  if (!cropState || !cropPointer || cropPointer.id !== event.pointerId) return;
  const width = event.currentTarget.getBoundingClientRect().width;
  const factor = $('cropCanvas').width / width;
  cropState.offsetX = cropPointer.offsetX + (event.clientX-cropPointer.x)*factor;
  cropState.offsetY = cropPointer.offsetY + (event.clientY-cropPointer.y)*factor;
  paintCrop($('cropCanvas'));
});
for (const type of ['pointerup','pointercancel','lostpointercapture']) $('cropViewport').addEventListener(type, () => { cropPointer = null; });
$('cropViewport').addEventListener('keydown', (event) => {
  if (!cropState || !['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
  const step = event.shiftKey ? 20 : 5;
  cropState.offsetX += event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0;
  cropState.offsetY += event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0;
  paintCrop($('cropCanvas'));
  event.preventDefault();
});
for (const id of ['cropClose','cropCancel']) $(id).addEventListener('click', closeCropEditor);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !$('cropDialog').hidden) closeCropEditor(); });
$('cropApply').addEventListener('click', () => {
  if (!cropState) return;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = $('cropCanvas').width; canvas.height = $('cropCanvas').height;
    paintCrop(canvas);
    const data = canvas.toDataURL('image/png'), mode = cropState.mode, name = cropState.name, file = cropState.file;
    if (mode === 'photo') {
      selectPhoto(data);
      lastPhotoFile = file; $('editPhotoCrop').hidden = false;
      try {
        const items = [{id:crypto.randomUUID(),name,data},...getLibrary()].slice(0,8);
        localStorage.setItem(libraryKey, JSON.stringify(items));
        renderLibrary(); toast('Foto recortada e salva na biblioteca local.');
      } catch { toast('Foto aplicada. O navegador não permitiu salvá-la na biblioteca.'); }
    } else {
      state.logoData = data; $('logoUrl').value = '';
      lastLogoFile = file; $('editLogoCrop').hidden = false;
      $('logoStatus').textContent = `Logo enviado: ${name.slice(0,36)}`;
      render(); toast('Logo ajustado e aplicado à assinatura.');
    }
    closeCropEditor();
  } catch { toast('Não foi possível aplicar o recorte. Tente outra imagem.'); }
});
$('removeLogo').addEventListener('click', () => { state.logoData = ''; lastLogoFile = null; $('editLogoCrop').hidden = true; $('logoUrl').value = ''; $('logoStatus').textContent = 'Usando iniciais da empresa'; render(); });
document.querySelectorAll('[data-icon-style]').forEach((button) => button.addEventListener('click', () => {
  state.iconStyle = button.dataset.iconStyle;
  document.querySelectorAll('[data-icon-style]').forEach((option) => { const selected = option === button; option.classList.toggle('selected', selected); option.setAttribute('aria-pressed', String(selected)); });
  render();
}));
$('accentIcons').innerHTML = '<button type="button" data-accent="" class="selected" aria-label="Sem ícone de destaque" title="Sem ícone">—</button>' + accentOptions.map((item) => `<button type="button" data-accent="${item.id}" aria-label="${item.label}" title="${item.label}"><img src="assets/lucide/${item.id}.svg" alt=""></button>`).join('');
$('accentIcons').addEventListener('click', (event) => {
  const button = event.target.closest('[data-accent]');
  if (!button) return;
  state.accentIcon = button.dataset.accent;
  document.querySelectorAll('[data-accent]').forEach((option) => option.classList.toggle('selected', option === button));
  render();
});
$('helpButton').addEventListener('click', () => $('helpDialog').showModal());
$('helpDialog').addEventListener('click', (event) => { if (event.target === $('helpDialog')) $('helpDialog').close(); });
const exportProfiles = {gmail:'Gmail',outlook:'Outlook',other:'Apple Mail e outros',full:'HTML completo'};
function selectedExportProfile() { return $('emailProfile').value === 'full' ? 'full' : 'compatible'; }
function exportImageNotice() {
  const missing = [];
  if (state.imageData && !safeUrl(value('imageUrl'))) missing.push('foto');
  if (state.logoData && !safeUrl(value('logoUrl'))) missing.push('logo');
  return missing.length ? ` Imagem local (${missing.join(' e ')}) não incluída; use uma URL pública para exibi-la.` : '';
}
function updateExportStatus() {
  const target = $('emailProfile').value, html = makeSignature(selectedExportProfile());
  $('copyButton').textContent = target === 'gmail' ? 'Copiar para Gmail' : 'Copiar assinatura';
  if (target === 'gmail') {
    const nearLimit = html.length > 9500;
    $('exportGuidance').textContent = `${html.length.toLocaleString('pt-BR')} de 10.000 caracteres no Gmail.${nearLimit ? ' A assinatura ainda está longa; reduza textos ou escolha outro modelo.' : ' Copie a assinatura e cole em Configurações → Assinatura.'}${exportImageNotice()}`;
    $('exportGuidance').classList.toggle('export-warning',nearLimit || !!exportImageNotice());
  } else if (target === 'full') {
    $('exportGuidance').textContent = 'Inclui imagens enviadas e ícones embutidos. Esse arquivo pode ultrapassar o limite do Gmail.';
    $('exportGuidance').classList.remove('export-warning');
  } else {
    $('exportGuidance').textContent = `${exportProfiles[target]}: HTML com imagens por URL e ícones leves, para copiar no editor de assinaturas.${exportImageNotice()}`;
    $('exportGuidance').classList.toggle('export-warning',!!exportImageNotice());
  }
}
$('emailProfile').addEventListener('change',updateExportStatus);
$('copyButton').addEventListener('click', async () => {
  const target = $('emailProfile').value;
  if (target === 'full') await prepareContactIcons().catch(() => {});
  const html = makeSignature(selectedExportProfile());
  if (target === 'gmail' && html.length > 9500) { toast('Assinatura longa para o Gmail. Reduza textos ou escolha outro modelo.'); return; }
  try {
    const container = document.createElement('div'); container.innerHTML = html;
    const plainText = container.innerText || container.textContent || '';
    if (window.ClipboardItem && navigator.clipboard?.write) await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], {type:'text/html'}), 'text/plain': new Blob([plainText], {type:'text/plain'}) })]);
    else {
      container.style.cssText = 'position:fixed;left:-10000px;top:0'; document.body.append(container);
      const selection = window.getSelection(), range = document.createRange(); range.selectNodeContents(container); selection.removeAllRanges(); selection.addRange(range);
      const copied = document.execCommand('copy'); selection.removeAllRanges(); container.remove();
      if (!copied) throw new Error('Clipboard unavailable');
    }
    toast(`Assinatura para ${exportProfiles[target]} copiada. Cole no editor de assinaturas.`);
  } catch { toast('Não foi possível copiar aqui. Use “Exportar HTML”.'); }
});
$('exportButton').addEventListener('click', async () => {
  const target = $('emailProfile').value;
  if (target === 'full') await prepareContactIcons().catch(() => {});
  const signature = makeSignature(selectedExportProfile());
  if (target === 'gmail' && signature.length > 9500) { toast('Assinatura longa para o Gmail. Reduza textos ou escolha outro modelo.'); return; }
  const fontLink = target === 'full' ? '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Manrope:wght@400;700&family=Montserrat:wght@400;700&family=Poppins:wght@400;700&family=Lora:wght@400;700&family=Playfair+Display:wght@400;700&display=swap">' : '';
  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Assinatura de ${escapeHtml(value('name') || 'e-mail')}</title>${fontLink}</head><body style="margin:24px;background:#ffffff">${signature}</body></html>`;
  const url = URL.createObjectURL(new Blob([html], {type:'text/html;charset=utf-8'}));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = `minha-assinatura-${target}.html`; document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Arquivo HTML exportado com sucesso.');
});
$('exportTemplate').addEventListener('click', () => {
  const model = {
    kind:'assina-institutional-template', version:1,
    style:{template:state.template,customize:state.customize,color:state.color,socialColor:state.socialColor,font:$('font').value,fontSize:Number($('fontSize').value),showDivider:$('showDivider').checked,iconStyle:state.iconStyle,accentIcon:state.accentIcon,custom:{...state.custom,order:[...state.custom.order]}},
    organization:{company:value('company'),website:value('website'),address:value('address'),logoUrl:value('logoUrl'),logoData:state.logoData,linkedin:value('linkedin'),instagram:value('instagram'),tagline:value('tagline')}
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(model,null,2)], {type:'application/json'}));
  const filename = (value('company') || 'empresa').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40) || 'empresa';
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = `modelo-assinatura-${filename}.json`; document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Modelo institucional exportado sem dados pessoais.');
});
$('importTemplate').addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    if (file.size > 2_000_000) throw new Error('size');
    const model = JSON.parse(await file.text());
    if (model?.kind !== 'assina-institutional-template' || model.version !== 1 || !model.style || !model.organization) throw new Error('format');
    const style = model.style, org = model.organization;
    const templates = ['classic','modern','minimal','banner','side','stripe'];
    const clean = (input, max = 180) => typeof input === 'string' ? input.slice(0,max) : '';
    const legacyCustom = ['centered', 'custom'].includes(style.template);
    state.template = legacyCustom ? 'stripe' : templates.includes(style.template) ? style.template : 'classic';
    state.customize = legacyCustom || style.customize === true;
    state.color = /^#[0-9a-f]{6}$/i.test(style.color) ? style.color : '#6956e8';
    state.socialColor = /^#[0-9a-f]{6}$/i.test(style.socialColor) ? style.socialColor : '#34384e';
    $('socialIconColor').value = state.socialColor;
    state.iconStyle = ['none','line','filled'].includes(style.iconStyle) ? style.iconStyle : 'line';
    state.accentIcon = accentOptions.some((item) => item.id === style.accentIcon) ? style.accentIcon : '';
    $('font').value = Array.from($('font').options).some((option) => option.value === style.font) ? style.font : $('font').options[0].value;
    $('fontSize').value = [12,13,14].includes(Number(style.fontSize)) ? String(style.fontSize) : '13';
    $('showDivider').checked = style.showDivider !== false;
    const custom = style.custom && typeof style.custom === 'object' ? style.custom : {};
    const blocks = ['photo','info','logo'];
    state.custom.order = Array.isArray(custom.order) && custom.order.length === 3 && new Set(custom.order).size === 3 && custom.order.every((block) => blocks.includes(block)) ? [...custom.order] : [...blocks];
    state.custom.align = ['left','right'].includes(custom.align) ? custom.align : 'left';
    state.custom.background = /^#[0-9a-f]{6}$/i.test(custom.background) ? custom.background : '#ffffff';
    state.custom.borderColor = /^#[0-9a-f]{6}$/i.test(custom.borderColor) ? custom.borderColor : '#e9eaf0';
    state.custom.iconMode = ['auto','custom'].includes(custom.iconMode) ? custom.iconMode : 'auto';
    state.custom.iconColor = /^#[0-9a-f]{6}$/i.test(custom.iconColor) ? custom.iconColor : '#6956e8';
    for (const [key,min,max,fallback] of [['photoSize',44,100,68],['logoSize',48,112,84],['radius',0,24,0],['borderWidth',0,4,1],['nameSize',14,30,20],['roleSize',10,20,13],['contactSize',10,18,13]]) {
      const num = Number(custom[key]);
      state.custom[key] = Number.isFinite(num) && num >= min && num <= max ? Math.round(num) : fallback;
    }
    for (const key of ['nameFont','roleFont','contactFont']) state.custom[key] = Array.from($('font').options).some((option) => option.value === custom[key]) ? custom[key] : $('font').options[0].value;
    syncCustomControls();
    for (const id of ['company','address','tagline']) $(id).value = clean(org[id]);
    for (const id of ['website','logoUrl','linkedin','instagram']) $(id).value = safeUrl(clean(org[id],500));
    state.logoData = typeof org.logoData === 'string' && /^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(org.logoData) && org.logoData.length < 750000 ? org.logoData : '';
    $('logoStatus').textContent = state.logoData ? 'Logo importado do modelo' : value('logoUrl') ? 'Usando logo por URL' : 'Usando iniciais da empresa';
    for (const id of ['name','role','email','phone','imageUrl']) $(id).value = '';
    state.imageData = ''; state.avatar = ''; state.emoji = ''; $('emojiInput').value = '';
    lastPhotoFile = null; lastLogoFile = null; $('editPhotoCrop').hidden = true; $('editLogoCrop').hidden = true;
    document.querySelectorAll('.avatar-option').forEach((button) => button.classList.remove('selected'));
    document.querySelectorAll('.emoji-option').forEach((button) => button.classList.remove('selected'));
    $('accentColor').value = state.color;
    syncColorTriggers();
    document.querySelectorAll('.template-card').forEach((button) => { const selected = button.dataset.template === state.template; button.classList.toggle('selected',selected); button.setAttribute('aria-pressed',String(selected)); });
    document.querySelectorAll('.swatch').forEach((button) => { const selected = button.dataset.color === state.color; button.classList.toggle('selected',selected); button.setAttribute('aria-pressed',String(selected)); });
    document.querySelectorAll('[data-icon-style]').forEach((button) => { const selected = button.dataset.iconStyle === state.iconStyle; button.classList.toggle('selected',selected); button.setAttribute('aria-pressed',String(selected)); });
    document.querySelectorAll('[data-accent]').forEach((button) => button.classList.toggle('selected', button.dataset.accent === state.accentIcon));
    syncCustomizationUI();
    showTab('dados'); render(); toast('Modelo importado. Preencha agora seus dados pessoais.');
  } catch { toast('Modelo inválido. Importe um arquivo JSON exportado pelo Assina.'); }
  finally { event.target.value = ''; }
});
render();
