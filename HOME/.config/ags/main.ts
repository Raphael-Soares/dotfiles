import 'lib/session';
import 'style/style';
import init from 'lib/init';
import options from 'options';
import Bar from 'widget/bar/Bar';
import NotificationPopups from 'widget/notifications/NotificationPopups';
import Overview from 'widget/overview/Overview';
import OSD from 'widget/osd/OSD';
import PowerMenu from 'widget/powermenu/PowerMenu';
import Verification from 'widget/powermenu/Verification';
import { forMonitors } from 'lib/utils';
import { setupAudioMenu } from 'widget/audiomenu/AudioMenu';
import { setupDateMenu } from 'widget/datemenu/DateMenu';
import { setupWifi } from 'widget/wifi/WifiMenu';
import { setupBluetooth } from 'widget/bluetooth/Bluetooth';
import { setupNotificationsCenter } from 'widget/notificationscenter/NotificationsCenter';
import ScreenCorners from 'widget/bar/ScreenCorners';

App.config({
    onConfigParsed: () => {
        setupAudioMenu();
        setupDateMenu();
        setupWifi();
        setupBluetooth();
        setupNotificationsCenter();
        init();
    },
    closeWindowDelay: {
        overview: options.transition.value,
        audio: options.transition.value,
        datemenu: options.transition.value,
        wifi: options.transition.value,
        bluetooth: options.transition.value,
        notificationsCenter: options.transition.value
    },
    windows: () => [
        ...forMonitors(Bar),
        ...forMonitors(NotificationPopups),
        ...forMonitors(ScreenCorners),
        ...forMonitors(OSD),
        PowerMenu(),
        Overview(),
        Verification()
    ]
});
