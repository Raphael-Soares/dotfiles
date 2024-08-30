import BatteryBar from './buttons/BatteryBar';
import Date from './buttons/Date';
import PowerMenu from './buttons/PowerMenu';
import SysTray from './buttons/SysTray';
import Workspaces from './buttons/Workspaces';
import Messages from './buttons/Messages';
import options from 'options';
import Wifi from './buttons/Wifi';
import Bluetooth from './buttons/Bluetooth';
import AudioMenu from './buttons/AudioMenu';

const { start, center, end } = options.bar.layout;
const { position } = options.bar;

export type BarWidget = keyof typeof widget;

const widget = {
    battery: BatteryBar,
    date: Date,
    powermenu: PowerMenu,
    systray: SysTray,
    audio: AudioMenu,
    workspaces: Workspaces,
    messages: Messages,
    wifi: Wifi,
    bluetooth: Bluetooth,
    expander: () => Widget.Box({ expand: true })
};

export default (monitor: number) =>
    Widget.Window({
        monitor,
        class_name: 'bar',
        name: `bar${monitor}`,
        exclusivity: 'exclusive',
        anchor: position.bind().as((pos) => [pos, 'right', 'left']),
        child: Widget.CenterBox({
            css: 'min-width: 2px; min-height: 2px; padding: 2px;',
            startWidget: Widget.Box({
                hexpand: true,
                children: start.bind().as((s) => s.map((w) => widget[w]()))
            }),
            centerWidget: Widget.Box({
                hpack: 'center',
                children: center.bind().as((c) => c.map((w) => widget[w]()))
            }),
            endWidget: Widget.Box({
                hexpand: true,
                children: end.bind().as((e) => e.map((w) => widget[w]()))
            })
        })
    });
