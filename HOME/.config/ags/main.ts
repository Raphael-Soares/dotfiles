import 'lib/session';
import 'style/style';
import init from 'lib/init';
import options from 'options';
import Bar from 'widget/bar/Bar';
import NotificationPopups from 'widget/notifications/NotificationPopups';
import OSD from 'widget/osd/OSD';
import Overview from 'widget/overview/Overview';
import PowerMenu from 'widget/powermenu/PowerMenu';
import SettingsDialog from 'widget/settings/SettingsDialog';
import Verification from 'widget/powermenu/Verification';
import { forMonitors } from 'lib/utils';
import { setupQuickSettings } from 'widget/quicksettings/QuickSettings';
import { setupDateMenu } from 'widget/datemenu/DateMenu';

App.config({
    onConfigParsed: () => {
        setupQuickSettings();
        setupDateMenu();
        init();
    },
    closeWindowDelay: {
        overview: options.transition.value,
        quicksettings: options.transition.value,
        datemenu: options.transition.value
    },
    windows: () => [
        ...forMonitors(Bar),
        ...forMonitors(NotificationPopups),
        ...forMonitors(OSD),
        Overview(),
        PowerMenu(),
        SettingsDialog(),
        Verification()
    ]
});
