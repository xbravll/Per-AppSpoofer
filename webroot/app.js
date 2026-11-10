(function () {
  'use strict';

  const C = window.CATALOG;
  const K = window.Core;
  const DATA = '/data/adb/lnr_spoofer';
  let MOD = '/data/adb/modules/lnr_spoofer';

  /* ---------- i18n ---------- */

  const T = {
    en: {
      'sub.loading': 'Loading',
      'sub.none': 'No active apps',
      'sub.active': ['{n} active app', '{n} active apps'],
      'sub.open': 'Open via KernelSU WebUI',
      'aria.lang': 'Change language',
      'aria.refresh': 'Refresh app list',
      'tab.apps': 'Apps', 'tab.dev': 'Devices', 'tab.act': 'Active',
      'ph.apps': 'Search name or package',
      'ph.dev': 'Search device or model',
      'f.all': 'All', 'f.game': 'Games', 'f.other': 'Other', 'f.picked': 'Selected',
      'n.apps': ['{n} app', '{n} apps'],
      'sel.all': 'Select all', 'sel.clear': 'Clear selection',
      'sec.games': 'Games', 'sec.other': 'Other apps',
      'empty.apps': 'No matching apps',
      'empty.picked': 'No apps selected yet',
      'empty.dev': 'No matching devices',
      'empty.act1': 'No spoofed apps yet',
      'empty.act2': 'Select apps and a device, then apply.',
      'dev.scope': 'Property scope',
      'detail.basic': 'Standard', 'detail.full': 'Full',
      'hint.basic': 'Model, manufacturer, brand, device and product.',
      'hint.full': 'Model, manufacturer, brand, device, product, board, hardware and SoC.',
      'brand.all': 'All',
      'act.count': ['{n} active app', '{n} active apps'],
      'grp.sel': 'Select group', 'grp.clear': 'Clear',
      'slot.apps': 'Apps', 'slot.dev': 'Device', 'slot.sel': 'Selected',
      'slot.none': 'Not selected', 'slot.picked': '{n} selected', 'slot.nothing': 'Nothing selected',
      'btn.review': 'Review and apply', 'btn.release': 'Remove spoof',
      'sheet.apply': 'Apply spoof',
      'sheet.applyLead': 'Review the summary before saving the configuration.',
      'sheet.drop': 'Remove spoof',
      'sheet.dropLead': 'These apps will use their real device identity again.',
      'row.device': 'Device', 'row.scope': 'Scope', 'row.apps': 'Apps',
      'kill.title': 'Force stop apps',
      'kill.desc': 'Running apps are stopped so the change takes effect immediately.',
      'btn.cancel': 'Cancel', 'btn.apply': 'Apply', 'btn.remove': 'Remove', 'btn.busy': 'Working',
      'toast.applied': ['{n} app applied', '{n} apps applied'],
      'toast.removed': ['{n} app removed', '{n} apps removed'],
      'toast.fail': 'Failed to save configuration',
      'spec.Model': 'Model', 'spec.Manufacturer': 'Manufacturer', 'spec.Brand': 'Brand',
      'spec.Device': 'Device', 'spec.Product': 'Product', 'spec.Board': 'Board',
      'spec.Hardware': 'Hardware', 'spec.SoC': 'SoC', 'spec.Vendor SoC': 'SoC vendor'
    },
    id: {
      'sub.loading': 'Memuat',
      'sub.none': 'Belum ada aplikasi aktif',
      'sub.active': '{n} aplikasi aktif',
      'sub.open': 'Buka melalui KernelSU WebUI',
      'aria.lang': 'Ganti bahasa',
      'aria.refresh': 'Muat ulang daftar aplikasi',
      'tab.apps': 'Aplikasi', 'tab.dev': 'Perangkat', 'tab.act': 'Aktif',
      'ph.apps': 'Cari nama atau package',
      'ph.dev': 'Cari perangkat atau model',
      'f.all': 'Semua', 'f.game': 'Game', 'f.other': 'Lainnya', 'f.picked': 'Terpilih',
      'n.apps': '{n} aplikasi',
      'sel.all': 'Pilih semua', 'sel.clear': 'Hapus pilihan',
      'sec.games': 'Game', 'sec.other': 'Aplikasi lain',
      'empty.apps': 'Tidak ada aplikasi yang cocok',
      'empty.picked': 'Belum ada aplikasi yang dipilih',
      'empty.dev': 'Tidak ada perangkat yang cocok',
      'empty.act1': 'Belum ada aplikasi yang di-spoof',
      'empty.act2': 'Pilih aplikasi dan perangkat, lalu terapkan.',
      'dev.scope': 'Cakupan properti',
      'detail.basic': 'Standar', 'detail.full': 'Lengkap',
      'hint.basic': 'Model, produsen, brand, device, dan product.',
      'hint.full': 'Model, produsen, brand, device, product, board, hardware, dan SoC.',
      'brand.all': 'Semua',
      'act.count': '{n} aplikasi aktif',
      'grp.sel': 'Pilih grup', 'grp.clear': 'Batal',
      'slot.apps': 'Aplikasi', 'slot.dev': 'Perangkat', 'slot.sel': 'Dipilih',
      'slot.none': 'Belum dipilih', 'slot.picked': '{n} dipilih', 'slot.nothing': 'Belum ada yang dipilih',
      'btn.review': 'Tinjau dan terapkan', 'btn.release': 'Lepas spoof',
      'sheet.apply': 'Terapkan spoof',
      'sheet.applyLead': 'Periksa ringkasan sebelum menyimpan konfigurasi.',
      'sheet.drop': 'Lepas spoof',
      'sheet.dropLead': 'Aplikasi berikut akan kembali menggunakan identitas perangkat asli.',
      'row.device': 'Perangkat', 'row.scope': 'Cakupan', 'row.apps': 'Aplikasi',
      'kill.title': 'Tutup paksa aplikasi',
      'kill.desc': 'Aplikasi yang sedang berjalan dihentikan agar perubahan langsung berlaku.',
      'btn.cancel': 'Batal', 'btn.apply': 'Terapkan', 'btn.remove': 'Lepas', 'btn.busy': 'Memproses',
      'toast.applied': '{n} aplikasi diterapkan',
      'toast.removed': '{n} aplikasi dilepas',
      'toast.fail': 'Gagal menyimpan konfigurasi',
      'spec.Model': 'Model', 'spec.Manufacturer': 'Produsen', 'spec.Brand': 'Brand',
      'spec.Device': 'Device', 'spec.Product': 'Product', 'spec.Board': 'Board',
      'spec.Hardware': 'Hardware', 'spec.SoC': 'SoC', 'spec.Vendor SoC': 'Vendor SoC'
    }
  };

  let lang = 'en';
  try {
    const saved = localStorage.getItem('lnrspoof.lang');
    if (saved === 'en' || saved === 'id') lang = saved;
  } catch (e) {}

  function t(key, n) {
    let v = (T[lang] && T[lang][key]);
    if (v === undefined) v = T.en[key];
    if (v === undefined) return key;
    if (Array.isArray(v)) v = v[n === 1 ? 0 : 1];
    return n === undefined ? v : v.replace('{n}', n);
  }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $('langCode').textContent = lang.toUpperCase();
  }

  /* ---------- Data ---------- */

  const byId = {};
  C.devices.forEach(function (d) { byId[d.id] = d; });
  const gameName = {};
  C.games.forEach(function (g) { gameName[g.p] = g.t; });
  const brands = [];
  C.devices.forEach(function (d) { if (brands.indexOf(d.g) < 0) brands.push(d.g); });

  const S = {
    tab: 'apps', apps: [], labels: {}, assign: {}, custom: [], kept: [],
    picked: new Set(), drop: new Set(),
    device: null, detail: 'basic', brand: '', query: '', dq: '', filter: 'all',
    kill: true, busy: false, sheet: null, ready: false
  };

  const FILTERS = ['all', 'game', 'other', 'picked'];

  const I = {
    check: '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
    apps: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/></svg>'
  };

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function shq(s) { return "'" + String(s).replace(/'/g, "'\\''") + "'"; }

  function label(pkg) { return S.labels[pkg] || gameName[pkg] || pkg; }
  function byLabel(a, b) { return label(a).toLowerCase().localeCompare(label(b).toLowerCase()); }
  function detailName(d) { return t(d === 'full' ? 'detail.full' : 'detail.basic'); }

  function devName(id) {
    if (byId[id]) return byId[id].t;
    const c = S.custom.filter(function (x) { return x.id === id; })[0];
    return c ? c.name : id;
  }

  let toastTimer = 0;
  function toast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
  }

  /* ---------- Shell bridge ---------- */

  function run(cmd) {
    return new Promise(function (resolve) {
      const cb = 'cb' + Date.now() + Math.floor(Math.random() * 1e6);
      window[cb] = function (code, out, err) {
        delete window[cb];
        resolve({ code: code, out: out || '', err: err || '' });
      };
      try {
        ksu.exec(cmd, '{}', cb);
      } catch (e) {
        delete window[cb];
        resolve({ code: -1, out: '', err: String(e) });
      }
    });
  }

  async function loadApps() {
    let names = null;
    try {
      if (typeof ksu.listPackages === 'function') names = JSON.parse(ksu.listPackages('user'));
    } catch (e) { names = null; }
    if (!names || !names.length) {
      const r = await run('pm list packages -3');
      names = r.out.split('\n').map(function (s) {
        return s.trim().replace(/^package:/, '');
      }).filter(Boolean);
    }
    try {
      if (typeof ksu.getPackagesInfo === 'function') {
        JSON.parse(ksu.getPackagesInfo(JSON.stringify(names))).forEach(function (i) {
          if (i && i.packageName && i.appLabel) S.labels[i.packageName] = i.appLabel;
        });
      }
    } catch (e) {}
    S.apps = names;
  }

  async function loadConfig() {
    const r = await run('cat ' + DATA + '/config.json 2>/dev/null || cat ' + MOD + '/config.json');
    const p = K.parseConfig(r.out, byId);
    S.assign = p.assign;
    S.custom = p.custom;
    S.kept = p.kept;
  }

  async function save(kill) {
    const cfg = K.buildConfig(S.assign, byId, S.custom, S.kept);
    const b64 = btoa(JSON.stringify(cfg, null, 2) + '\n');
    const w = await run(
      'mkdir -p ' + DATA + ' && printf %s ' + shq(b64) + ' | base64 -d > ' + DATA + '/config.json.tmp' +
      ' && mv ' + DATA + '/config.json.tmp ' + DATA + '/config.json && chmod 0644 ' + DATA + '/config.json'
    );
    if (w.code !== 0) return false;
    const a = await run('sh ' + shq(MOD + '/apply.sh') + ' ' + kill.map(shq).join(' '));
    return a.code === 0;
  }

  /* ---------- Rows ---------- */

  function iconHtml(pkg) {
    return '<span class="ico">' + I.apps +
      '<img src="ksu://icon/' + esc(pkg) + '" alt="" decoding="async"></span>';
  }

  function appRow(pkg, attr, on, showTag) {
    const a = showTag ? S.assign[pkg] : null;
    const tag = a ? '<span class="tag">' + esc(devName(a.id)) + '</span>' : '';
    return '<li class="row' + (on ? ' on' : '') + '" ' + attr + '="' + esc(pkg) +
      '" role="checkbox" aria-checked="' + on + '"><div class="row-main">' +
      iconHtml(pkg) +
      '<span class="meta"><b>' + esc(label(pkg)) + '</b><small>' + esc(pkg) + '</small></span>' +
      tag + '<span class="check">' + I.check + '</span></div></li>';
  }

  function pickedRow(pkg) { return appRow(pkg, 'data-pkg', S.picked.has(pkg), true); }
  function dropRow(pkg) { return appRow(pkg, 'data-drop', S.drop.has(pkg), false); }

  function visibleApps() {
    const q = S.query.trim().toLowerCase();
    const f = S.filter;
    const match = function (p) {
      if (f === 'picked' && !S.picked.has(p)) return false;
      return !q || p.toLowerCase().indexOf(q) >= 0 || label(p).toLowerCase().indexOf(q) >= 0;
    };
    return {
      games: f === 'other' ? [] : S.apps.filter(function (p) { return gameName[p] && match(p); }).sort(byLabel),
      rest: f === 'game' ? [] : S.apps.filter(function (p) { return !gameName[p] && match(p); }).sort(byLabel)
    };
  }

  function allPicked(list) {
    return list.length > 0 && list.every(function (p) { return S.picked.has(p); });
  }

  /* ---------- Render: apps ---------- */

  function renderFilters() {
    $('appFilters').innerHTML = FILTERS.map(function (f) {
      return '<button class="chip' + (S.filter === f ? ' on' : '') + '" data-filter="' + f + '">' + t('f.' + f) + '</button>';
    }).join('');
  }

  function syncToolbar() {
    const v = visibleApps();
    const all = v.games.concat(v.rest);
    const info = $('appInfo');
    const btn = $('appSelAll');
    if (info) info.textContent = t('n.apps', all.length);
    if (btn) {
      btn.textContent = t(allPicked(all) ? 'sel.clear' : 'sel.all');
      btn.hidden = !all.length;
    }
  }

  function renderApps() {
    renderFilters();
    const v = visibleApps();
    let html = '<div class="toolbar"><span class="info" id="appInfo"></span>' +
      '<button class="link" id="appSelAll" data-act="selVisible"></button></div>';
    if (v.games.length) {
      html += '<div class="sec-hd" style="padding-top:2px"><span class="lbl">' + t('sec.games') + '<small>' + v.games.length + '</small></span></div>' +
        '<ul class="card-list">' + v.games.map(pickedRow).join('') + '</ul>';
    }
    if (v.rest.length) {
      html += '<div class="sec-hd"><span class="lbl">' + t('sec.other') + '<small>' + v.rest.length + '</small></span></div>' +
        '<ul class="card-list">' + v.rest.map(pickedRow).join('') + '</ul>';
    }
    if (!v.games.length && !v.rest.length) {
      html += '<div class="empty">' + I.apps + '<p>' + t('empty.apps') + '</p>' +
        (S.filter === 'picked' ? '<p>' + t('empty.picked') + '</p>' : '') + '</div>';
    }
    $('appList').innerHTML = html;
    syncToolbar();
  }

  /* ---------- Render: devices ---------- */

  function renderDevices() {
    $('detailSeg').innerHTML = ['basic', 'full'].map(function (d) {
      return '<button data-detail="' + d + '" class="' + (S.detail === d ? 'on' : '') + '">' + detailName(d) + '</button>';
    }).join('');
    $('detailHint').textContent = t(S.detail === 'full' ? 'hint.full' : 'hint.basic');
    $('chips').innerHTML = [''].concat(brands).map(function (b) {
      return '<button class="chip' + (S.brand === b ? ' on' : '') + '" data-brand="' + esc(b) + '">' + (b ? esc(b) : t('brand.all')) + '</button>';
    }).join('');

    const q = S.dq.trim().toLowerCase();
    const list = C.devices.filter(function (d) {
      if (S.brand && d.g !== S.brand) return false;
      if (!q) return true;
      return (d.t + ' ' + d.m + ' ' + d.g + ' ' + (d.d || '')).toLowerCase().indexOf(q) >= 0;
    });

    let html = '';
    let last = '';
    list.forEach(function (d) {
      if (d.g !== last) {
        if (last) html += '</ul>';
        const n = list.filter(function (x) { return x.g === d.g; }).length;
        html += '<div class="sec-hd"><span class="lbl">' + esc(d.g) + '<small>' + n + '</small></span></div><ul class="card-list">';
        last = d.g;
      }
      const on = S.device === d.id;
      html += '<li class="row' + (on ? ' on' : '') + '">' +
        '<div class="row-main" data-dev="' + esc(d.id) + '" role="radio" aria-checked="' + on + '">' +
        '<span class="radio"></span>' +
        '<span class="meta"><b>' + esc(d.t) + '</b><small>' + esc(d.m) + (d.sm ? ' / ' + esc(d.sm) : '') + '</small></span>' +
        '</div>';
      if (on) {
        html += '<dl class="specs">' + K.rowsFor(d, S.detail).map(function (r) {
          return '<div><dt>' + esc(t('spec.' + r[0])) + '</dt><dd>' + esc(r[1]) + '</dd></div>';
        }).join('') + '</dl>';
      }
      html += '</li>';
    });
    if (last) html += '</ul>';
    if (!html) html = '<div class="empty">' + I.phone + '<p>' + t('empty.dev') + '</p></div>';
    $('devList').innerHTML = html;
  }

  /* ---------- Render: active ---------- */

  function activeGroups() {
    const groups = {};
    const order = [];
    Object.keys(S.assign).forEach(function (pkg) {
      const a = S.assign[pkg];
      const key = a.id + '|' + a.detail;
      if (!groups[key]) {
        groups[key] = { id: a.id, detail: a.detail, list: [] };
        order.push(key);
      }
      groups[key].list.push(pkg);
    });
    return order.map(function (k) {
      groups[k].list.sort(byLabel);
      return groups[k];
    });
  }

  function grpAllOn(g) {
    return g.list.every(function (p) { return S.drop.has(p); });
  }

  function renderActive() {
    const groups = activeGroups();
    if (!groups.length) {
      $('actList').innerHTML = '<div class="empty">' + I.phone + '<p>' + t('empty.act1') + '</p>' +
        '<p>' + t('empty.act2') + '</p></div>';
      return;
    }
    const total = Object.keys(S.assign).length;
    let html = '<div class="toolbar"><span class="info">' + t('act.count', total) + '</span>' +
      '<button class="link" id="actSelAll" data-act="allActive">' + t(S.drop.size === total ? 'sel.clear' : 'sel.all') + '</button></div>';
    groups.forEach(function (g, i) {
      html += '<div class="grp"><div class="grp-hd"><span class="meta"><b>' + esc(devName(g.id)) + '</b>' +
        '<small>' + (byId[g.id] ? detailName(g.detail) + ', ' : '') + t('n.apps', g.list.length) + '</small></span>' +
        '<button class="link" data-act="selGrp" data-grp="' + i + '">' + t(grpAllOn(g) ? 'grp.clear' : 'grp.sel') + '</button></div>' +
        '<ul class="card-list">' + g.list.map(dropRow).join('') + '</ul></div>';
    });
    $('actList').innerHTML = html;
  }

  /* ---------- Render: header, dock, sheet ---------- */

  function renderCounts() {
    const total = Object.keys(S.assign).length;
    $('sub').textContent = !S.ready ? t('sub.loading') : (total ? t('sub.active', total) : t('sub.none'));
    const a = $('cApps');
    a.textContent = S.picked.size;
    a.hidden = !S.picked.size;
    const b = $('cAct');
    b.textContent = total;
    b.hidden = !total;
  }

  function renderDock() {
    if (S.tab === 'act') {
      const n = S.drop.size;
      $('dock').innerHTML = '<div class="dock-in"><div class="slots one"><div class="slot static' + (n ? '' : ' need') + '">' +
        '<span class="k">' + t('slot.sel') + '</span><span class="v">' + (n ? t('n.apps', n) : t('slot.nothing')) + '</span></div></div>' +
        '<button class="btn danger" data-act="reviewDrop"' + (n && !S.busy ? '' : ' disabled') + '>' + t('btn.release') + '</button></div>';
      return;
    }
    const n = S.picked.size;
    const ready = n > 0 && S.device && !S.busy;
    $('dock').innerHTML = '<div class="dock-in"><div class="slots">' +
      '<button class="slot' + (n ? '' : ' need') + '" data-tab="apps"><span class="k">' + t('slot.apps') + '</span>' +
        '<span class="v">' + (n ? t('slot.picked', n) : t('slot.none')) + '</span></button>' +
      '<button class="slot' + (S.device ? '' : ' need') + '" data-tab="dev"><span class="k">' + t('slot.dev') + '</span>' +
        '<span class="v">' + (S.device ? esc(devName(S.device)) : t('slot.none')) + '</span></button>' +
      '</div><button class="btn primary" data-act="review"' + (ready ? '' : ' disabled') + '>' + t('btn.review') + '</button></div>';
  }

  function renderSheet() {
    const bg = $('sheetBg');
    if (!S.sheet) { bg.hidden = true; return; }
    const isApply = S.sheet === 'apply';
    const list = Array.from(isApply ? S.picked : S.drop).sort(byLabel);
    const rows = isApply
      ? '<div><dt>' + t('row.device') + '</dt><dd>' + esc(devName(S.device)) + '</dd></div>' +
        '<div><dt>' + t('row.scope') + '</dt><dd>' + detailName(S.detail) + '</dd></div>' +
        '<div><dt>' + t('row.apps') + '</dt><dd>' + list.length + '</dd></div>'
      : '<div><dt>' + t('row.apps') + '</dt><dd>' + list.length + '</dd></div>';
    $('sheet').innerHTML =
      '<h2>' + t(isApply ? 'sheet.apply' : 'sheet.drop') + '</h2>' +
      '<p class="lead">' + t(isApply ? 'sheet.applyLead' : 'sheet.dropLead') + '</p>' +
      '<dl class="sum">' + rows + '</dl>' +
      '<ul class="names">' + list.map(function (p) { return '<li>' + esc(label(p)) + '</li>'; }).join('') + '</ul>' +
      '<button class="opt" data-act="kill" role="switch" aria-checked="' + S.kill + '">' +
        '<span class="meta"><b>' + t('kill.title') + '</b><small>' + t('kill.desc') + '</small></span>' +
        '<span class="sw"></span></button>' +
      '<div class="btns"><button class="btn ghost" data-act="closeSheet"' + (S.busy ? ' disabled' : '') + '>' + t('btn.cancel') + '</button>' +
      '<button class="btn ' + (isApply ? 'primary' : 'danger') + '" data-act="' + (isApply ? 'apply' : 'drop') + '"' + (S.busy ? ' disabled' : '') + '>' +
      t(S.busy ? 'btn.busy' : (isApply ? 'btn.apply' : 'btn.remove')) + '</button></div>';
    bg.hidden = false;
  }

  function renderAll() {
    applyStatic();
    renderCounts();
    renderApps();
    renderDevices();
    renderActive();
    renderDock();
    renderSheet();
  }

  /* ---------- Behaviour ---------- */

  function setTab(tab) {
    S.tab = tab;
    ['apps', 'dev', 'act'].forEach(function (k) { $('tab-' + k).hidden = k !== tab; });
    document.querySelectorAll('.tab').forEach(function (b) {
      const on = b.dataset.tab === tab;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', on);
    });
    window.scrollTo(0, 0);
    renderDock();
  }

  function toggleIn(set, el, key) {
    if (set.has(key)) set.delete(key); else set.add(key);
    el.classList.toggle('on', set.has(key));
    el.setAttribute('aria-checked', set.has(key));
  }

  async function apply() {
    if (S.busy || !S.device || !S.picked.size) return;
    S.busy = true;
    renderSheet(); renderDock();
    const pk = Array.from(S.picked);
    pk.forEach(function (p) { S.assign[p] = { id: S.device, detail: S.detail }; });
    const ok = await save(S.kill ? pk : []);
    S.busy = false;
    S.sheet = null;
    if (ok) { S.picked.clear(); toast(t('toast.applied', pk.length)); }
    else { await loadConfig(); toast(t('toast.fail')); }
    renderAll();
  }

  async function release() {
    if (S.busy || !S.drop.size) return;
    S.busy = true;
    renderSheet(); renderDock();
    const pk = Array.from(S.drop);
    pk.forEach(function (p) { delete S.assign[p]; });
    const ok = await save(S.kill ? pk : []);
    S.busy = false;
    S.sheet = null;
    if (ok) { S.drop.clear(); toast(t('toast.removed', pk.length)); }
    else { await loadConfig(); toast(t('toast.fail')); }
    renderAll();
  }

  async function reload() {
    const btn = $('refresh');
    btn.classList.add('spin');
    await Promise.all([loadApps(), loadConfig()]);
    S.picked.forEach(function (p) { if (S.apps.indexOf(p) < 0) S.picked.delete(p); });
    S.drop.forEach(function (p) { if (!S.assign[p]) S.drop.delete(p); });
    btn.classList.remove('spin');
    renderAll();
  }

  const actions = {
    refresh: reload,
    apply: apply,
    drop: release,
    lang: function () {
      lang = lang === 'en' ? 'id' : 'en';
      try { localStorage.setItem('lnrspoof.lang', lang); } catch (e) {}
      renderAll();
    },
    review: function () { if (S.picked.size && S.device) { S.sheet = 'apply'; renderSheet(); } },
    reviewDrop: function () { if (S.drop.size) { S.sheet = 'drop'; renderSheet(); } },
    closeSheet: function (el, e) {
      if (S.busy) return;
      if (el.id === 'sheetBg' && e.target !== el) return;
      S.sheet = null;
      renderSheet();
    },
    kill: function () { S.kill = !S.kill; renderSheet(); },
    selVisible: function () {
      const v = visibleApps();
      const all = v.games.concat(v.rest);
      const on = allPicked(all);
      all.forEach(function (p) { if (on) S.picked.delete(p); else S.picked.add(p); });
      if (S.filter === 'picked') { renderApps(); } else {
        document.querySelectorAll('#appList [data-pkg]').forEach(function (el) {
          const k = S.picked.has(el.dataset.pkg);
          el.classList.toggle('on', k);
          el.setAttribute('aria-checked', k);
        });
        syncToolbar();
      }
      renderCounts(); renderDock();
    },
    allActive: function () {
      const keys = Object.keys(S.assign);
      if (S.drop.size === keys.length) S.drop.clear();
      else keys.forEach(function (p) { S.drop.add(p); });
      renderActive(); renderDock();
    },
    selGrp: function (el) {
      const g = activeGroups()[Number(el.dataset.grp)];
      if (!g) return;
      const on = grpAllOn(g);
      g.list.forEach(function (p) { if (on) S.drop.delete(p); else S.drop.add(p); });
      renderActive(); renderDock();
    }
  };

  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-tab],[data-pkg],[data-drop],[data-dev],[data-brand],[data-detail],[data-filter],[data-act]');
    if (!el) return;
    const d = el.dataset;
    if (d.tab) {
      setTab(d.tab);
    } else if (d.pkg) {
      toggleIn(S.picked, el, d.pkg);
      if (S.filter === 'picked') renderApps(); else syncToolbar();
      renderCounts(); renderDock();
    } else if (d.drop) {
      toggleIn(S.drop, el, d.drop);
      renderActive(); renderDock();
    } else if (d.dev) {
      S.device = d.dev; renderDevices(); renderDock();
    } else if (d.brand !== undefined) {
      S.brand = d.brand; renderDevices();
    } else if (d.detail) {
      S.detail = d.detail; renderDevices(); renderDock();
    } else if (d.filter) {
      S.filter = d.filter; renderApps();
    } else if (d.act && actions[d.act]) {
      actions[d.act](el, e);
    }
  });

  /* App icons: show the real icon once it loads; keep the neutral glyph otherwise. */
  document.addEventListener('load', function (e) {
    const img = e.target;
    if (img && img.tagName === 'IMG' && img.parentNode && img.parentNode.classList.contains('ico')) {
      img.parentNode.classList.add('ld');
    }
  }, true);

  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') e.target.remove();
  }, true);

  $('q').addEventListener('input', function (e) { S.query = e.target.value; renderApps(); });
  $('dq').addEventListener('input', function (e) { S.dq = e.target.value; renderDevices(); });

  if (typeof ResizeObserver === 'function') {
    new ResizeObserver(function () {
      document.documentElement.style.setProperty('--dock-h', $('dock').offsetHeight + 'px');
    }).observe($('dock'));
  }

  /* Draw under the system bars; the host then supplies --window-inset-* for padding. */
  function edgeToEdge() {
    try {
      if (typeof ksu !== 'undefined' && typeof ksu.enableInsets === 'function') ksu.enableInsets(true);
    } catch (e) {}
  }

  async function init() {
    edgeToEdge();
    applyStatic();
    if (typeof ksu === 'undefined') {
      $('sub').textContent = t('sub.open');
      $('dock').hidden = true;
      return;
    }
    try {
      const mi = JSON.parse(ksu.moduleInfo());
      if (mi && mi.moduleDir) MOD = mi.moduleDir;
    } catch (e) {}
    renderAll();
    await Promise.all([loadApps(), loadConfig()]);
    S.ready = true;
    renderAll();
  }

  init();
})();
