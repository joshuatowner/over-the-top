import {Config} from "./interface";

const DEFAULT_CONFIG: Config = {
  memory: {
    timing: {
      updateInterval: 5000,
    },
    ui: {
      color: {
        memPrimary: "#9e69c2",
        swapPrimary: "#C269BE",
        graphBaseColor: "#FFFFFF",
        graphGuideColor: "#535353",
        labelColor: "#FFFFFF",
      },
      sizing: {
        barPadding: 4,
        numSegments: 31,
      }
    }
  },
  network: {
    interface: 'default',
    pingIp: '8.8.8.8',
    webUrl: 'https://www.google.com/',
    timing: {
      bandwidthUpdateInterval: 750,
      pingUpdateInterval: 2500,
      webUpdateInterval: 10000,
    },
    color: {
      primary: "#c29769",
      graphBaseColor: "#FFFFFF",
      graphGuideColor: "#535353",
      labelColor: "#FFFFFF",
    }
  },
  cpu: {
    timing: {
      updateInterval: 250,
      speedInterval: 500,
      tempInterval: 1000
    },
    ui: {
      sizing: {
        coresStart: 0.25,
        coresEnd: 0.7,
        historyStart: 0.8,
        historyEnd: 1.0,
        historyNumSegments: 100,
      },
      color: {
        primary: "#699CC2",
      }
    },
  },
  process: {
    timing: {
      updateInterval: 3000,
    }
  },
  color: {
    background: "#242424",
    featureBackground: "#333333",
  }
}

export default DEFAULT_CONFIG;
