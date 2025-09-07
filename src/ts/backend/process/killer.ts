import fkill from 'fkill';
import { KillProcessInput, KillProcessOutput } from '../../data/process';

export async function killProcess(input: KillProcessInput): Promise<KillProcessOutput> {
  try {
    await fkill(input.pid, { force: input.force });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
