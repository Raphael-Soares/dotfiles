import icons from 'lib/icons';
import PanelButton from '../PanelButton';
import options from 'options';

const { monochrome, action } = options.bar.powermenu;

export default () =>
    Widget.Button({
        on_clicked: action.bind(),
        child: Widget.Icon(icons.powermenu.shutdown)
    });
