import PopupWindow from 'widget/PopupWindow';
import options from 'options';

const { bar, datemenu } = options;
const pos = bar.position.bind();
const layout = Utils.derive([bar.position, datemenu.position], (bar, qs) => `${bar}-${qs}` as const);

const DateMenu = () =>
    PopupWindow({
        name: 'datemenu',
        exclusivity: 'exclusive',
        transition: pos.as((pos) => (pos === 'top' ? 'slide_down' : 'slide_up')),
        layout: layout.value,
        child: Widget.Box({
            class_name: 'datemenu horizontal',
            vexpand: false,
            child: Widget.Box({
                class_name: 'calendar',
                children: [
                    Widget.Calendar({
                        hexpand: true,
                        hpack: 'center'
                    })
                ]
            })
        })
    });

export function setupDateMenu() {
    App.addWindow(DateMenu());
    layout.connect('changed', () => {
        App.removeWindow('datemenu');
        App.addWindow(DateMenu());
    });
}
