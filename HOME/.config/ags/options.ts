import { opt, mkOptions } from "lib/option";
import { distro } from "lib/variables";
import { icon } from "lib/utils";
import icons from "lib/icons";

const options = mkOptions(OPTIONS, {
  autotheme: opt(false),

  theme: {
    colors: {
      primary: {
        bg: opt("#458588"),
        fg: opt("#282828"),
      },
      error: {
        bg: opt("#CC241D"),
        fg: opt("#282828"),
      },
      bg: opt("#1d2021"),
      fg: opt("#EBDBB2"),
      widget: opt("#EBDBB2"),
      border: opt("#EBDBB2"),
    },

    blur: opt(0),
    widget: { opacity: opt(94) },
    border: {
      width: opt(1),
      opacity: opt(100),
    },

    shadows: opt(false),
    padding: opt(3),
    spacing: opt(6),
    radius: opt(10),
  },

  transition: opt(200),

  font: {
    size: opt(9),
    name: opt("JetBrainsMono Nerd Font"),
  },

  bar: {
    flatButtons: opt(true),
    position: opt<"top" | "bottom">("top"),
    corners: opt(50),
    transparent: opt(false),
    layout: {
      start: opt<Array<import("widget/bar/Bar").BarWidget>>([
        "workspaces",
        "expander",
      ]),
      center: opt<Array<import("widget/bar/Bar").BarWidget>>([]),
      end: opt<Array<import("widget/bar/Bar").BarWidget>>([
        "expander",
        "systray",
        "battery",
        "audio",
        "bluetooth",
        "wifi",
        "messages",
        "date",
        "powermenu",
      ]),
    },
    launcher: {
      icon: {
        colored: opt(true),
        icon: opt(icon(distro.logo, icons.ui.search)),
      },
      label: {
        colored: opt(true),
        label: opt(" Applications"),
      },
      action: opt(() => App.toggleWindow("launcher")),
    },
    date: {
      format: opt("%d %b %H:%M"),
      action: opt(() => App.toggleWindow("datemenu")),
    },
    wifi: {
      action: opt(() => App.toggleWindow("wifi")),
    },

    bluetooth: {
      action: opt(() => App.toggleWindow("bluetooth")),
    },
    battery: {
      bar: opt<"hidden" | "regular" | "whole">("regular"),
      charging: opt("#00D787"),
      percentage: opt(true),
      blocks: opt(7),
      width: opt(50),
      low: opt(30),
    },
    workspaces: {
      workspaces: opt(0),
    },
    taskbar: {
      iconSize: opt(0),
      monochrome: opt(true),
      exclusive: opt(false),
    },
    messages: {
      action: opt(() => App.toggleWindow("notificationsCenter")),
    },
    systray: {
      ignore: opt([]),
    },
    media: {
      monochrome: opt(true),
      preferred: opt("spotify"),
      direction: opt<"left" | "right">("right"),
      format: opt("{title}"),
      length: opt(40),
      monochromeIcon: opt(false),
      coverSize: opt(60),
    },
    powermenu: {
      monochrome: opt(false),
      action: opt(() => App.toggleWindow("powermenu")),
    },
  },

  overview: {
    scale: opt(12),
    workspaces: opt(0),
    monochromeIcon: opt(false),
  },

  powermenu: {
    sleep: opt("systemctl suspend"),
    reboot: opt("systemctl reboot"),
    logout: opt("hyprctl dispatch exit"),
    shutdown: opt("shutdown now"),
    layout: opt<"line" | "box">("line"),
    labels: opt(true),
  },

  audiomenu: {
    width: opt(380),
    position: opt<"left" | "center" | "right">("right"),
    media: {
      monochromeIcon: opt(false),
      coverSize: opt(60),
    },
  },

  datemenu: {
    position: opt<"left" | "center" | "right">("right"),
  },

  wifimenu: {
    position: opt<"left" | "center" | "right">("right"),
  },
  bluetoothmenu: {
    position: opt<"left" | "center" | "right">("right"),
  },

  osd: {
    progress: {
      vertical: opt(true),
      pack: {
        h: opt<"start" | "center" | "end">("end"),
        v: opt<"start" | "center" | "end">("center"),
      },
    },
    microphone: {
      pack: {
        h: opt<"start" | "center" | "end">("center"),
        v: opt<"start" | "center" | "end">("end"),
      },
    },
  },

  notifications: {
    position: opt<Array<"top" | "bottom" | "left" | "right">>(["top", "right"]),
    blacklist: opt(["Spotify"]),
    width: opt(440),
  },

  hyprland: {
    gaps: opt(3),
    inactiveBorder: opt("#282828"),
    gapsWhenOnly: opt(false),
  },
});

globalThis["options"] = options;
export default options;
