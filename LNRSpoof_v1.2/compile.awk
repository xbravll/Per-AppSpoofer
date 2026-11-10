function fail(msg) {
  if (failed) return
  print "error: " msg > "/dev/stderr"
  failed = 1
}

function skip_ws() {
  while (pos <= len && index(" \t\r\n", substr(src, pos, 1)) > 0) pos++
}

function read_string(   out, ch, nx) {
  pos++
  out = ""
  while (pos <= len) {
    ch = substr(src, pos, 1)
    if (ch == "\"") {
      pos++
      return out
    }
    if (ch == "\\") {
      pos++
      nx = substr(src, pos, 1)
      if (nx == "n" || nx == "t" || nx == "r") nx = " "
      ch = nx
    }
    out = out ch
    pos++
  }
  fail("unterminated string")
  return out
}

function read_scalar(   start, ch) {
  start = pos
  while (pos <= len) {
    ch = substr(src, pos, 1)
    if (ch == "," || ch == "}" || ch == "]" || index(" \t\r\n", ch) > 0) break
    pos++
  }
  return substr(src, start, pos - start)
}

function emit(path, value,   parts, idx) {
  split(path, parts, "/")
  if (parts[2] != "profiles") return
  idx = parts[3] + 0
  seen[idx] = 1
  if (idx > maxidx) maxidx = idx
  if (parts[4] == "enabled") {
    enabled[idx] = value
  } else if (parts[4] == "packages") {
    pkgcount[idx]++
    pkg[idx, pkgcount[idx]] = value
  } else if (parts[4] == "props") {
    propcount[idx]++
    propkey[idx, propcount[idx]] = parts[5]
    propval[idx, propcount[idx]] = value
  }
}

function read_value(path,   ch, key, idx) {
  skip_ws()
  ch = substr(src, pos, 1)
  if (ch == "{") {
    pos++
    skip_ws()
    if (substr(src, pos, 1) == "}") {
      pos++
      return
    }
    while (!failed) {
      if (pos > len) {
        fail("unexpected end of file")
        return
      }
      skip_ws()
      if (substr(src, pos, 1) != "\"") {
        fail("object key expected at " pos)
        return
      }
      key = read_string()
      skip_ws()
      if (substr(src, pos, 1) != ":") {
        fail("colon expected at " pos)
        return
      }
      pos++
      read_value(path "/" key)
      skip_ws()
      ch = substr(src, pos, 1)
      pos++
      if (ch == "}") return
      if (ch != ",") {
        fail("comma or closing brace expected at " (pos - 1))
        return
      }
    }
    return
  }
  if (ch == "[") {
    pos++
    skip_ws()
    if (substr(src, pos, 1) == "]") {
      pos++
      return
    }
    idx = 0
    while (!failed) {
      if (pos > len) {
        fail("unexpected end of file")
        return
      }
      read_value(path "/" idx)
      idx++
      skip_ws()
      ch = substr(src, pos, 1)
      pos++
      if (ch == "]") return
      if (ch != ",") {
        fail("comma or closing bracket expected at " (pos - 1))
        return
      }
    }
    return
  }
  if (ch == "\"") {
    emit(path, read_string())
    return
  }
  emit(path, read_scalar())
}

BEGIN {
  failed = 0
  maxidx = -1
  src = ""
  nk = split("ro.product.model ro.product.manufacturer ro.product.brand ro.product.device ro.product.name ro.product.board ro.hardware ro.build.display.id ro.build.id ro.build.fingerprint ro.soc.model ro.soc.manufacturer", keys, " ")
  for (k = 1; k <= nk; k++) allowed[keys[k]] = 1
}

{
  src = src $0 "\n"
}

END {
  if (NR == 0) exit 1
  len = length(src)
  pos = 1
  if (substr(src, 1, 3) == "\357\273\277") pos = 4
  read_value("")
  skip_ws()
  if (!failed && pos <= len) fail("unexpected trailing content at " pos)
  if (failed) exit 1

  for (idx = 0; idx <= maxidx; idx++) {
    if (!(idx in seen)) continue
    if (enabled[idx] == "false") continue
    for (p = 1; p <= pkgcount[idx]; p++) {
      name = pkg[idx, p]
      if (name == "") continue
      if ((name in claimed) && claimed[name] != idx) continue
      claimed[name] = idx
      for (q = 1; q <= propcount[idx]; q++) {
        if (propkey[idx, q] == "") continue
        if (!(propkey[idx, q] in allowed)) continue
        print name "\t" propkey[idx, q] "\t" propval[idx, q]
      }
    }
  }
}
