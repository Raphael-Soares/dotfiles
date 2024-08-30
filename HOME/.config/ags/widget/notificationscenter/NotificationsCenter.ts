import PopupWindow from 'widget/PopupWindow';
import options from 'options';
import NotificationColumn from './NotificationColumn';

const { bar, datemenu } = options;
const pos = bar.position.bind();
const layout = Utils.derive([bar.position, datemenu.position], (bar, qs) => `${bar}-${qs}` as const);

const NotificationsCenter = () =>
    PopupWindow({
        name: 'notificationsCenter',
        exclusivity: 'exclusive',
        transition: pos.as((pos) => (pos === 'top' ? 'slide_down' : 'slide_up')),
        layout: layout.value,
        child: Widget.Box({
            class_name: 'notification-center',
            vexpand: false,
            children: [NotificationColumn()]
        })
    });

export function setupNotificationsCenter() {
    App.addWindow(NotificationsCenter());
    layout.connect('changed', () => {
        App.removeWindow('notificationsCenter');
        App.addWindow(NotificationsCenter());
    });
}
