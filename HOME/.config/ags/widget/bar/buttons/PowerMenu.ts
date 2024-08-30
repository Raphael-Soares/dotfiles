import icons from 'lib/icons';
import PanelButton from '../PanelButton';
import options from 'options';

const { action } = options.bar.powermenu;

export default () =>
    PanelButton({
        on_clicked: action.bind(),
        child: Widget.Icon(icons.powermenu.shutdown)
    });
