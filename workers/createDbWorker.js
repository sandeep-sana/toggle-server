import { createDatabase } from '../helper/user.js';
import { parentPort, workerData } from "worker_threads";

(async () => {
  try {
    const user = workerData;
    await createDatabase(user);
    parentPort.postMessage({
      success: true,
      message: `Database "${user.domain}" created successfully`,
    });
  } catch (err) {
    parentPort.postMessage({ success: false, error: err.message });
  }
})();
