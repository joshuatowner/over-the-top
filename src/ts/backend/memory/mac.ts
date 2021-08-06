import * as si from "systeminformation";
import {Systeminformation} from "systeminformation";
import cp from 'child_process'

const VM_STAT_MAPPINGS: Record<string, string> = {
  'Anonymous pages': 'app',
  'Pages wired down': 'wired',
  'Pages active': 'active',
  'Pages inactive': 'inactive',
  'Pages occupied by compressor': 'compressed'
}

const PAGE_SIZE = 4096;

async function vmStats() {
  let ret: Record<string, number> = {}
  let res = await new Promise<string>(
    (resolve) => cp.exec('vm_stat', (_, stout) => resolve(stout))
  );
  let lines = res.split('\n')
  lines = lines.filter(x => x !== '')

  lines.forEach(x => {
    let parts = x.split(':');
    let key = parts[0];
    let val = parts[1].replace('.', '').trim();
    if (VM_STAT_MAPPINGS[key]) {
      ret[VM_STAT_MAPPINGS[key]] = Number(val) * PAGE_SIZE;
    }
  })
  return ret
}

export async function macMem(): Promise<Systeminformation.MemData> {
  const siMemoryInfo = await si.mem();
  const vms = await vmStats();
  if (vms.app !== undefined && vms.compressed !== undefined && vms.wired !== undefined) {
    siMemoryInfo.active = vms.app + vms.compressed + vms.wired;
    siMemoryInfo.buffcache = siMemoryInfo.used - siMemoryInfo.active;
  }
  return siMemoryInfo;
}
