import icons from 'lib/icons';
import { hypridleStatus, uptime } from 'lib/variables';
import options from 'options';
import PowerMenu from 'widget/bar/buttons/PowerMenu';
import { HypridleToggle } from './Idle';

const battery = await Service.import('battery');
const { image, size } = options.quicksettings.avatar;

function up(up: number) {
    const h = Math.floor(up / 60);
    const m = Math.floor(up % 60);
    return `${h}h ${m < 10 ? '0' + m : m}m`;
}

const Avatar = () =>
    Widget.Box({
        class_name: 'avatar',
        css: Utils.merge(
            [image.bind(), size.bind()],
            (img, size) => `
        min-width: ${size}px;
        min-height: ${size}px;
        background-image: url('${img}');
        background-size: cover;
    `
        )
    });

export const Header = () =>
    Widget.Box(
        { class_name: 'header horizontal' },
        Avatar(),

        Widget.Box({
            vertical: true,
            vpack: 'center',

            children: [
                Widget.Box({
                    visible: battery.bind('available'),
                    children: [
                        Widget.Icon({ icon: battery.bind('icon_name') }),
                        Widget.Label({ label: battery.bind('percent').as((p) => `${p}%`) })
                    ]
                }),
                Widget.Box([Widget.Icon({ icon: icons.ui.time }), Widget.Label({ label: uptime.bind().as(up) })]),
                Widget.Box([
                    Widget.Icon({ icon: icons.ui.lock }),
                    Widget.Label({
                        label: hypridleStatus.isRunning.bind().as((r) => (r ? 'Hypridle enabled' : 'Hypridle disabled'))
                    })
                ])
            ]
        }),
        Widget.Box({ hexpand: true }),
        HypridleToggle(),
        PowerMenu()
    );
