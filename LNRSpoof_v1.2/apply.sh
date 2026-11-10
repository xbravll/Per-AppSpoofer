#!/system/bin/sh
MODDIR=${0%/*}
. "$MODDIR/common.sh"
compile || exit 1
for pkg in "$@"; do
  am force-stop "$pkg" > /dev/null 2>&1
done
exit 0
