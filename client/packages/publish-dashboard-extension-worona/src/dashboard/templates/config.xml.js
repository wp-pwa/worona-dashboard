export default ({ appId, appName,
  siteURL, userEmail, userName, siteId }) =>
`<?xml version="1.0" encoding="UTF-8"?>

<!-- config.xml reference: https://build.phonegap.com/docs/config-xml -->
<widget xmlns     = "http://www.w3.org/ns/widgets"
        xmlns:gap = "http://phonegap.com/ns/1.0"
        id        = "${appId}"
        version   = "1.0.0">

    <name>${appName}</name>


    <author href="${siteURL}" email="${userEmail}">
        ${userName}
    </author>

    <!-- Define the main entry-point to the application -->
    <content src="index.html" />

    <!-- siteId preference. -->
    <preference name="siteId" value="${siteId}" />

    <!-- android: MIN SDK version supported on the target device. MAX version is blank by default. -->
    <preference name="android-minSdkVersion" value="14" />
    <!-- Define a specific version of PhoneGap to build into your app. -->
    <!-- <preference name="phonegap-version"       value="cli-6.0.0" /> -->

    <!-- Plugins -->
    <!-- Core plugins -->
    <plugin name="cordova-plugin-appsettings"              source="npm" spec="~1.0.2" />

    <!--
    <plugin name="cordova-plugin-battery-status"      source="npm" spec="~1.1.1" />
    <plugin name="cordova-plugin-camera"              source="npm" spec="~2.1.1" />
    <plugin name="cordova-plugin-media-capture"       source="npm" spec="~1.2.0" />
    <plugin name="cordova-plugin-console"             source="npm" spec="~1.0.2" />
    <plugin name="cordova-plugin-contacts"            source="npm" spec="~2.0.1" />
    <plugin name="cordova-plugin-device"              source="npm" spec="~1.1.1" />
    <plugin name="cordova-plugin-device-motion"       source="npm" spec="~1.2.0" />
    <plugin name="cordova-plugin-device-orientation"  source="npm" spec="~1.0.2" />
    <plugin name="cordova-plugin-dialogs"             source="npm" spec="~1.2.0" />
    <plugin name="cordova-plugin-file"                source="npm" spec="~4.1.1" />
    <plugin name="cordova-plugin-file-transfer"       source="npm" spec="~1.5.0" />
    <plugin name="cordova-plugin-geolocation"         source="npm" spec="~2.1.0" />
    <plugin name="cordova-plugin-globalization"       source="npm" spec="~1.0.3" />
    <plugin name="cordova-plugin-inappbrowser"        source="npm" spec="~1.3.0" />
    <plugin name="cordova-plugin-media"               source="npm" spec="~2.2.0" />
    <plugin name="cordova-plugin-network-information" source="npm" spec="~1.2.0" />
    <plugin name="cordova-plugin-splashscreen"        source="npm" spec="~3.2.1" />
    <plugin name="cordova-plugin-statusbar"           source="npm" spec="~2.1.2" />
    <plugin name="cordova-plugin-vibration"           source="npm" spec="~2.1.0" />
    <plugin name="cordova-plugin-whitelist"           source="npm" spec="~1.2.1" />
    -->

    <!-- Define app icon and splashscreen for each platform. -->
    <icon src="icon.png" />
    <platform name="android">
        <icon   src="www/res/icon/android/ldpi-icon.png"               qualifier="ldpi" />
        <icon   src="www/res/icon/android/mdpi-icon.png"               qualifier="mdpi" />
        <icon   src="www/res/icon/android/hdpi-icon.png"               qualifier="hdpi" />
        <icon   src="www/res/icon/android/xhdpi-icon.png"              qualifier="xhdpi" />
        <icon   src="www/res/icon/android/xxhdpi-icon.png"             qualifier="xxhdpi" />
        <icon   src="www/res/icon/android/xxxhdpi-icon.png"            qualifier="xxxhdpi" />
        <splash src="www/res/screen/android/ldpi-screen.png"           qualifier="ldpi" />
        <splash src="www/res/screen/android/mdpi-screen.png"           qualifier="mdpi" />
        <splash src="www/res/screen/android/hdpi-screen.png"           qualifier="hdpi" />
        <splash src="www/res/screen/android/xhdpi-screen.png"          qualifier="xhdpi" />
        <splash src="www/res/screen/android/xxhdpi-screen.png"         qualifier="xxhdpi" />
        <splash src="www/res/screen/android/xxxhdpi-screen.png"        qualifier="xxxhdpi" />
    </platform>

    <platform name="ios">
        <icon   src="www/res/icon/ios/icon.png"                         platform="ios" width="57"   height="57" />
        <icon   src="www/res/icon/ios/icon@2x.png"                      platform="ios" width="114"  height="114" />
        <icon   src="www/res/icon/ios/icon-40.png"                      platform="ios" width="40"   height="40" />
        <icon   src="www/res/icon/ios/icon-40@2x.png"                   platform="ios" width="80"   height="80" />
        <icon   src="www/res/icon/ios/icon-50.png"                      platform="ios" width="50"   height="50" />
        <icon   src="www/res/icon/ios/icon-50@2x.png"                   platform="ios" width="100"  height="100" />
        <icon   src="www/res/icon/ios/icon-60.png"                      platform="ios" width="60"   height="60" />
        <icon   src="www/res/icon/ios/icon-60@2x.png"                   platform="ios" width="120"  height="120" />
        <icon   src="www/res/icon/ios/icon-60@3x.png"                   platform="ios" width="180"  height="180" />
        <icon   src="www/res/icon/ios/icon-72.png"                      platform="ios" width="72"   height="72" />
        <icon   src="www/res/icon/ios/icon-72@2x.png"                   platform="ios" width="144"  height="144" />
        <icon   src="www/res/icon/ios/icon-76.png"                      platform="ios" width="76"   height="76" />
        <icon   src="www/res/icon/ios/icon-76@2x.png"                   platform="ios" width="152"  height="152" />
        <icon   src="www/res/icon/ios/icon-small.png"                   platform="ios" width="29"   height="29" />
        <icon   src="www/res/icon/ios/icon-small@2x.png"                platform="ios" width="58"   height="58" />
        <icon   src="www/res/icon/ios/icon-small@3x.png"                platform="ios" width="87"   height="87" />
        <splash src="www/res/screen/ios/Default.png"                    platform="ios" width="320"  height="480" />
        <splash src="www/res/screen/ios/Default@2x.png"                 platform="ios" width="640"  height="960" />
        <splash src="www/res/screen/ios/Default-568h@2x.png"            platform="ios" width="640"  height="1136" />
        <splash src="www/res/screen/ios/Default-667h@2x.png"            platform="ios" width="750"  height="1334" />
        <splash src="www/res/screen/ios/Default-Portrait-736h@3x.png"   platform="ios" width="1242" height="2208" />
        <splash src="www/res/screen/ios/Default-Portrait@2x.png"        platform="ios" width="1536" height="2048" />
        <splash src="www/res/screen/ios/Default-Portrait.png"           platform="ios" width="768"  height="1024" />
    </platform>

    <!--
        Define access to external domains.

        <access />            - a blank access tag denies access to all external resources.
        <access origin="*" /> - a wildcard access tag allows access to all external resource.

        Otherwise, you can specify specific domains:
    -->
    <!-- <access origin="*" /> -->
    <!--
       <access origin="http://phonegap.com" />                    - allow any secure requests to http://phonegap.com/
       <access origin="http://phonegap.com" subdomains="true" />  - same as above, but including subdomains, such as http://build.phonegap.com/
       <access origin="http://phonegap.com" browserOnly="true" /> - only allows http://phonegap.com to be opened by the child browser.
    -->

    <!-- Added the following intents to support the removal of whitelist code from base cordova to a plugin -->
    <!-- Whitelist configuration. Refer to https://cordova.apache.org/docs/en/edge/guide_appdev_whitelist_index.md.html -->

    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    <platform name="android">
        <allow-intent href="market:*" />
    </platform>
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
    </platform>

</widget>
`;
