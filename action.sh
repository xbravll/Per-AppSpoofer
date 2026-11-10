#!/system/bin/sh
ID=lnr_spoofer
NAME="LNRSpoof"

launch() {
  pm path "$1" > /dev/null 2>&1 || return 1
  am start --user 0 -n "$1/$2" -e id "$ID" -e name "$NAME" -e MOD_ID "$ID" > /dev/null 2>&1
}

launch io.github.a13e300.ksuwebui io.github.a13e300.ksuwebui.WebUIActivity && exit 0
launch com.dergoogler.mmrl.wx com.dergoogler.mmrl.ui.activity.webui.WebUIActivity && exit 0
launch me.weishu.kernelsu me.weishu.kernelsu.ui.webui.WebUIActivity && exit 0
launch com.rifsxd.ksunext com.rifsxd.ksunext.ui.webui.WebUIActivity && exit 0

echo "No KSU WebUI app found."
echo "Open it from the WebUI button in your manager."
exit 1
