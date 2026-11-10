#!/system/bin/sh
MODDIR=${0%/*}
. "$MODDIR/common.sh"

[ -f "$COMPILED" ] || compile

LAST=$(stat -c %Y "$CONFIG" 2> /dev/null)
while :; do
  sleep 5
  CURRENT=$(stat -c %Y "$CONFIG" 2> /dev/null)
  if [ "$CURRENT" != "$LAST" ]; then
    LAST=$CURRENT
    compile
  fi
done
