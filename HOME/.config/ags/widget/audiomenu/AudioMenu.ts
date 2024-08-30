import type Gtk from 'gi://Gtk?version=3.0';
import { Volume, Microphone, SinkSelector, AppMixer } from './widgets/Volume';

import { Media } from './widgets/Media';
import PopupWindow from 'widget/PopupWindow';
import options from 'options';

const { bar, audiomenu } = options;
const media = (await Service.import('mpris')).bind('players');
const layout = Utils.derive([bar.position, audiomenu.position], (bar, qs) => `${bar}-${qs}` as const);

const Row = (toggles: Array<() => Gtk.Widget> = [], menus: Array<() => Gtk.Widget> = []) =>
    Widget.Box({
        vertical: true,
        children: [
            Widget.Box({
                homogeneous: true,
                class_name: 'row horizontal',
                children: toggles.map((w) => w())
            }),
            ...menus.map((w) => w())
        ]
    });

const Menu = () =>
    Widget.Box({
        vertical: true,
        class_name: 'audiomenu vertical',
        css: audiomenu.width.bind().as((w) => `min-width: ${w}px;`),
        children: [
            Widget.Box({
                class_name: 'sliders-box vertical',
                vertical: true,
                children: [Volume(), SinkSelector(), Microphone()]
            }),

            AppMixer(),

            Widget.Box({
                visible: media.as((l) => l.length > 0),
                child: Media()
            })
        ]
    });

const AudioMenu = () =>
    PopupWindow({
        name: 'audio',
        exclusivity: 'exclusive',
        transition: bar.position.bind().as((pos) => (pos === 'top' ? 'slide_down' : 'slide_up')),
        layout: layout.value,
        child: Menu()
    });

export function setupAudioMenu() {
    App.addWindow(AudioMenu());
    layout.connect('changed', () => {
        App.removeWindow('audio');
        App.addWindow(AudioMenu());
    });
}
