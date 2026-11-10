(function () {
  const root = typeof window !== 'undefined' ? window : globalThis;

  const BASIC = {
    m: 'ro.product.model',
    mf: 'ro.product.manufacturer',
    b: 'ro.product.brand',
    d: 'ro.product.device',
    n: 'ro.product.name'
  };

  const FULL = {
    bo: 'ro.product.board',
    hw: 'ro.hardware',
    sm: 'ro.soc.model',
    sv: 'ro.soc.manufacturer'
  };

  const LABEL = {
    m: 'Model',
    mf: 'Manufacturer',
    b: 'Brand',
    d: 'Device',
    n: 'Product',
    bo: 'Board',
    hw: 'Hardware',
    sm: 'SoC',
    sv: 'Vendor SoC'
  };

  function pick(dev, map, out) {
    Object.keys(map).forEach(function (k) {
      if (dev[k]) out[map[k]] = dev[k];
    });
  }

  function propsFor(dev, detail) {
    const out = {};
    pick(dev, BASIC, out);
    if (detail === 'full') {
      pick(dev, FULL, out);
      if (dev.x) Object.keys(dev.x).forEach(function (k) { out[k] = dev.x[k]; });
    }
    return out;
  }

  function rowsFor(dev, detail) {
    const keys = Object.keys(BASIC);
    if (detail === 'full') Object.keys(FULL).forEach(function (k) { keys.push(k); });
    return keys.filter(function (k) { return dev[k]; }).map(function (k) { return [LABEL[k], dev[k]]; });
  }

  function parseConfig(text, byId) {
    const res = { assign: {}, custom: [], kept: [] };
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res;
    }
    const list = data && Array.isArray(data.profiles) ? data.profiles : [];
    list.forEach(function (p, i) {
      if (!p || typeof p !== 'object') return;
      if (p.enabled === false) {
        res.kept.push(p);
        return;
      }
      const pkgs = Array.isArray(p.packages) ? p.packages.filter(Boolean) : [];
      let id;
      if (p.preset && byId[p.preset]) {
        id = p.preset;
      } else {
        id = 'c' + res.custom.length;
        res.custom.push({ id: id, name: p.name || 'Profile ' + (i + 1), props: p.props || {} });
      }
      const detail = p.detail === 'full' ? 'full' : 'basic';
      pkgs.forEach(function (pkg) {
        if (!res.assign[pkg]) res.assign[pkg] = { id: id, detail: detail };
      });
    });
    return res;
  }

  function buildConfig(assign, byId, custom, kept) {
    const groups = {};
    const order = [];
    Object.keys(assign).forEach(function (pkg) {
      const a = assign[pkg];
      const key = a.id + '|' + a.detail;
      if (!groups[key]) {
        groups[key] = { id: a.id, detail: a.detail, packages: [] };
        order.push(key);
      }
      groups[key].packages.push(pkg);
    });
    const profiles = [];
    order.forEach(function (key) {
      const g = groups[key];
      const dev = byId[g.id];
      g.packages.sort();
      if (dev) {
        profiles.push({
          name: dev.t,
          preset: dev.id,
          detail: g.detail,
          enabled: true,
          props: propsFor(dev, g.detail),
          packages: g.packages
        });
        return;
      }
      const c = custom.filter(function (x) { return x.id === g.id; })[0];
      if (c) profiles.push({ name: c.name, enabled: true, props: c.props, packages: g.packages });
    });
    return { profiles: profiles.concat(kept || []) };
  }

  root.Core = { propsFor: propsFor, rowsFor: rowsFor, parseConfig: parseConfig, buildConfig: buildConfig };
})();
