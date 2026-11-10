DATA=/data/adb/lnr_spoofer

if [ "$ARCH" != "arm64" ]; then
  abort "! Only arm64 devices are supported"
fi

ui_print "- Setting up LNRSpoof"
mkdir -p "$DATA"
[ -f "$DATA/config.json" ] || cp "$MODPATH/config.json" "$DATA/config.json"

set_perm_recursive "$MODPATH" 0 0 0755 0644
set_perm "$MODPATH/post-fs-data.sh" 0 0 0755
set_perm "$MODPATH/service.sh" 0 0 0755
set_perm "$MODPATH/uninstall.sh" 0 0 0755
set_perm "$MODPATH/action.sh" 0 0 0755
set_perm "$MODPATH/apply.sh" 0 0 0755

# Only Magisk exposes its Zygisk toggle; KernelSU and APatch use a Zygisk add-on instead
if [ -z "$KSU" ] && [ -z "$APATCH" ] && command -v magisk > /dev/null 2>&1; then
  if [ "$(magisk --sqlite "SELECT value FROM settings WHERE key='zygisk'" 2> /dev/null)" != "value=1" ]; then
    ui_print "! Zygisk is not enabled. Enable it in Magisk settings and reboot"
  fi
fi

ui_print "- Config: $DATA/config.json"
ui_print "- The Action button opens the app and device picker"
