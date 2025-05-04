export interface Config {
  network: {
    interface: string,
    pingIp: string,
    webUrl: string,
    timing: {
      bandwidthUpdateInterval: number,
      pingUpdateInterval: number,
      webUpdateInterval: number,
    },
    color: {
      primary: string,
      graphBaseColor: string,
      graphGuideColor: string,
      labelColor: string,
    }
  },
  cpu: {
    timing: {
      updateInterval: number,
      speedInterval: number,
      tempInterval: number,
    },
    ui: {
      sizing: {
        coresStart: number,
        coresEnd: number,
        historyStart: number,
        historyEnd: number,
        historyNumSegments: number,
      },
      color: {
        primary: string,
      }
    }
  },
  memory: {
    timing: {
      updateInterval: number,
    },
    ui: {
      sizing: {
        barPadding: number,
        numSegments: number,
      },
      color: {
        memPrimary: string,
        swapPrimary: string,
        graphBaseColor: string,
        graphGuideColor: string,
        labelColor: string,
      }
    }
  },
  gpu: {
    enabled: boolean,
    timing: {
      updateInterval: number,
    },
  }
  process: {
    timing: {
      updateInterval: number,
    }
  },
  color: {
    background: string,
    featureBackground: string,
  },
}
