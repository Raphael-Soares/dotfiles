import PanelButton from '../PanelButton';
import options from 'options';
import { sh, range } from 'lib/utils';
import WorkspaceButton from '../WorkspaceButton';

const hyprland = await Service.import('hyprland');
const { workspaces } = options.bar.workspaces;

const dispatch = (arg: string | number) => {
    sh(`hyprctl dispatch workspace ${arg}`);
};

const Workspaces = (ws: number) =>
    Widget.Box({
        children: range(ws || 20).map((i) =>
            WorkspaceButton({
                on_clicked: () => dispatch(i),
                child: Widget.Label({ label: `${i}` }),
                attribute: i,
                setup: (self) =>
                    self.hook(hyprland, () => {
                        self.toggleClassName('active', hyprland.active.workspace.id === i);
                        self.toggleClassName('occupied', (hyprland.getWorkspace(i)?.windows || 0) > 0);
                    })
            })
        ),
        setup: (box) => {
            if (ws === 0) {
                box.hook(hyprland.active.workspace, () =>
                    box.children.map((btn) => {
                        btn.visible = hyprland.workspaces.some((ws) => ws.id === btn.attribute);
                    })
                );
            }
        }
    });

export default () =>
    Widget.Box({
        class_name: 'workspaces',
        child: workspaces.bind().as(Workspaces)
    });
