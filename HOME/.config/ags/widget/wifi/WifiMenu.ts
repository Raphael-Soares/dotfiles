import PopupWindow from 'widget/PopupWindow';
import options from 'options';
import icons from 'lib/icons';
import { AdvancedToggleButton } from 'widget/audiomenu/ToggleButton';

const { bar, wifimenu } = options;

const { wifi } = await Service.import('network');

const pos = bar.position.bind();
const layout = Utils.derive([bar.position, wifimenu.position], (bar, qs) => `${bar}-${qs}` as const);

const Wifi = () =>
    PopupWindow({
        name: 'wifi',
        exclusivity: 'exclusive',
        transition: pos.as((pos) => (pos === 'top' ? 'slide_down' : 'slide_up')),
        layout: layout.value,
        child: Widget.Box({
            vertical: true,
            class_name: 'wifi vertical',
            children: [WifiHeader(), WifiList()]
        })
    });

export function setupWifi() {
    App.addWindow(Wifi());
    layout.connect('changed', () => {
        App.removeWindow('wifi');
        App.addWindow(Wifi());
        wifi.scan();
    });
}

export const WifiHeader = () =>
    AdvancedToggleButton({
        name: 'wifi-header',
        class_name: 'wifi-header',
        icon: wifi.bind('icon_name'),
        label: wifi.bind('ssid').as((ssid) => ssid || 'Not Connected'),
        connection: [wifi, () => wifi.enabled],
        deactivate: () => {
            wifi.enabled = false;
        },
        activate: () => {
            wifi.enabled = true;
            wifi.scan();
        }
    });

const WifiList = () =>
    Widget.Box({
        vertical: true,
        class_name: 'wifi-list vertical',
        setup: (self) =>
            self.hook(wifi, () => {
                if (!wifi.enabled) {
                    return (self.children = [
                        Widget.Label({
                            label: 'Wifi is disabled',
                            class_name: 'wifi-disabled'
                        })
                    ]);
                }

                return (self.children = wifi.access_points
                    .sort((a, b) => b.strength - a.strength)
                    .slice(0, 10)
                    .map((ap) =>
                        Widget.Button({
                            on_clicked: () => {
                                if (dependencies('nmcli')) Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`);
                            },
                            child: Widget.Box({
                                children: [
                                    Widget.Icon(ap.iconName),
                                    Widget.Label(ap.ssid || ''),
                                    Widget.Icon({
                                        icon: icons.ui.tick,
                                        hexpand: true,
                                        hpack: 'end',
                                        setup: (self) =>
                                            Utils.idle(() => {
                                                if (!self.is_destroyed) self.visible = ap.active;
                                            })
                                    })
                                ]
                            })
                        })
                    ));
            })
    });
