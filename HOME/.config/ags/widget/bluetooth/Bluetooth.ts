import PopupWindow from 'widget/PopupWindow';
import options from 'options';
import { type BluetoothDevice } from 'types/service/bluetooth';
import { AdvancedToggleButton, Menu } from 'widget/audiomenu/ToggleButton';

import icons from 'lib/icons';

const bluetooth = await Service.import('bluetooth');

const { bar, bluetoothmenu } = options;

const pos = bar.position.bind();
const layout = Utils.derive([bar.position, bluetoothmenu.position], (bar, qs) => `${bar}-${qs}` as const);

export const BluetoothIndicator = () =>
    Widget.Overlay({
        class_name: 'bluetooth',
        passThrough: true,
        visible: bluetooth.bind('enabled'),
        child: Widget.Icon({
            icon: icons.bluetooth.enabled
        })
    });

const Bluetooth = () =>
    PopupWindow({
        name: 'bluetooth',
        exclusivity: 'exclusive',
        transition: pos.as((pos) => (pos === 'top' ? 'slide_down' : 'slide_up')),
        layout: layout.value,
        child: Widget.Box({
            vertical: true,
            class_name: 'bluetooth vertical',
            children: [BluetoothHeader(), BluetoothDevices()]
        })
    });

export function setupBluetooth() {
    App.addWindow(Bluetooth());
    layout.connect('changed', () => {
        App.removeWindow('bluetooth');
        App.addWindow(Bluetooth());
    });
}

export const BluetoothHeader = () =>
    AdvancedToggleButton({
        name: 'bluetooth',
        class_name: 'bluetooth-header',
        icon: bluetooth.bind('enabled').as((p) => icons.bluetooth[p ? 'enabled' : 'disabled']),
        label: Utils.watch('Disabled', bluetooth, () => {
            if (!bluetooth.enabled) return 'Disabled';

            if (bluetooth.connected_devices.length === 1) return bluetooth.connected_devices[0].alias;

            return `${bluetooth.connected_devices.length} Connected`;
        }),
        connection: [bluetooth, () => bluetooth.enabled],
        deactivate: () => (bluetooth.enabled = false),
        activate: () => (bluetooth.enabled = true)
    });

const DeviceItem = (device: BluetoothDevice) =>
    Widget.Box({
        children: [
            Widget.Icon(device.icon_name + '-symbolic'),
            Widget.Label(device.name),
            Widget.Label({
                label: `${device.battery_percentage}%`,
                visible: device.bind('battery_percentage').as((p) => p > 0)
            }),
            Widget.Box({ hexpand: true }),
            Widget.Spinner({
                active: device.bind('connecting'),
                visible: device.bind('connecting')
            }),
            Widget.Switch({
                active: device.connected,
                visible: device.bind('connecting').as((p) => !p),
                setup: (self) =>
                    self.on('notify::active', () => {
                        device.setConnection(self.active);
                    })
            })
        ]
    });

export const BluetoothDevices = () =>
    Widget.Box({
        class_name: 'bluetooth-list',
        hexpand: true,
        vertical: true,
        children: bluetooth.bind('devices').as((ds) => ds.filter((d) => d.name).map(DeviceItem))
    });
