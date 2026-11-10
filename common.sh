DATA=/data/adb/lnr_spoofer
CONFIG=$DATA/config.json
COMPILED=$DATA/compiled.tsv
LOG=$DATA/service.log

BB=""
for candidate in /data/adb/magisk/busybox /data/adb/ksu/bin/busybox /data/adb/ap/bin/busybox; do
  if [ -x "$candidate" ]; then
    BB=$candidate
    break
  fi
done
[ -n "$BB" ] || BB=$(command -v busybox)

log() {
  if [ -f "$LOG" ] && [ "$(wc -c < "$LOG")" -gt 65536 ]; then
    : > "$LOG"
  fi
  echo "$(date '+%F %T') $*" >> "$LOG"
}

compile() {
  [ -n "$BB" ] || return 1
  mkdir -p "$DATA"
  [ -f "$CONFIG" ] || cp "$MODDIR/config.json" "$CONFIG"
  if $BB awk -f "$MODDIR/compile.awk" "$CONFIG" > "$COMPILED.tmp" 2>> "$LOG"; then
    chmod 0644 "$COMPILED.tmp"
    mv "$COMPILED.tmp" "$COMPILED"
    log "config loaded: $(cut -f1 "$COMPILED" | sort -u | wc -l) packages"
    return 0
  else
    rm -f "$COMPILED.tmp"
    log "config invalid, previous configuration kept"
    return 1
  fi
}
